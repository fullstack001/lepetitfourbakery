<?php

namespace App\Console\Commands;

use App\Models\ToastCroissantSale;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ToastCroissantCounter extends Command
{
    protected $signature = 'app:toast-croissant-counter {--mode=all : Mode: all (historical+today), today (today only), historical (July 1 to yesterday)}';
    protected $description = 'Count Toast croissant quantities since July 1st 2025 using ERA Menu WEEK API (7 daily rows/week), add Square base (43,706), and update Vestaboard';

    /* =========================
     |  Simple 10 req/min limiter
     |=========================*/
    private array $reqTimestamps = []; // epoch seconds of recent calls
    private int $ratePerMinute = 10;

    private function enforceRateLimit(): void
    {
        $now = microtime(true);
        // prune older than 60s
        $this->reqTimestamps = array_values(array_filter($this->reqTimestamps, fn($t) => ($now - $t) < 60.0));

        if (count($this->reqTimestamps) >= $this->ratePerMinute) {
            $oldest = $this->reqTimestamps[0];
            $sleepFor = max(0.0, 60.0 - ($now - $oldest)) + 0.05; // small pad
            $this->line(sprintf("   ⏳ Throttling to respect 10/minute (sleep %.1fs)...", $sleepFor));
            usleep((int)round($sleepFor * 1_000_000));
        }
        $this->reqTimestamps[] = microtime(true);
    }

    private function httpPostLimited(string $url, array $payload, array $headers = [])
    {
        $this->enforceRateLimit();
        return Http::withHeaders($headers)->post($url, $payload);
    }

    private function httpGetLimited(string $url, array $query = [], array $headers = [])
    {
        $this->enforceRateLimit();
        return Http::withHeaders($headers)->get($url, $query);
    }

    /* =========================
     |  Helpers
     |=========================*/

    /**
     * Accepts multiple shapes, returns an array of rows.
     */
    private function extractProducts($analyticsData): array
    {
        if (!is_array($analyticsData)) return [];
        foreach (['menuItems','items','productMix','products'] as $key) {
            if (isset($analyticsData[$key]) && is_array($analyticsData[$key])) return $analyticsData[$key];
        }
        $allAssoc = array_filter($analyticsData, 'is_array');
        return (count($allAssoc) === count($analyticsData)) ? $analyticsData : [];
    }

    private function isCroissantRow(array $row): bool
    {
        $name = $row['menuItemName'] ?? '';
        return is_string($name) && stripos($name, 'croissant') !== false;
    }

    /* ===== New, more robust croissant detection helpers ===== */

    /**
     * Case-insensitive substring match against any keyword.
     */
    private function strContainsAny(?string $haystack, array $needles): bool
    {
        if (!is_string($haystack) || $haystack === '') return false;
        $hay = mb_strtolower($haystack);
        foreach ($needles as $n) {
            $n = mb_strtolower((string)$n);
            if ($n !== '' && mb_strpos($hay, $n) !== false) return true;
        }
        return false;
    }

    /**
     * Decide if a selection (line item) is a croissant based on name and/or known item IDs.
     * Uses:
     *  - services.toast.croissant_keywords  (array of strings)
     *  - services.toast.croissant_item_ids  (array of multiLocationIds)
     */
    private function isCroissantSelection(array $sel): bool
    {
        $keywords     = config('services.toast.croissant_keywords', ['croiss']); // default stem catches croissant(s)
        $whitelistIds = config('services.toast.croissant_item_ids', []);

        // Candidate names we can check
        $candidates = [];
        $candidates[] = $sel['displayName'] ?? null;
        $candidates[] = $sel['name'] ?? null;
        if (!empty($sel['item']) && is_array($sel['item'])) {
            $candidates[] = $sel['item']['displayName'] ?? null;
            $candidates[] = $sel['item']['name'] ?? null;
        }
        foreach ($candidates as $cand) {
            if ($this->strContainsAny($cand, $keywords)) return true;
        }

        // Check known item IDs (multiLocationId) if you configured them
        $mlid = $sel['item']['multiLocationId'] ?? null;
        if ($mlid && in_array($mlid, $whitelistIds, true)) return true;

        // Also check modifiers for croissant keywords (e.g., croissant bun)
        if (!empty($sel['modifiers']) && is_array($sel['modifiers'])) {
            foreach ($sel['modifiers'] as $mod) {
                if (!empty($mod['voided']) || !empty($mod['voidDate'])) continue;
                $modName = $mod['displayName'] ?? ($mod['name'] ?? null);
                if ($this->strContainsAny($modName, $keywords)) return true;
            }
        }

        return false;
    }

    /**
     * Extract numeric quantity from a selection (tries quantity and unitQuantity).
     */
    private function getSelectionQty(array $sel): float
    {
        $q = $sel['quantity'] ?? null;
        if ($q === null) $q = $sel['unitQuantity'] ?? null;
        return (float)($q ?? 0);
    }

    /**
     * Extract total croissant quantity from a single order.
     * - scans checks[].selections[] and their modifiers
     * - supports legacy order.items[]
     * - skips voided selections
     * - emits debug logs when croissants are found
     */
    private function croissantQtyFromOrder(array $order): float
    {
        $qty = 0.0;

        // Legacy/alt shape: order.items[]
        if (!empty($order['items']) && is_array($order['items'])) {
            foreach ($order['items'] as $item) {
                if (!empty($item['voided']) || !empty($item['voidDate'])) continue;

                $name = $item['name'] ?? ($item['displayName'] ?? null);
                $iqty = (float)($item['quantity'] ?? ($item['unitQuantity'] ?? 0));
                if ($this->strContainsAny($name, config('services.toast.croissant_keywords', ['croiss']))) {
                    $qty += $iqty;
                    $this->line("       ↳ (items[]) CROISSANT: {$name} x {$iqty}");
                }
            }
        }

        // Canonical: order.checks[].selections[]
        if (!empty($order['checks']) && is_array($order['checks'])) {
            foreach ($order['checks'] as $check) {
                $selections = $check['selections'] ?? [];
                if (!is_array($selections)) continue;

                foreach ($selections as $sel) {
                    if (!empty($sel['voided']) || !empty($sel['voidDate'])) continue;

                    if ($this->isCroissantSelection($sel)) {
                        $sq = $this->getSelectionQty($sel);
                        $name = $sel['displayName'] ?? ($sel['name'] ?? 'croissant');
                        $qty += $sq;
                        
                    }

                    // If croissant appears as a modifier, count it too
                    if (!empty($sel['modifiers']) && is_array($sel['modifiers'])) {
                        foreach ($sel['modifiers'] as $mod) {
                            if (!empty($mod['voided']) || !empty($mod['voidDate'])) continue;
                            $mName = $mod['displayName'] ?? ($mod['name'] ?? null);
                            if ($this->strContainsAny($mName, config('services.toast.croissant_keywords', ['croiss']))) {
                                $mq = (float)($mod['quantity'] ?? ($mod['unitQuantity'] ?? 0));
                                $qty += $mq;
                                $this->line("       ↳ (modifiers[]) CROISSANT: {$mName} x {$mq}");
                            }
                        }
                    }
                }
            }
        }

        return $qty;
    }

    /**
     * Decide if an order should be included as "completed/approved".
     * - approvalStatus must be APPROVED (when present)
     * - order.status or check.paymentStatus indicates paid/closed
     */
    private function isApprovedCompletedOrder(array $order): bool
    {
        $approval = strtoupper((string)($order['approvalStatus'] ?? ''));
        if ($approval && $approval !== 'APPROVED') {
            return false;
        }

        $orderStatus = strtoupper((string)($order['status'] ?? ''));
        if (in_array($orderStatus, ['COMPLETED', 'CLOSED'], true)) {
            return true;
        }

        // Look at checks[].paymentStatus
        if (!empty($order['checks']) && is_array($order['checks'])) {
            foreach ($order['checks'] as $check) {
                $ps = strtoupper((string)($check['paymentStatus'] ?? ''));
                if (in_array($ps, ['PAID', 'CLOSED', 'SETTLED', 'COMPLETED'], true)) {
                    return true;
                }
            }
        }

        // Lastly, look at payments[].paymentStatus if present
        if (!empty($order['checks']) && is_array($order['checks'])) {
            foreach ($order['checks'] as $check) {
                $payments = $check['payments'] ?? [];
                if (!is_array($payments)) continue;
                foreach ($payments as $p) {
                    $pps = strtoupper((string)($p['paymentStatus'] ?? ''));
                    if (in_array($pps, ['PAID', 'CLOSED', 'SETTLED', 'COMPLETED', 'AUTHORIZED'], true)) {
                        // many tenants mark final state at check level; treat AUTHORIZED as valid sale if check is CLOSED
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Compute total croissant quantity from raw rows (analytics endpoint).
     */
    private function computeCroissantTotal(array $rows): float
    {
        $total = 0.0;
        foreach ($rows as $row) {
            if (!$this->isCroissantRow($row)) continue;
            $total += (float)($row['quantitySold'] ?? 0);
        }
        return $total;
    }

    /**
     * Fetch today's completed/approved orders from Toast and count croissants.
     * Strategy:
     *  - Build store-local day, convert to UTC, send with Z (many tenants require this)
     *  - Page starting at 0 (some envs are 0-based)
     *  - Fallback: if first pass yields 0, retry once with offset timestamps and page=1
     *  - Count croissant quantity from checks[].selections[] (and legacy order.items[])
     *  - Log # of approved croissant orders
     */
    private function fetchTodayData(string $authHeader, Carbon $date, string $apiHost, string $restaurantGuid): float
    {
        $storeTz = (string)(config('services.toast.store_timezone') ?? 'America/New_York');

        // Store-local midnight range
        $localStart = $date->copy()->setTimezone($storeTz)->startOfDay();
        $localEnd   = $date->copy()->setTimezone($storeTz)->endOfDay();

        // Primary format: UTC (Z)
        $utcStart = $localStart->copy()->setTimezone('UTC');
        $utcEnd   = $localEnd->copy()->setTimezone('UTC');
        $fmtZ     = 'Y-m-d\TH:i:s.v\Z';       // 2025-10-29T00:00:00.000Z
        $startZ   = $utcStart->format($fmtZ);
        $endZ     = $utcEnd->format($fmtZ);

        // Fallback format: local offset timestamps
        $fmtOff   = 'Y-m-d\TH:i:s.vP';        // 2025-10-29T00:00:00.000-04:00
        $startOff = $localStart->format($fmtOff);
        $endOff   = $localEnd->format($fmtOff);

        $this->line("   📊 Fetching completed orders for {$localStart->format('Y-m-d')} ({$storeTz})");

        $url = rtrim($apiHost, '/') . "/orders/v2/ordersBulk";
        $headers = [
            'Authorization'                => $authHeader,      // e.g. "Bearer <jwt>"
            'Toast-Restaurant-External-ID' => $restaurantGuid,  // REQUIRED
            'Accept'                       => 'application/json',
        ];

        // shared scanner
        $scan = function (string $start, string $end, int $pageStart) use ($url, $headers)
        {
            $pageSize = 100;
            $page = $pageStart;
            $totalOrders = 0;
            $croissantQty = 0.0;
            $approvedCroissantOrdersTotal = 0;

            $this->line("      Range: {$start} → {$end}");
            $this->line("      Paging from page {$pageStart} (pageSize {$pageSize})");

            while (true) {
                $query = [
                    'startDate' => $start,
                    'endDate'   => $end,
                    'pageSize'  => $pageSize,
                    'page'      => $page,
                ];

                $response = $this->httpGetLimited($url, $query, $headers);

                if (!$response->successful()) {
                    $this->error("❌ Failed to fetch orders (HTTP {$response->status()}) on page {$page}");
                    $this->line('      Debug Query: ' . json_encode($query));
                    $this->line('      Response Body: ' . $response->body());
                    return [0, 0.0, 0, false];
                }

                $data = $response->json();
                // Accept both shapes: {orders:[...]} or [...]
                if (is_array($data) && isset($data[0])) {
                    $orders = $data;
                } else {
                    $orders = is_array($data['orders'] ?? null) ? $data['orders'] : [];
                }

                $count = count($orders);
                $this->line("   ✅ Page {$page}: fetched {$count}" . ($page === $pageStart ? ' orders' : ' more orders'));

                if ($count === 0) break;

                $totalOrders += $count;
                $approvedCroissantOrdersPage = 0;

                // (Optional) First-page peek to verify names/qtys
                if ($page === $pageStart && !empty($orders[0])) {
                    $this->line('   🔎 Sample first order selections:');
                    foreach (($orders[0]['checks'][0]['selections'] ?? []) as $sel) {
                        $nm = $sel['displayName'] ?? ($sel['name'] ?? '');
                        $this->line('       - ' . $nm . ' (qty=' . ($sel['quantity'] ?? ($sel['unitQuantity'] ?? 0)) . ')');
                    }
                }

                foreach ($orders as $order) {
                    if (!$this->isApprovedCompletedOrder($order)) {
                        continue;
                    }

                    $orderCroissantQty = $this->croissantQtyFromOrder($order);
                    if ($orderCroissantQty > 0) {
                        $approvedCroissantOrdersPage++;
                        $approvedCroissantOrdersTotal++;
                        $croissantQty += $orderCroissantQty;

                        $disp = $order['displayNumber'] ?? ($order['guid'] ?? 'n/a');                        
                    }
                }

                $this->line("   🧮 Approved croissant orders this page: {$approvedCroissantOrdersPage}");

                $page++;
                if ($count < $pageSize) break; // last page
            }

            $this->line("   📦 Total orders scanned: {$totalOrders}");
            $this->line("   🥐 Approved croissant orders total: {$approvedCroissantOrdersTotal}");
            return [$totalOrders, $croissantQty, $approvedCroissantOrdersTotal, true];
        };

        // Try UTC Z + page=0
        $this->line("      Using UTC (Z) timestamps…");
        [$ordersZ, $qtyZ,, $okZ] = $scan($startZ, $endZ, 0);
        if ($okZ && $ordersZ > 0) {
            return $qtyZ;
        }

        // Fallback to offset timestamps + page=1 (matches what often works in Postman)
        $this->warn("   ⚠️ 0 orders with UTC Z + page=0. Retrying once with offset timestamps + page=1…");
        [, $qtyOff,, $okOff] = $scan($startOff, $endOff, 1);

        return $okOff ? $qtyOff : 0.0;
    }

    /**
     * Fetch historical total quantity (croissant-only) by summing weekly windows using the custom menu endpoint.
     * Returns a single float: total quantity for start..end.
     */
    private function fetchHistoricalTotal(string $authHeader, Carbon $startDate, Carbon $endDate, string $apiHost, string $restaurantGuid): float
    {
        $total = 0.0;

        $windowStart = $startDate->copy();
        while ($windowStart->lte($endDate)) {
            $windowEnd = $windowStart->copy()->addDays(6);
            if ($windowEnd->gt($endDate)) $windowEnd = $endDate->copy();

            $s = $windowStart->format('Ymd');
            $e = $windowEnd->format('Ymd');

            $this->line("   📊 Fetching CUSTOM MENU report for {$s} → {$e}");

            $payload = [
                'startBusinessDate'     => $s,
                'endBusinessDate'       => $e,
                'restaurantIds'         => [$restaurantGuid],
                'groupBy'               => ['MENU_ITEM'],
                'excludedRestaurantIds' => [],
            ];

            $createUrl = "{$apiHost}/era/v1/menu/week";
            $createResp = $this->httpPostLimited($createUrl, $payload, [
                'Authorization' => $authHeader,
                'Content-Type'  => 'application/json',
            ]);

            if (!$createResp->successful()) {
                $this->error("❌ Create CUSTOM MENU report failed (HTTP {$createResp->status()})");
                $windowStart = $windowEnd->copy()->addDay();
                continue;
            }

            // Parse GUID
            $rawBody = $createResp->body();
            $decoded = json_decode($rawBody, true);
            if (is_array($decoded) && !empty($decoded['reportRequestGuid'])) {
                $guid = $decoded['reportRequestGuid'];
            } else {
                $guid = trim($rawBody, " \t\n\r\0\x0B\"'");
            }

            // Poll for data (single attempt with short delay)
            $getUrl = "{$apiHost}/era/v1/menu/{$guid}";
            sleep(3);
            $dataResp = $this->httpGetLimited($getUrl, ['fetchRestaurantNames' => 'true'], [
                'Authorization' => $authHeader,
            ]);

            if ($dataResp && $dataResp->successful()) {
                $weekData = $dataResp->json();
                $rows = $this->extractProducts($weekData);

                // Compute weekly croissant quantity for this window
                $weekTotal = 0.0;
                foreach ($rows as $r) {
                    $name = $r['menuItemName'] ?? '';
                    if (is_string($name) && stripos($name, 'croissant') !== false) {
                        $weekTotal += (float)($r['quantitySold'] ?? 0);
                    }
                }

                $total += $weekTotal;
                $this->line("   📅 Weekly croissant qty for {$s} → {$e}: " . number_format($weekTotal, 2));
            } else {
                $status = $dataResp ? $dataResp->status() : 'no-response';
                $this->error("❌ Fetch CUSTOM MENU report failed (HTTP {$status})");
            }

            $windowStart = $windowEnd->copy()->addDay();
            $this->line("   ⏳ Waiting 15 seconds before next week...");
            sleep(15);
        }

        return $total;
    }

    private function updateVestaboard(int $displayTotal): bool
    {
        $currentDatetime   = Carbon::now();
        $initialSquareDay  = Carbon::createFromFormat('ymd', '250121')->startOfDay(); // Jan 21, 2025
        $diff              = $currentDatetime->copy()->startOfDay()->diffInDays($initialSquareDay) + 1;

        $title_1       = "MY MOM{52}S AND MY";
        $title_2       = 'CROISSANT CHALLENGE';
        $target_word   = 'Goal:';
        $target_count  = number_format(1000000, 0, '.', ',');
        $current_word  = 'Sold:';
        $current_count = number_format($displayTotal, 0, '.', ',');
        $current_len   = strlen($current_count);
        $current_pos   = 22 - $current_len - 6;

        $day         = "Day {$diff}";
        $day_len     = strlen($day);
        $day_pos     = 22 - $day_len;

        $formatUrl  = "https://vbml.vestaboard.com/compose";
        $formatData = [
            "props" => compact('title_1','title_2','target_word','target_count','current_word','current_count','day'),
            "components" => [
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>22,"absolutePosition"=>["x"=>0,"y"=>0]], "template"=>"{{title_1}}"],
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>22,"absolutePosition"=>["x"=>0,"y"=>1]], "template"=>"{{title_2}}"],
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>5,"absolutePosition"=>["x"=>0,"y"=>3]], "template"=>"{{target_word}}"],
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>9,"absolutePosition"=>["x"=>7,"y"=>3]], "template"=>"{{target_count}}"],
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>5,"absolutePosition"=>["x"=>0,"y"=>4]], "template"=>"{{current_word}}"],
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>$current_len,"absolutePosition"=>["x"=>$current_pos,"y"=>4]], "template"=>"{{current_count}}"],
                ["style" => ["justify"=>"left","align"=>"center","height"=>1,"width"=>$day_len,"absolutePosition"=>["x"=>$day_pos,"y"=>5]], "template"=>"{{day}}"],
            ],
        ];

        // Rate-limited calls
        $this->enforceRateLimit();
        $formatResponse = Http::post($formatUrl, $formatData);
        if (!$formatResponse->successful()) {
            $this->error('❌ Failed to format Vestaboard message. Status: ' . $formatResponse->status());
            $this->error('Response: ' . $formatResponse->body());
            return false;
        }

        $this->info('⏳ Waiting 2 seconds to avoid rate limiting...');
        usleep(2_000_000);

        $writeUrl = "https://rw.vestaboard.com/";
        $headers  = ['X-Vestaboard-Read-Write-Key' => env('VESTABOARD_API_KEY'), 'Content-Type' => 'application/json'];
        $characters = $formatResponse->json();

        $this->enforceRateLimit();
        $writeResponse = Http::withHeaders($headers)->post($writeUrl, $characters);
        if ($writeResponse->successful() || $writeResponse->status() === 304) return true;

        if ($writeResponse->status() === 503) {
            $this->warn('⚠️ Rate limited (503) — retrying after 8s...');
            sleep(8);
            $this->enforceRateLimit();
            $retry = Http::withHeaders($headers)->post($writeUrl, $characters);
            return $retry->successful();
        }

        $this->error('❌ Vestaboard write failed. Status: ' . $writeResponse->status());
        $this->error('Response: ' . $writeResponse->body());
        return false;
    }

    /* =========================
     |  Command
     |=========================*/

    public function handle()
    {
        $mode = $this->option('mode');
        $squareBase = 43706;
        $startDate = Carbon::create(2025, 7, 1)->startOfDay();
        $today = Carbon::now()->startOfDay();
        $yesterday = $today->copy()->subDay();

        $this->info('🥐 TOAST CROISSANT COUNTER - Database-Enabled');
        $this->info('===============================================');
        $this->info("Mode: {$mode}");
        $this->info('🔢 Square Base: ' . number_format($squareBase));
        $this->newLine();

        try {
            // Get credentials
            $clientId = config('services.toast.analytics_client_id');
            $clientSecret = config('services.toast.analytics_client_secret');
            $userAccessType = config('services.toast.analytics_user_access_type');
            $restaurantGuid = config('services.toast.restaurant_guid');
            $apiHost = rtrim((string)config('services.toast.analytics_api_hostname'), '/');

            // Determine what to fetch based on mode
            if ($mode === 'today') {
                // Always fetch today's fresh data
                $this->info('📅 Fetching today\'s fresh data: ' . $today->format('M d, Y'));

                // Use normal Toast API credentials for orders
                $clientId = config('services.toast.client_id');
                $clientSecret = config('services.toast.client_secret');
                $userAccessType = config('services.toast.user_access_type');
                $apiHost = rtrim((string)config('services.toast.api_hostname'), '/');

                // Authenticate and fetch
                $this->info('🔐 Authenticating...');
                $tokenResponse = Http::asJson()->post("{$apiHost}/authentication/v1/authentication/login", [
                    'clientId' => $clientId,
                    'clientSecret' => $clientSecret,
                    'userAccessType' => $userAccessType,
                ]);

                if (!$tokenResponse->successful()) {
                    $this->error('❌ Authentication failed');
                    return 1;
                }

                $tokenData = $tokenResponse->json();
                $authHeader = ($tokenData['token']['tokenType'] ?? 'Bearer') . ' ' . ($tokenData['token']['accessToken'] ?? '');

                // Fetch today's completed orders
                $todayTotal = $this->fetchTodayData($authHeader, $today, $apiHost, $restaurantGuid);

                // Calculate totals: historical grand total (as of yesterday) + today's fresh total
                $historicalTotal = ToastCroissantSale::getGrandTotalUntil($yesterday->format('Y-m-d'));
                // Show today's quantity in console
                $this->info('🥐 Today\'s croissant quantity: ' . number_format($todayTotal, 2));

                $totalCroissants = (int)round($historicalTotal + $todayTotal);

            } elseif ($mode === 'historical') {
                // Fetch July 1 to yesterday
                $this->info('📅 Fetching historical data: ' . $startDate->format('M d, Y') . ' → ' . $yesterday->format('M d, Y'));

                // Authenticate
                $this->info('🔐 Authenticating...');
                $this->info($apiHost);
                $tokenResponse = Http::asJson()->post("{$apiHost}/authentication/v1/authentication/login", [
                    'clientId' => $clientId,
                    'clientSecret' => $clientSecret,
                    'userAccessType' => $userAccessType,
                ]);

                if (!$tokenResponse->successful()) {
                    $this->error('❌ Authentication failed');
                    return 1;
                }

                $tokenData = $tokenResponse->json();
                $authHeader = ($tokenData['token']['tokenType'] ?? 'Bearer') . ' ' . ($tokenData['token']['accessToken'] ?? '');

                // Fetch a single grand total using weekly windows and persist it
                $grandTotal = $this->fetchHistoricalTotal($authHeader, $startDate, $yesterday, $apiHost, $restaurantGuid);
                ToastCroissantSale::setGrandTotalUntil($yesterday->format('Y-m-d'), $grandTotal);
                $this->info('💾 Saved grand total until yesterday: ' . number_format($grandTotal));

                $totalCroissants = (int)round($grandTotal);

            } else {
                // Mode: all - get from DB, fetch today if needed
                $this->info('📅 Calculating totals from database...');

                // Get historical grand total and today's total from DB/computation
                $historicalTotal = ToastCroissantSale::getGrandTotalUntil($yesterday->format('Y-m-d'));
                $todayTotal = 0.0; // not fetching here; this mode just reports stored totals

                $this->info('Historical (Jul 1 - Yesterday): ' . number_format($historicalTotal));
                $this->info('Today: ' . number_format($todayTotal));

                $totalCroissants = (int)round($historicalTotal + $todayTotal);
            }

            // Update Vestaboard
            $totalDisplay = $squareBase + $totalCroissants;

            $this->newLine();
            $this->info('📊 RESULTS:');
            $this->info('===========');
            $this->info('Square base: ' . number_format($squareBase));
            $this->info('Toast croissants (since Jul 1, 2025): ' . number_format($totalCroissants));
            $this->info('TOTAL DISPLAY: ' . number_format($totalDisplay));
            $this->newLine();

            $this->info('🎯 UPDATING VESTABOARD...');
            $ok = $this->updateVestaboard($totalDisplay);
            if ($ok) {
                $this->info('✅ Vestaboard updated successfully!');
            } else {
                $this->error('❌ Vestaboard update failed.');
                return 1;
            }

        } catch (\Throwable $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            Log::error('ToastCroissantCounter error', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return 1;
        }

        $this->newLine();
        $this->info('🎯 Done!');
        return 0;
    }
}