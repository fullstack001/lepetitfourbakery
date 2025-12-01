<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\WebController;
use App\Models\Product;
use App\Models\ProductVariation;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionsController extends WebController
{
    public function home()
    {
        $plans = SubscriptionPlan::with(['variations'])->orderBy('position')->get();
        $products = ProductVariation::with('product')->where('deleted', false)
            ->get()
            ->groupBy(function($variation) {
                return $variation->product->name;
            });
        $plans->append(['variation_uids', 'quantities']);
        return Inertia::render('Admin/Subscriptions/Plans', compact(['plans', 'products']));
    }

    public function updatePlan(SubscriptionPlan $plan, Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'price_monthly' => ['required', 'numeric'],
            'price_biweekly' => ['required', 'numeric'],
            'price_weekly' => ['required', 'numeric'],
            'variations' => ['nullable', 'array', 'exists:product_variations,uid'],
            'quantities' => [$plan->has_customization ? 'nullable' : 'required_with:variations', 'array'],
            'active' => ['nullable'],
        ],[
            'name.*' => 'Please enter a valid plan name',
            'price_monthly.*' => 'Required',
            'price_biweekly.*' => 'Required',
            'price_weekly.*' => 'Required',
            'variations.*' => 'Please select at least one product',
            'quantities.*' => 'Please select valid quantities',
        ]);
        $plan->update([
            'name' => $data['name'],
            'price_monthly' => $data['price_monthly'],
            'price_biweekly' => $data['price_biweekly'],
            'price_weekly' => $data['price_weekly'],
            'price_monthly_string' => '$' . number_format($data['price_monthly'], 2, '.',','),
            'price_biweekly_string' => '$' . number_format($data['price_biweekly'], 2, '.',','),
            'price_weekly_string' => '$' . number_format($data['price_weekly'], 2, '.',','),
            'active' => $data['active'],
        ]);
        $variations = ProductVariation::whereIn('uid', $data['variations'])->get();
        $variation_ids = $variations->pluck('id')->toArray();
        foreach($variations as $variation) {
            $product = SubscriptionProduct::updateOrCreate([
                'plan_id' => $plan->id,
                'product_id' => $variation->product_id,
                'variation_id' => $variation->id,
            ],[
                'quantity' => ($data['quantities'][$variation->uid]??1),
                'position' => 1,
            ]);
        }
        SubscriptionProduct::where('plan_id', $plan->id)
            ->whereNotIn('variation_id', $variation_ids)->delete();
        return $this->success('The plan was successfully updated');
    }
}
