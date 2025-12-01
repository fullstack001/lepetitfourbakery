<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'stripe' => [
        'publishable_key' => env('STRIPE_PUBLISHABLE_KEY', ''),
        'secret_key' => env('STRIPE_SECRET_KEY', ''),
        'signing_secret' => env('STRIPE_SIGNING_SECRET', ''),
    ],

    'toast' => [
        'restaurant_id' => env('TOAST_RESTAURANT_ID', ''),
        'restaurant_guid' => env('TOAST_RESTAURANT_GUID', ''),
        'api_hostname' => env('TOAST_API_HOSTNAME', ''),
        'user_access_type' => env('TOAST_USER_ACCESS_TYPE', ''),
        'client_id' => env('TOAST_CLIENT_ID', ''),
        'client_secret' => env('TOAST_CLIENT_SECRET', ''),
        'analytics_client_id' => env('TOAST_ANALYTICS_CLIENT_ID', ''),
        'analytics_client_secret' => env('TOAST_ANALYTICS_CLIENT_SECRET', ''),
        'analytics_user_access_type' => env('TOAST_ANALYTICS_USER_ACCESS_TYPE', ''),
        'analytics_api_hostname' => env('TOAST_ANALYTICS_API_HOSTNAME', ''),
    ],
];