<?php

namespace App\Http\Controllers;

use App\Models\ClosedDate;
use App\Models\Order;
use App\Models\PostCode;
use App\Models\Settings;
use App\Models\User;
use App\Traits\Helpers;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AccountsController extends WebController
{

    use Helpers;
    public function account()
    {
        $user = auth()->user();
        return Inertia::render('Account', compact(['user']));
    }

    public function getAddress()
    {
        $user = auth()->user();
        $phone = $user->phone;
        $full_name = $user->full_name;
        $address_1 = $user->address_1;
        $address_2 = $user->address_2;
        $post_code = $user->post_code;
        $city = $user->city;
        $data = compact([
            'phone',
            'full_name',
            'address_1',
            'address_2',
            'post_code',
            'city',
        ]);

        return response()->json($data);
    }

    public function updateAddress(Request $request)
    {
        $post_codes = PostCode::where('active', true)->pluck('post_code')->toArray();
        $data = $request->validate([
            'phone' => ['required', 'string', 'min:2', 'max:100'],
            'full_name' => ['required', 'string', 'min:2', 'max:100'],
            'address_1' => ['required', 'string', 'min:2', 'max:100'],
            'address_2' => ['nullable', 'string', 'min:2', 'max:100'],
            'post_code' => ['required', 'string', 'size:5', Rule::in($post_codes)],
            'city' => ['required', 'string', 'min:2', 'max:100'],
        ], [
            'phone.*' => 'Please enter a phone number',
            'full_name.*' => 'Please enter your full name',
            'address_1.*' => 'Please enter your address',
            'address_2.*' => 'Please enter your address',
            'post_code.in' => 'This post code is outside of our delivery zone',
            'post_code.*' => 'Please enter a valid post code',
            'city.*' => 'Please enter a city',
        ]);
        try {
            $user = auth()->user();
            $user->update([
                'phone' => $data['phone'],
                'full_name' => $data['full_name'],
                'address_1' => $data['address_1'],
                'address_2' => $data['address_2'],
                'post_code' => $data['post_code'],
                'city' => $data['city'],
            ]);
        } catch (ValidationException $e) {
            throw ValidationException::withMessages([
                'msg' => ['An error occurred'],
            ]);
        } catch (\Exception $e) {
            return $this->error('An error occurred');
        }
        return $this->success('The delivery address has been updated');
    }

    public function savePostcode(Request $request)
    {
        $data = $request->validate([
            'postcode' => ['required', 'string', 'size:5'],
        ], [
            'postcode.*' => 'Please enter a valid post code',
        ]);
        $user = auth()->user();
        $user->update(['post_code' => $data['postcode']]);
    }

    public function orders()
    {
        $user = auth()->user();

        $orders = Order::with(['items', 'items.product', 'items.variation'])
            ->whereIn('type', ['catering', 'add-on'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return Inertia::render('Orders/Home', compact(['user', 'orders']));
    }

    public function order(Order $order)
    {
        $order->load(['items', 'items.product', 'items.variation']);

        $user = auth()->user();
        if($order->type === 'add-on') {
            $date = $user->next_available_date;
            if(!is_null($date)) $date = $date->format('m/d/Y');
        } else {
            $date = $order->datetime->format('m/d/Y');
        }
        $time = $order->datetime->format('H:i');


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
        $date_valid = $order->datetime->startOfDay() >= $first_day;
        $day_format = 'm/d/Y';
        $first_day_string = $first_day->format($day_format);
        $last_day = $first_day->copy()->addDays(9);
        $period = CarbonPeriod::create($first_day, $last_day);
        $quick_days = collect();

        // closed dates
        $closed_dates = ClosedDate::whereDate('datetime', '>=', $today)
            ->orderBy('datetime', 'desc')
            ->get();

        // pickup dates
        $first_pickup_date = $first_day->copy();
        $future_pickup_day_count = $settings->future_pickup_day_count;
        if(is_null($future_pickup_day_count)) {
            $last_pickup_date = $today->copy()->addDays(365);
        } else {
            $last_pickup_date = $today->copy()->addDays($future_pickup_day_count);
        }

        foreach($period as $day) {
            $closed = false;
            foreach ($closed_dates as $closed_date) {
                if ($day->isSameDay($closed_date->datetime)) {
                    $closed = true;
                    break;
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
        $total_amount = $order->items()->sum('amount');
        $total_amount = '$' . number_format($total_amount, 2, '.',',');
        $user = auth()->user();
        $full_name = $user->full_name;
        $email = $user->email;
        $phone = $user->phone;
        $first_pickup_date = $first_pickup_date->format($day_format);
        $last_pickup_date = $last_pickup_date->format($day_format);
        return Inertia::render('Orders/Single',
            compact(['order', 'date', 'time', 'quick_days', 'first_day_string', 'available_times', 'closed_dates', 'date_valid', 'total_amount', 'full_name', 'email', 'phone', 'first_pickup_date', 'last_pickup_date']));
    }
}
