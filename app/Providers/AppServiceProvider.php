<?php

namespace App\Providers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Builder;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Builder::defaultStringLength(191);
        Schema::defaultStringLength(125);
        if(app()->environment(['staging','production'])) {
            URL::forceScheme('https');
        }
        Inertia::share('errors', function () {
            return Session::get('errors')
                ? Session::get('errors')
                : (object) [];
        });
        Inertia::share('error', function () {
            return Session::get('error')
                ? Session::get('error')
                : (object) [];
        });
        Inertia::share([
            'flash' => function () {
                return [
                    'message' => Session::get('flash.message'),
                    'error' => Session::get('flash.error'),
                ];
            },
        ]);
    }
}