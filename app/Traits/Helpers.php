<?php

namespace App\Traits;

use App\Models\OrderItem;
use App\Models\OrderItemUnit;
use App\Notifications\Reminder;
use Illuminate\Support\Facades\Log;
use Square\Exceptions\ApiException;
use Square\Models\CustomerFilter;
use Square\Models\CustomerQuery;
use Square\Models\CustomerTextFilter;
use Square\Models\SearchCustomersRequest;
use Square\Models\SearchOrdersCustomerFilter;
use Square\Models\SearchOrdersFilter;
use Square\Models\SearchOrdersQuery;
use Square\Models\SearchOrdersRequest;

trait Helpers
{

    public function send_notification($user, $subject, $greeting, $message,
                                      $button_text, $button_url, $thanks)
    {
        if(!is_null($user) && app()->environment(['staging', 'production'])) {
            $user->notify(new Reminder(
                $subject,
                $greeting,
                $message,
                $button_text,
                $button_url,
                $thanks,
            ));
        }
    }

    public function createOrderItemUnits(): void
    {
        foreach(OrderItem::whereNotNull('order_id')->get() as $order_item) {
            $this->processUnits($order_item);
        }
    }

    protected function processUnits(OrderItem $order_item): void
    {
        if($order_item->units()->count() === 0) {
            $variation = $order_item->variation;
            if(!is_null($variation)) {
                if($variation->is_box) {
                    foreach($variation->box_products as $box_product) {
                        $box_product_variation = $box_product->variation;
                        if(!is_null($box_product_variation)) {
                            $unit = OrderItemUnit::create([
                                'user_id' => $order_item->user_id,
                                'order_id' => $order_item->order_id,
                                'order_item_id' => $order_item->id,
                                'product_id' => $box_product_variation->product_id,
                                'variation_id' => $box_product_variation->id,
                                'product_name' => $box_product_variation->product->name,
                                'variation_name' => $box_product_variation->name,
                                'variation_price' => $box_product_variation->price,
                                'quantity_per_variation' => $box_product_variation->items,
                                'quantity_in_box' => $box_product->quantity,
                                'ordered_quantity' => $order_item->quantity,
                                'thumbnail' => "/images/products/{$box_product_variation->image}",
                            ]);
                        }
                    }
                } else {
                    $unit = OrderItemUnit::create([
                        'user_id' => $order_item->user_id,
                        'order_id' => $order_item->order_id,
                        'order_item_id' => $order_item->id,
                        'product_id' => $variation->product_id,
                        'variation_id' => $variation->id,
                        'product_name' => $variation->product->name,
                        'variation_name' => $variation->name,
                        'variation_price' => $variation->price,
                        'quantity_per_variation' => $variation->items,
                        'ordered_quantity' => $order_item->quantity,
                        'quantity_in_box' => 1,
                        'thumbnail' => "/images/products/{$variation->image}",
                    ]);
                }
            }
        }
    }

}
