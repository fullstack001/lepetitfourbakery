<?php

namespace App\Http\Controllers;

use App\Models\AboutPageContent;
use App\Models\CateringPageContent;
use App\Models\ClosedDate;
use App\Models\ContactPageContent;
use App\Models\EventMenuCategory;
use App\Models\GiftCard;
use App\Models\GiftCardOrder;
use App\Models\GiftCardPayment;
use App\Models\HomepageContent;
use App\Models\LandingModal;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PrivacyCategory;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductSale;
use App\Models\ProductVariation;
use App\Models\Settings;
use App\Models\TermsCategory;
use App\Models\User;
use App\Notifications\ContactFormNotification;
use App\Traits\Helpers;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Square\Utils\WebhooksHelper;
use Stripe\Checkout\Session;
use Stripe\Coupon;
use Stripe\Stripe;

class CoreController extends WebController
{

    use Helpers;

    public function welcome()
    {
        return Inertia::render('Welcome');
    }

    public function validateKey(Request $request)
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'in:LPF2024'],
        ], [
            'key.*' => 'Invalid password',
        ]);
        session(['logged' => true]);
        return to_route('home');
    }

    public function dismissLandingModal()
    {
        $landing_modal = LandingModal::first();
        $code = $landing_modal->code;
        session(['dismissed_modal' => $code]);
    }

    public function newsletterSubscribe(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
        ]);
        try {
            $email = $data['email'];
            session(['email' => $email]);
            if(app()->environment(['staging', 'production'])) {
                $mailchimpApiKey = env('MAILCHIMP_API_KEY');
                $mailchimpListId = env('MAILCHIMP_AUDIENCE_ID');

                $response = Http::withBasicAuth('anystring', $mailchimpApiKey)
                    ->put("https://us16.api.mailchimp.com/3.0/lists/{$mailchimpListId}/members/" . md5(strtolower($email)), [
                        'email_address' => $email,
                        'status' => 'pending',
                    ]);
                if ($response->successful()) {
                    Log::info('User successfully added to Mailchimp audience.');
                } else {
                    Log::info('An error occurred.');
                    Log::info($response->json());
                }
            }
            return $this->success(null);
        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return $this->error(null);
        }
    }

    public function home()
    {
        $products = Product::where('active', true)
            ->where('deleted', false)
            ->where('in_sneak_peek_menu', true)
            ->whereHas('variations')
            ->with(['variations', 'variations.box_products'])->take(4)->get();

        foreach($products as $product) {
            foreach($product->variations as $variation) {
                foreach($variation->box_products as $box_product) {
                    $box_product->append(['display_data']);
                }
            }
        }
        $content = HomepageContent::first();
        $content->hero_title = nl2br($content->hero_title);
        $content->hero_introduction = nl2br($content->hero_introduction);
        $content->sneak_peek_title = nl2br($content->sneak_peek_title);
        $content->sneak_peek_button_text = nl2br($content->sneak_peek_button_text);
        $content->team_1_content_1 = nl2br($content->team_1_content_1);
        $content->team_1_content_2 = nl2br($content->team_1_content_2);
        $content->team_2_content_1 = nl2br($content->team_2_content_1);
        $content->team_2_content_2 = nl2br($content->team_2_content_2);
        $content->origins_content_1 = nl2br($content->origins_content_1);
        $content->origins_content_2 = nl2br($content->origins_content_2);
        $content->tour_1_introduction = nl2br($content->tour_1_introduction);
        $content->tour_2_introduction = nl2br($content->tour_2_introduction);
        $settings = Settings::first();
        $meta_description = $settings->meta_description_home??null;
        $is_production = app()->environment('production');
        return Inertia::render('Home', compact(['content','products', 'meta_description','is_production']));
    }

    public function about()
    {
        $content = AboutPageContent::first();
        $content->introduction = nl2br($content->introduction);
        $content->testimonials_introduction = nl2br($content->testimonials_introduction);
        $content->testimonial_1_content = nl2br($content->testimonial_1_content);
        $content->testimonial_2_content = nl2br($content->testimonial_2_content);
        $content->testimonial_3_content = nl2br($content->testimonial_3_content);
        $settings = Settings::first();
        $meta_description = $settings->meta_description_boutique??null;
        $is_production = app()->environment('production');
        return Inertia::render('About', compact(['content', 'meta_description','is_production']));
    }

    public function menu()
    {
        $filters = collect();
        $categories = ProductCategory::whereHas('products', function($q) {
            $q->where('active', true)
                ->where('deleted', false)
                ->whereHas('variations')
                ->where('in_catering_menu', true);
        })->orderBy('position')->get();
        foreach($categories as $category) {
            $filters->push([
                'uid' => $category->uid,
                'name' => $category->name,
                'slug' => $category->slug,
            ]);
        }
        $products = Product::where('active', true)
            ->where('deleted', false)
            ->whereHas('variations')
            ->where('in_catering_menu', true)
            ->with(['categories', 'variations', 'variations.box_products'])->get();

        foreach($products as $product) {
            foreach($product->variations as $variation) {
                foreach($variation->box_products as $box_product) {
                    $box_product->append(['display_data']);
                }
            }
        }
        $content = CateringPageContent::first();
        $content->introduction = nl2br($content->introduction);
        $settings = Settings::first();
        $meta_description = $settings->meta_description_catering??null;
        $is_production = app()->environment('production');
        return Inertia::render('Menu', compact(['content' ,'products', 'filters', 'meta_description','is_production']));
    }

    public function eventsMenu(EventMenuCategory $category)
    {
        $event_menu_category = $category;
        $filters = collect();
        $categories = ProductCategory::whereHas('products', function($q) {
            $q->where('active', true)
                ->where('deleted', false)
                ->whereHas('variations')
                ->where('in_catering_menu', true);
        })->orderBy('position')->get();
        foreach($categories as $category) {
            $filters->push([
                'uid' => $category->uid,
                'name' => $category->name,
                'slug' => $category->slug,
            ]);
        }

        $products = Product::where('active', true)
            ->where('deleted', false)
            ->whereHas('variations')
            ->whereHas('event_menu_categories', function($q) use ($event_menu_category) {
                $q->where('event_menu_categories.id', $event_menu_category->id);
            })
            ->with(['categories', 'event_menu_categories', 'variations', 'variations.box_products'])
            ->join('event_menu_products', 'products.id', '=', 'event_menu_products.product_id')
            ->where('event_menu_products.event_menu_category_id', $event_menu_category->id)
            ->orderBy('event_menu_products.position')
            ->select('products.*')
            ->get();

        foreach($products as $product) {
            foreach($product->variations as $variation) {
                foreach($variation->box_products as $box_product) {
                    $box_product->append(['display_data']);
                }
            }
        }

        $content = [
            'title' => 'Events menu',
            'introduction' => $event_menu_category->name,
        ];

        $content['introduction'] = nl2br($content['introduction']);
        $settings = Settings::first();
        $meta_description = $settings->meta_description_catering??null;
        $is_production = app()->environment('production');

        return Inertia::render('Menu', compact(['event_menu_category', 'content' ,'products', 'filters', 'meta_description','is_production']));
    }

    public function giftCards()
    {
        return Inertia::render('GiftCards');
    }

    public function contact()
    {
        $content = ContactPageContent::first();
        $content->introduction = nl2br($content->introduction);
        $settings = Settings::first();
        $meta_description = $settings->meta_description_contact??null;
        $is_production = app()->environment('production');
        return Inertia::render('Contact', compact(['content', 'meta_description','is_production']));
    }

    public function sendMessage(Request $request)
    {
        $subjects = [
            'Order for a company',
            'Quote request for an event',
            'Potential partnership',
            'Press-related',
            'Order-related',
            'Job application',
        ];
        $subjects = implode(',',$subjects);
        $data = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string'],
            'subject' => ['required', 'in:'.$subjects],
            'message' => ['required', 'string'],
        ],[
            'name.*' => 'Please enter your name',
            'email.*' => 'Please enter a valid email address',
            'phone.*' => 'Please enter your phone number',
            'subject.*' => 'Please select a subject',
            'message.*' => 'Please enter your message',
        ]);
        try {
            if (app()->environment(['staging', 'production'])) {
                $email = env('ADMIN_EMAIL');
                if (!is_null($email)) {
                    $user = User::make(['email' => $email]);
                    $user->notify(new ContactFormNotification(
                        $data['name'], $data['email'], $data['phone'], $data['subject'], $data['message']
                    ));
                    return $this->success('Message sent');
                }
            } else {
                return $this->success('Message sent');
            }

        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'msg' => 'An error occurred'
            ]);
        }
        return $this->error('An error occurred');
    }

    public function terms()
    {
        $categories = TermsCategory::with(['paragraphs'])->orderBy('position')->get();
        return Inertia::render('Terms', compact(['categories']));
    }

    public function privacy()
    {
        $categories = PrivacyCategory::with(['paragraphs'])->orderBy('position')->get();
        return Inertia::render('Privacy', compact(['categories']));
    }

    protected function cart_items()
    {
        $total_amount = 0;
        $pickup_start_dates = [];
        $pickup_end_dates = [];
        $products_with_date_range = [];

        if(auth()->check()) {

            $user = auth()->user();
            $order_items = OrderItem::whereNull('order_id')->where('user_id', $user->id)
                ->with(['variation.product.event_menu_categories'])->get();

            foreach($order_items as $order_item) {
                $variation = $order_item->variation;
                if(!is_null($variation)) {
                    $price = $variation->price;
                    $quantity = $order_item->quantity;
                    $amount = $price * $quantity;
                    $order_item->variation_price = '$' . number_format($price, 2, '.',',');
                    $order_item->amount = '$' . number_format($amount, 2, '.',',');
                    $total_amount += $amount;
                    $order_item['weekend_only'] = $variation->weekend_only || $variation->product->weekend_only;
                    
                    // Collect pickup dates from event menu categories
                    $product = $variation->product;
                    if(!is_null($product) && $product->event_menu_categories) {
                        $has_date_range = false;
                        foreach($product->event_menu_categories as $category) {
                            if(!is_null($category->pickup_start_date)) {
                                $pickup_start_dates[] = Carbon::parse($category->pickup_start_date);
                                $has_date_range = true;
                            }
                            if(!is_null($category->pickup_end_date)) {
                                $pickup_end_dates[] = Carbon::parse($category->pickup_end_date);
                                $has_date_range = true;
                            }
                        }
                        // Collect product name if it has date range
                        if($has_date_range && !in_array($product->name, $products_with_date_range)) {
                            $products_with_date_range[] = $product->name;
                        }
                    }
                }
            }
            $is_weekend_only = $order_items->contains('weekend_only', true);
        } else {
            $order_items = session('cart_items')??[];
            $variation_ids = collect($order_items)->pluck('variation_id')->filter()->unique()->toArray();
            $variations = ProductVariation::with(['product.event_menu_categories'])
                ->whereIn('id', $variation_ids)->get();
            $is_weekend_only = false;
            foreach($order_items as &$order_item) {
                $variation = $variations->where('id', $order_item['variation_id'])->first();
                if(!is_null($variation)) {
                    $price = $variation->price;
                    $quantity = $order_item['quantity'];
                    $amount = $price * $quantity;
                    $order_item['variation_price'] = '$' . number_format($price, 2, '.',',');
                    $order_item['amount'] = '$' . number_format($amount, 2, '.',',');
                    $total_amount += $amount;
                    $weekend_only =  $variation->weekend_only || $variation->product->weekend_only;
                    $order_item['weekend_only'] = $weekend_only;
                    if($weekend_only) $is_weekend_only = true;
                    
                    // Add nested structure for frontend to access variation.product.allow_client_note
                    $order_item['variation'] = [
                        'product' => [
                            'allow_client_note' => $variation->product->allow_client_note,
                        ],
                    ];
                    
                    // Ensure client_note is included (it should already be there, but ensure it)
                    if(!isset($order_item['client_note'])) {
                        $order_item['client_note'] = null;
                    }
                    
                    // Collect pickup dates from event menu categories
                    $product = $variation->product;
                    if(!is_null($product) && $product->event_menu_categories) {
                        $has_date_range = false;
                        foreach($product->event_menu_categories as $category) {
                            if(!is_null($category->pickup_start_date)) {
                                $pickup_start_dates[] = Carbon::parse($category->pickup_start_date);
                                $has_date_range = true;
                            }
                            if(!is_null($category->pickup_end_date)) {
                                $pickup_end_dates[] = Carbon::parse($category->pickup_end_date);
                                $has_date_range = true;
                            }
                        }
                        // Collect product name if it has date range
                        if($has_date_range && !in_array($product->name, $products_with_date_range)) {
                            $products_with_date_range[] = $product->name;
                        }
                    }
                }
            }
            unset($order_item); // Unset reference to prevent issues
        }
        
        // Calculate minDate (max start date) and maxDate (min end date)
        $pickup_min_date = null;
        $pickup_max_date = null;
        
        if(count($pickup_start_dates) > 0) {
            $pickup_min_date = collect($pickup_start_dates)->max();
        }
        if(count($pickup_end_dates) > 0) {
            $pickup_max_date = collect($pickup_end_dates)->min();
        }
        
        return compact(['total_amount', 'order_items', 'is_weekend_only', 'pickup_min_date', 'pickup_max_date', 'products_with_date_range']);
    }

    public function cart()
    {
        // time
        $settings = Settings::first();
        $today = Carbon::now()->startOfDay()->addHours($settings->pickup_opening_hour);
        $time_instance = $today->copy();
        $last_time_instance = $today->copy()->setHour($settings->pickup_closing_hour);
        $available_times = collect();
        while($time_instance < $last_time_instance) {
            $available_times->push([
                'displayed_time' => $time_instance->format('H:i'),
                'pickup_code' => $time_instance->format('ymdHi'),
                'available' => false,
            ]);
            $time_instance->addMinutes($settings->interval_minutes);
        }
        $first_day = $today->copy()->addHours($settings->min_hours_before_pickup);
        $day_format = 'm/d/Y';
        $first_day_string = $first_day->format($day_format);
        $last_day = $first_day->copy()->addDays(9);
        $period = CarbonPeriod::create($first_day, $last_day);
        $quick_days = collect();

        // closed dates
        $closed_dates = ClosedDate::whereDate('datetime', '>=', $today)
            ->orderBy('datetime', 'desc')
            ->get();

        $cart_items = $this->cart_items();

        $is_weekend_only = $cart_items['is_weekend_only'];

        Log::info("weekend_only: {$is_weekend_only}");

        // pickup dates
        $first_pickup_date = $first_day->copy();
        $future_pickup_day_count = $settings->future_pickup_day_count;
        if(is_null($future_pickup_day_count)) {
            $last_pickup_date = $today->copy()->addDays(365);
        } else {
            $last_pickup_date = $today->copy()->addDays($future_pickup_day_count);
        }
        
        // Override with event menu category pickup dates if available
        $pickup_min_date = $cart_items['pickup_min_date'] ?? null;
        $pickup_max_date = $cart_items['pickup_max_date'] ?? null;
        
        if($pickup_min_date) {
            // Use the later of the two dates (max start date)
            $first_pickup_date = $pickup_min_date->gt($first_pickup_date) ? $pickup_min_date : $first_pickup_date;
        }
        
        if($pickup_max_date) {
            // Use the earlier of the two dates (min end date)
            $last_pickup_date = $pickup_max_date->lt($last_pickup_date) ? $pickup_max_date : $last_pickup_date;
        }

        foreach($period as $day) {
            $closed = false;
            $is_weekend = $day->isWeekend();
            foreach ($closed_dates as $closed_date) {
                if ($day->isSameDay($closed_date->datetime)) {
                    $closed = true;
                    break;
                }
            }
            if(!$closed) {
                if($is_weekend_only && !$is_weekend) {
                    $closed = true;
                }
            }
            if(!$closed) {
                if($day->endOfDay() <= $last_pickup_date->endOfDay()) {
                    $quick_days->push([
                        'day' => $day->format('D'),
                        'date' => $day->format('M d'),
                        'selection' => $day->format($day_format),
                    ]);
                }
            }
        }

        // time
        $total_amount = $cart_items['total_amount'];
        $order_items = $cart_items['order_items'];

        $total_amount = '$' . number_format($total_amount, 2, '.',',');

        $formatted_closed_dates = [];
        foreach($closed_dates as $closed_date) {
            $formatted_closed_dates[] = $closed_date->datetime->format('m/d/Y');
        }
        $closed_dates = $formatted_closed_dates;
        $is_auth = false;
        if(auth()->check()) {
            $user = auth()->user();
            $full_name = $user->full_name;
            $email = $user->email;
            $phone = $user->phone;
            $is_auth = true;
        } else {
            $full_name = session('full_name');
            $email = session('email');
            $phone = session('phone');
        }
        $first_pickup_date = $first_pickup_date->format($day_format);
        $last_pickup_date = $last_pickup_date->format($day_format);
        $settings = Settings::first();
        $order_notes = session('order_notes');
        
        // Pass pickup date range if available (at least one date)
        $pickup_date_range = null;
        if($pickup_min_date || $pickup_max_date) {
            $pickup_date_range = [
                'min_date' => $pickup_min_date ? $pickup_min_date->format($day_format) : null,
                'max_date' => $pickup_max_date ? $pickup_max_date->format($day_format) : null,
            ];
        }
        
        $products_with_date_range = $cart_items['products_with_date_range'] ?? [];
        
        return Inertia::render('Checkout/Cart', compact(['order_items', 'total_amount', 'quick_days', 'first_day_string', 'available_times', 'closed_dates', 'full_name', 'email', 'phone', 'is_auth', 'first_pickup_date', 'last_pickup_date', 'settings', 'order_notes', 'is_weekend_only', 'pickup_date_range', 'products_with_date_range']));
    }

    public function updateCartQuantity(Request $request)
    {
        $data = $request->validate([
            'uid' => ['required', 'uuid'],
            'quantity' => ['required', 'integer', 'min:0', 'max:1000'],
        ]);

        try {
            if (auth()->check()) {
                $user = auth()->user();
                $item = OrderItem::where('uid', $data['uid'])->where('user_id', $user->id)->first();
                if (!is_null($item)) {
                    $item->update(['quantity' => $data['quantity']]);
                }
            } else {
                $cartItems = session('cart_items', []);

                foreach ($cartItems as &$order_item) {
                    if ($order_item['uid'] === $data['uid']) {
                        $order_item['quantity'] = $data['quantity'];
                        break;
                    }
                }

                session(['cart_items' => $cartItems]);
            }
        } catch (\Exception $e) {
            return $this->error(null);
        }

        return $this->success(null);
    }

    public function updateOrderItemNote($item, Request $request)
    {
        $data = $request->validate([
            'note' => ['nullable', 'string'],
        ]);
        try {
            if(auth()->check()) {
                // Logged in user - update OrderItem
                $user = auth()->user();
                $orderItem = OrderItem::where('uid', $item)->where('user_id', $user->id)->whereNull('order_id')->first();
                if(!is_null($orderItem)) {
                    $orderItem->update([
                        'client_note' => $data['note']
                    ]);
                }
            } else {
                // Guest user - update session cart item
                $cartItems = session('cart_items', []);
                foreach ($cartItems as &$cart_item) {
                    if (isset($cart_item['uid']) && $cart_item['uid'] === $item) {
                        $cart_item['client_note'] = $data['note'];
                        break;
                    }
                }
                session(['cart_items' => $cartItems]);
            }
            return $this->success(null);
        } catch (\Exception $e) {
            return $this->error(null);
        }
    }

    public function deleteCartItem(Request $request)
    {
        $data = $request->validate([
            'uid' => ['required', 'uuid'],
        ]);

        try {
            if (auth()->check()) {
                $user = auth()->user();
                $order_item = OrderItem::where('uid', $data['uid'])->where('user_id', $user->id)->first();

                if ($order_item) {
                    $order_item->delete();
                }
            } else {
                $cart_items = session('cart_items', []);

                $cart_items = array_filter($cart_items, function ($order_item) use ($data) {
                    return $order_item['uid'] !== $data['uid'];
                });

                session(['cart_items' => $cart_items]);
            }
        } catch (\Exception $e) {
            return $this->error(null);
        }

        return $this->success(null);
    }

    public function getPickupTimes(Request $request)
    {
        $data = $request->validate([
            'date' => ['required', 'date_format:m/d/Y'],
        ]);

        $date = Carbon::createFromFormat('m/d/Y', $data['date'])->midDay();
        $settings = Settings::first();
        $today = Carbon::now()->startOfDay()->addHours($settings->pickup_opening_hour);
        $time_instance = $today->copy();
        $last_time_instance = $today->copy()->setHour($settings->pickup_closing_hour);
        $available_times = collect();
        $active_orders = Order::whereNotIn('status',[
            'initial', 'canceled',
        ])->get();
        while($time_instance < $last_time_instance) {
            $pickup_code = $date->format('ymd') . $time_instance->format('Hi');
            $available = $active_orders->where('pickup_code', $pickup_code)->count() < $settings->max_orders_per_slot;
            $available_times->push([
                'displayed_time' => $time_instance->format('H:i'),
                'pickup_code' => $pickup_code,
                'available' => $available,
            ]);
            $time_instance->addMinutes($settings->interval_minutes);
        }
        $data = compact('available_times');
        return response()->json($data);
    }


    public function addToCart(Request $request)
    {
        $data = $request->validate([
            'note' => ['nullable', 'string'],
        ]);
        $variation = ProductVariation::with(['product'])->where('deleted', false)
            ->where('uid', $request->input('variation_uid'))->first();
        $product = null;
        if(!is_null($variation)) {
            $product = $variation->product;
        };
        if(!is_null($product) && !is_null($variation)) {
            $note = null;
            if($product->allow_client_note) {
                $note = $data['note']??null;
            }
            if(auth()->check()) {
                $user = auth()->user();
                OrderItem::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'variation_id' => $variation->id,
                    'product_name' => $product->name,
                    'variation_name' => $variation->name,
                    'quantity' => $request->input('quantity'),
                    'thumbnail' => $request->input('thumbnail'),
                    'client_note' => $note,
                ]);
                $cart_count = OrderItem::whereNull('order_id')->where('user_id', $user->id)->count();
                Inertia::share(compact(['cart_count']));
            } else {
                $cart_items = session('cart_items')??[];
                $cart_items[] = [
                    'uid' => (string) Str::uuid(),
                    'product_id' => $product->id,
                    'variation_id' => $variation->id,
                    'product_name' => $product->name,
                    'variation_name' => $variation->name,
                    'quantity' => $request->input('quantity'),
                    'thumbnail' => $request->input('thumbnail'),
                    'client_note' => $note,
                ];
                session(['cart_items' => $cart_items]);
            }
            return $this->success('The product was added to your cart');
        }
        return $this->error('An error occurred');
    }

    public function orderCancel(Order $order)
    {
        $user = auth()->user();
        if($user->id !== $order->user_id || $order->status !== 'initial')  {
            return $this->error('An error occurred');
        }
        try {
            $order->update(['status' => 'canceled']);
            return to_route('orders');
        } catch (\Exception $e) {
            return $this->error('An error occurred');
        }
    }

    public function orderReset(Order $order)
    {
        $user = auth()->user();
        if($user->id !== $order->user_id || $order->status !== 'initial')  {
            return $this->error('An error occurred');
        }
        $items_back_in_cart = 0;
        foreach($order->items as $item) {
            $product = $item->product;
            $variation = $item->variation;

//            dd($item->toArray(),$item->product->toArray(),$item->variation->toArray());
            if(is_null($product) || is_null($variation)) {
                $item->delete();
                continue;
            }
            if(!$product->active || $product->deleted || $variation->deleted) {
                $item->delete();
                continue;
            }
            $data = [
                'order_id' => null,
                'product_name' => $product->name,
                'variation_name' => $variation->name,
                'variation_price' => $variation->price,
                'amount' => ($variation->price * $item->quantity),
            ];
            $item->update($data);
            $items_back_in_cart++;
        }
        $order->delete();
        if($items_back_in_cart > 0) return to_route('cart');
        return to_route('orders');
    }

    public function orderCheckout(Order $order, Request $request)
    {
        if($order->status !== 'initial') return 0;

        $messages = [
            'full_name.*' => 'Please enter your full name',
            'email.*' => 'Please enter a valid email address',
            'phone.*' => 'Please enter your phone number',
            'number' => 'The gift card number entered is invalid',
        ];

        $data = $request->validate([
            'full_name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string', 'min:7'],
            'date' => ['required', 'date_format:m/d/Y'],
            'time' => ['required', 'date_format:H:i'],
        ], $messages);

        $datetime = Carbon::createFromFormat('m/d/Y H:i', "{$data['date']} {$data['time']}");

        $settings = Settings::first();

        $pickup_code = $datetime->format('ymdHi');

        if(Order::where('pickup_code',$pickup_code)
                ->whereNotIn('status',[
                    'initial', 'canceled',
                ])
                ->count() >= $settings->max_orders_per_slot) {
            throw ValidationException::withMessages([
                'msg' => ['This pickup time slot has become unavailable'],
            ]);
        }

        Stripe::setApiKey(config('services.stripe.secret_key'));

        $total_amount = 0;

        $full_name = $data['full_name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $user = auth()->user();
        $user->update([
            'full_name' => $full_name,
            'phone' => $phone,
        ]);

        $order_items = OrderItem::where('order_id', $order->id)->where('user_id', $user->id)->get();


        $line_items = [];

        foreach($order_items as $order_item) {
            $variation = $order_item->variation;
            if(!is_null($variation)) {
                $price = $variation->price;
                $quantity = $order_item->quantity;
                $amount = $price * $quantity;
                $order_item->update([
                    'variation_price' => $price,
                    'amount' => $amount,
                ]);
                $total_amount += $amount;
                $line_items[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => "{$order_item->product_name} ($order_item->variation_name)",
                        ],
                        'unit_amount' => $order_item->variation_price * 100,
                    ],
                    'quantity' => $order_item->quantity,
                ];
            }
        }

        $char = 'X';
        if($order->type === 'catering') {
            $char = 'M';
        } else if($order->type === 'add-on') {
            $char = 'A';
        }

        Log::info('creating checkout session');
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [$line_items],
            // todo add currency
            'mode' => 'payment',
            'customer_email' => $user->email,
            'success_url' => route('checkout_success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout_error').'?session_id={CHECKOUT_SESSION_ID}',
            'client_reference_id' => $char . $order->number,
        ]);

        $order->update([
            'stripe_session_id' => $session->id,
            'datetime' => $datetime,
            'full_name' => $full_name,
            'email' => $email,
            'phone' => $phone,
            'pickup_code' => $pickup_code,
        ]);

        foreach($order_items as $order_item) {
            $order_item->update(['order_id' => $order->id]);
        }

        return response()->json(['id' => $session->id, 'url' => $session->url]);
    }

    public function checkout(Request $request)
    {
        $rules = [
            'date' => ['required', 'date_format:m/d/Y'],
            'time' => ['required', 'date_format:H:i'],
            'number' => [
                'nullable',
                'string',
                'size:19',
                'regex:/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/'
            ],
        ];

        $messages = [
            'full_name.*' => 'Please enter your full name',
            'email.*' => 'Please enter a valid email address',
            'phone.*' => 'Please enter your phone number',
            'number' => 'The gift card number entered is invalid',
        ];

        $rules['full_name'] = ['required', 'string'];
        $rules['email'] = ['required', 'email'];
        $rules['phone'] = ['required', 'string', 'min:7'];
        $rules['notes'] = ['nullable', 'string'];

        $data = $request->validate($rules, $messages);

        $datetime = Carbon::createFromFormat('m/d/Y H:i', "{$data['date']} {$data['time']}");

        $settings = Settings::first();

        $pickup_code = $datetime->format('ymdHi');

        if(Order::where('pickup_code',$pickup_code)
                ->whereNotIn('status',[
                    'initial', 'canceled',
                ])
                ->count() >= $settings->max_orders_per_slot) {
            throw ValidationException::withMessages([
                'msg' => ['This pickup time slot has become unavailable'],
            ]);
        }
        Stripe::setApiKey(config('services.stripe.secret_key'));

        $notes = $data['notes']??null;

        session(['notes' => $notes]);


        $line_items = [];

        // order number
        $order_number = Order::max('number')??23748923;
        $order_number = intval($order_number) + 151;

        // contact info
        $full_name = $data['full_name'];
        $email = $data['email'];
        $phone = $data['phone'];
        if(auth()->check()) {
            $user = auth()->user();
            $user->update([
                'full_name' => $full_name,
                'phone' => $phone,
            ]);
            $email = $user->email;
        } else {
            session(['full_name' => $full_name]);
            session(['email' => $email]);
            session(['phone' => $phone]);
        }

        $session_required = true;
        $amount_stripe = 0;
        $amount_gift_card = 0;

        // gift card
        $card = null;
        if(!is_null($data['number']??null)) {
            $card = GiftCard::where('number', $data['number'])->where('email', $email)
                ->where('active', true)
                ->where('balance', '>', 0)->first();
        }
        $coupon = null;
        $cart_items = $this->cart_items();
        $total_amount = $cart_items['total_amount'];
        if(!is_null($card)) {

            $balance = $card->balance;

            if($total_amount > $balance) {
                $amount_gift_card = $balance;
                $amount_remainder = $total_amount - $balance;
                $amount_stripe = $amount_remainder;
                $coupon = Coupon::create([
                    'amount_off' => ($amount_gift_card * 100),
                    'currency' => 'usd',
                    'duration' => 'once',
                ]);
            } else {
                $amount_gift_card = $total_amount;
                $session_required = false;
            }
        } else {
            $amount_stripe = $total_amount;
        }

        // order process

        $total_amount = 0;

        if(auth()->check()) {

            $user = auth()->user();

            $order_items = OrderItem::whereNull('order_id')->where('user_id', $user->id)->get();

            foreach($order_items as $order_item) {
                $variation = $order_item->variation;
                if(!is_null($variation)) {
                    $price = $variation->price;
                    $quantity = $order_item->quantity;
                    $amount = $price * $quantity;
                    $order_item->update([
                        'variation_price' => $price,
                        'amount' => $amount,
                    ]);
                    $total_amount += $amount;
                    $line_items[] = [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => "{$order_item->product_name} ({$order_item->variation_name})",
                            ],
                            'unit_amount' => $order_item->variation_price * 100,
                        ],
                        'quantity' => $order_item->quantity,
                    ];
                }
            }

            Log::info('creating checkout session');
            $session_params = [
                'payment_method_types' => ['card'],
                'line_items' => [$line_items],
                'mode' => 'payment',
                'success_url' => route('checkout_success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout_error').'?session_id={CHECKOUT_SESSION_ID}',
                'client_reference_id' => 'M' . $order_number,
            ];

            if(!is_null($coupon)) {
                $session_params['discounts'] = [[
                    'coupon' => $coupon->id,
                ]];
            }

            if (!is_null($user->stripe_id)) {
                $session_params['customer'] = $user->stripe_id;
            } else {
                $session_params['customer_email'] = $email;
            }

            if (app()->environment('local')) {
                Stripe::setVerifySslCerts(false);
            }

            if($session_required) {
                $session = Session::create($session_params);
                $session_id = $session->id;
            } else {
                $session_id  = 'n/a';
            }

            $order = Order::create([
                'user_id' => $user->id,
                'stripe_session_id' => $session_id,
                'number' => $order_number,
                'datetime' => $datetime,
                'full_name' => $full_name,
                'email' => $email,
                'phone' => $phone??'0000000000',
                'amount' => $total_amount,
                'amount_stripe' => $amount_stripe,
                'amount_gift_card' => $amount_gift_card,
                'pickup_code' => $pickup_code,
                'status' => 'initial',
                'notes' => $notes,
            ]);

            foreach($order_items as $order_item) {
                $order_item->update(['order_id' => $order->id]);
            }

        } else {

            // guest checkout

            $session_order_items = session('cart_items')??[];
            $variations = ProductVariation::with(['product'])->where('deleted', false)->get();

            Log::info('creating checkout session');

            foreach($session_order_items as $session_order_item) {
                $variation = $variations->where('id', $session_order_item['variation_id'])->first();
                if(!is_null($variation)) {
                    $price = $variation->price;
                    $quantity = $session_order_item['quantity'];
                    $amount = $price * $quantity;
                    $session_order_item['variation_price'] = $price;
                    $session_order_item['amount'] = $amount;
                    $total_amount += $amount;

                    $line_items[] = [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => "{$session_order_item['product_name']} ({$session_order_item['variation_name']})",
                            ],
                            'unit_amount' => $session_order_item['variation_price'] * 100,
                        ],
                        'quantity' => $session_order_item['quantity'],
                    ];
                }
            }


            $session_params = [
                'payment_method_types' => ['card'],
                'line_items' => [$line_items],
                'mode' => 'payment',
                'success_url' => route('checkout_success').'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout_error').'?session_id={CHECKOUT_SESSION_ID}',
                'client_reference_id' => 'M' . $order_number,
            ];

            if(!is_null($coupon)) {
                $session_params['discounts'] = [[
                    'coupon' => $coupon->id,
                ]];
            }

            $session_params['customer_email'] = $data['email'];

            if($session_required) {
                $session = Session::create($session_params);
                $session_id = $session->id;
            } else {
                $session_id  = 'n/a';
            }

            $order = Order::create([
                'stripe_session_id' => $session_id,
                'number' => $order_number,
                'datetime' => $datetime,
                'full_name' => $full_name,
                'email' => $email,
                'phone' => $phone??'0000000000',
                'amount' => $total_amount,
                'amount_stripe' => $amount_stripe,
                'amount_gift_card' => $amount_gift_card,
                'status' => 'initial',
                'notes' => $notes,
            ]);

            foreach($session_order_items as $session_order_item) {
                $variation = $variations->where('id', $session_order_item['variation_id'])->first();
                if(!is_null($variation)) {
                    $price = $variation->price;
                    $quantity = $session_order_item['quantity'];
                    $amount = $price * $quantity;
                    $session_order_item['variation_price'] = $price;
                    $session_order_item['amount'] = $amount;
                    $total_amount += $amount;

                    $product = $variation->product;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'variation_id' => $variation->id,
                        'product_name' => $product->name,
                        'variation_name' => $variation->name,
                        'variation_price' => $variation->price,
                        'amount' => $amount,
                        'quantity' => $session_order_item['quantity'],
                        'thumbnail' => "/images/products/{$variation->image}",
                        'client_note' => $session_order_item['client_note'] ?? null,
                    ]);
                }
            }

        }

        // lock in the amount of the gift card
        $payment = null;
        if($card && $amount_gift_card > 0) {
            $payment = GiftCardPayment::create([
                'gift_card_id' => $card->id,
                'order_id' => $order->id,
                'amount' => $amount_gift_card,
                'status' => 'pledged',
            ]);
            $card->update([
                'balance' => $card->balance - $amount_gift_card,
            ]);
        }
        // complete purchase with gift card
        if($session_required) {
            return response()->json(['id' => $session->id, 'url' => $session->url]);
        } else {
            $order->update(['status' => 'paid']);
            if(!is_null($payment) && $card && $amount_gift_card > 0) {
                $payment->update(['status' => 'complete']);
            }
            return response()->json(['id' => 'n/a', 'url' => route('checkout_success')]);
        }

    }

    public function checkoutSuccess()
    {
        if(auth()->guest()) {
            session(['cart_items' => null]);
            $cart_count = 0;
            Inertia::share(compact(['cart_count']));
        }
        return Inertia::render('Checkout/Success');
    }
    public function checkoutError()
    {
        return Inertia::render('Checkout/Error');
    }

    // gift card checkout


    public function giftCardCheckout(Request $request)
    {
        $rules = [
            'recipient' => ['required', 'email'],
            'amount' => ['required', 'integer', 'min:10', 'max:1000'],
        ];

        if(auth()->guest()) {
            $rules['email'] = ['required', 'email'];
        }

        $data = $request->validate($rules);

        Stripe::setApiKey(config('services.stripe.secret_key'));

        $total_amount = 0;

        $line_items = [];

        // order number
        $order_number = GiftCardOrder::max('number')??23748923;
        $order_number = intval($order_number) + 151;

        $total_amount += $data['amount'];
        $line_items[] = [
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => "Le Petit Four Gift Card",
                ],
                'unit_amount' => $data['amount'] * 100,
            ],
            'quantity' => 1,
        ];

        Log::info('creating checkout session');
        $session_params = [
            'payment_method_types' => ['card'],
            'line_items' => [$line_items],
            'mode' => 'payment',
            'success_url' => route('checkout_success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout_error').'?session_id={CHECKOUT_SESSION_ID}',
            'currency' => 'usd',
            'client_reference_id' => 'C' . $order_number,
        ];

        if(auth()->check()) {
            $user = auth()->user();

            $email = $user->email;

            if (is_null($user->stripe_id)) {
                $session_params['customer_email'] = $email;
            } else {
                $session_params['customer'] = $user->stripe_id;
            }
        } else {
            $email = $data['email'];
            $session_params['customer_email'] = $email;
        }

        $session = Session::create($session_params);

        $order_params = [
            'stripe_session_id' => $session->id,
            'number' => $order_number,
            'amount' => $total_amount,
            'email' => $email,
            'recipient' => $data['recipient'],
            'status' => 'initial',
        ];

        if(auth()->check()) {
            $user = auth()->user();
            $order_params['user_id'] = $user->id;
        }

        $order = GiftCardOrder::create($order_params);

        return response()->json(['id' => $session->id, 'url' => $session->url]);
    }

    public function giftCardCheckoutSuccess()
    {
        return Inertia::render('Checkout/Success');
    }
    public function giftCardCheckoutError()
    {
        return Inertia::render('Checkout/Error');
    }

    // end gift card checkout

    public function verifyGiftCard(Request $request)
    {
        $check = auth()->check();

        $message = '';
        $color = 'red';
        $amount_gift_card = 0;
        $amount_remainder = 0;
        $verified = false;

        $data = $request->validate([
            'number' => [
                'required',
                'string',
                'size:19',
                'regex:/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/'
            ],
            'email' => [
                ($check ? 'nullable' : 'required'),
                'email',
            ],
        ], [
            'number.*' => 'Please enter a valid gift card code and email address',
        ]);

        $number = $request->input('number');

        if($check) {
            $user = auth()->user();
            $email = $user->email;
        } else {
            $email = $request->input('email');
        }

        // does card exist
        $card = GiftCard::where('number', $data['number'])->where('email', $email)
            ->where('active', true)
            ->where('balance', '>', 0)->first();
        if(is_null($card)) {
            $message = "There is no active gift card with the code {$data['number']} and the email address {$email}.";
        } else {
            $verified = true;
            $color = 'green';
            $message = 'The gift card entered can be used for this purchase.';

            $cart_items = $this->cart_items();
            $total_amount = $cart_items['total_amount'];

            $balance = $card->balance;

            if($total_amount > $balance) {
                $amount_gift_card = $balance;
                $amount_remainder = $total_amount - $balance;
            } else {
                $amount_gift_card = $total_amount;
            }
        }

        $data = compact(['message', 'color', 'amount_gift_card', 'amount_remainder', 'verified']);
        return response()->json($data);
    }


}
