<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Square\Models\CatalogItem;
use Square\Models\CatalogItemVariation;
use Square\Models\CatalogObject;
use Square\Models\CatalogSubscriptionPlan;
use Square\Models\Money;
use Square\Models\SubscriptionPhase;
use Square\SquareClient;

class SubscriptionPlansSeeder extends Seeder
{


    protected function subscription_plans()
    {
        return [
            [
                'position' => 1,
                'name' => 'Standard',
                'french_name' => 'La Provencale',
                'image' => 'icon-lavender.png',
                'price_monthly' => 30,
                'price_biweekly' => 60,
                'price_weekly' => 120,
                'frequency' => 'monthly/bi-weekly/weekly',
                'has_delivery' => true,
                'has_custom_boxes' => false,
                'has_customization' => false,
                'has_add_ons' => false,
                'has_private_events' => false,
            ],
            [
                'position' => 2,
                'name' => 'Premium',
                'french_name' => 'La Parisienne',
                'image' => 'icon-effeil-tower.png',
                'frequency' => 'monthly/bi-weekly/weekly',
                'price_monthly' => 60,
                'price_biweekly' => 120,
                'price_weekly' => 240,
                'has_delivery' => true,
                'has_custom_boxes' => true,
                'has_customization' => true,
                'has_add_ons' => true,
                'has_private_events' => true,
            ],
        ];
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach($this->subscription_plans() as $subscription_plan) {
            SubscriptionPlan::updateOrCreate(
                ['name' => $subscription_plan['name']],
                [
                    'french_name' => $subscription_plan['french_name'],
                    'image' => $subscription_plan['image'],
                    'frequency' => $subscription_plan['frequency'],
                    'has_delivery' => $subscription_plan['has_delivery'],
                    'has_custom_boxes' => $subscription_plan['has_custom_boxes'],
                    'has_customization' => $subscription_plan['has_customization'],
                    'has_add_ons' => $subscription_plan['has_add_ons'],
                    'has_private_events' => $subscription_plan['has_private_events'],
                    'position' => $subscription_plan['position'],
                    'price_monthly' => $subscription_plan['price_monthly'],
                    'price_biweekly' => $subscription_plan['price_biweekly'],
                    'price_weekly' => $subscription_plan['price_weekly'],
                    'price_monthly_string' => number_format($subscription_plan['price_monthly'], 2,'.',','),
                    'price_biweekly_string' => number_format($subscription_plan['price_biweekly'], 2,'.',','),
                    'price_weekly_string' => number_format($subscription_plan['price_weekly'], 2,'.',','),
                    'active' => true,
                ],
            );
        }

    }
}
