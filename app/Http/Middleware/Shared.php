<?php

namespace App\Http\Middleware;

use App\Models\EventMenuCategory;
use App\Models\LandingModal;
use App\Models\LandingModalContent;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Permission;
use App\Models\ProductVariation;
use App\Models\Settings;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Shared
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $cart_count = $unpaid_orders = 0;
        $ia = false;
        $it = false;
        $settings = Settings::first();
        $landing_modal = LandingModal::first();
        $content = LandingModalContent::first();
        $lmt = $content->title;
        $landing_active = false;
        $dismissed = false;
        $dismissed_modal = session('dismissed_modal');
        $event_menu_categories = EventMenuCategory::whereHas('products', function($q) {
            $q->where('active', true);
        })->orderBy('name')->get();
        if(!is_null($dismissed_modal)) {
            if ($dismissed_modal === $landing_modal->code) {
                $dismissed = true;
            }
        }
        if(!$dismissed && !is_null($landing_modal->image)) {
            $now = Carbon::now()->midDay();
            $begin = $landing_modal->active_begin_date;
            $end = $landing_modal->active_end_date;
            if(!is_null($begin)) {
                if($now > $begin->startOfDay()) {
                    if(is_null($end) || $now < $end->endOfDay()) {
                        $landing_active = true;
                    }
                }
            }
        }
        $opening_times = [
            'monday' => [
                'name' => 'Monday',
                'abbr' => 'Mon',
                'open' => !is_null($settings->monday_opening_times),
                'times' => $settings->monday_opening_times,
            ],
            'tuesday' => [
                'name' => 'Tuesday',
                'abbr' => 'Tue',
                'open' => !is_null($settings->tuesday_opening_times),
                'times' => $settings->tuesday_opening_times,
            ],
            'wednesday' => [
                'name' => 'Wednesday',
                'abbr' => 'Wed',
                'open' => !is_null($settings->wednesday_opening_times),
                'times' => $settings->wednesday_opening_times,
            ],
            'thursday' => [
                'name' => 'Thursday',
                'abbr' => 'Thu',
                'open' => !is_null($settings->thursday_opening_times),
                'times' => $settings->thursday_opening_times,
            ],
            'friday' => [
                'name' => 'Friday',
                'abbr' => 'Fri',
                'open' => !is_null($settings->friday_opening_times),
                'times' => $settings->friday_opening_times,
            ],
            'saturday' => [
                'name' => 'Saturday',
                'abbr' => 'Sat',
                'open' => !is_null($settings->saturday_opening_times),
                'times' => $settings->saturday_opening_times,
            ],
            'sunday' => [
                'name' => 'Sunday',
                'abbr' => 'Sun',
                'open' => !is_null($settings->sunday_opening_times),
                'times' => $settings->sunday_opening_times,
            ],
        ];
        if(auth()->check()) {
            $user = auth()->user();

            $cart_items = session('cart_items')??[];

            if(count($cart_items) > 0) {
                $variations = ProductVariation::with(['product'])->get();
                foreach($cart_items as $cart_item) {
                    $variation = $variations->where('id', $cart_item['variation_id'])->first();
                    if(!is_null($variation)) {
                        $product = $variation->product;
                        OrderItem::create([
                            'user_id' => $user->id,
                            'product_id' => $product->id,
                            'variation_id' => $variation->id,
                            'product_name' => $product->name,
                            'variation_name' => $variation->name,
                            'quantity' => $cart_item['quantity'],
                            'thumbnail' => $cart_item['thumbnail'],
                            'client_note' => $cart_item['client_note'],
                        ]);
                    }
                }
                session(['cart_items' => null]);
            }


            $cart_count = OrderItem::whereNull('order_id')
                ->where('user_id', $user->id)
                ->count();
            $unpaid_orders = Order::where('user_id', $user->id)->where('status', 'initial')->count();
            $ia = $user->can(Permission::ADMIN);
            $it = $user->can(Permission::FRONT) || $user->can(Permission::BAKER);
        } else {
            $cart_items = session('cart_items')??[];
            $cart_count = count($cart_items);
        }
        Inertia::share(compact(['cart_count', 'unpaid_orders', 'ia', 'it', 'lmt', 'opening_times', 'landing_modal', 'landing_active', 'event_menu_categories']));
        return $next($request);
    }
}
