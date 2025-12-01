<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        if (env('DISABLE_SCHEDULER', false)) {
            return; // Skip all scheduled jobs
        }
        // Run polling command every minute (single-run command)
        $schedule->command('app:toast-croissant-polling')
            ->everyMinute()
            ->withoutOverlapping()
            ->name('toast-croissant-every-minute')
            ->timezone('America/New_York');

        // Historical data (once daily at midnight)
        $schedule->command('app:toast-croissant-counter --mode=historical')
            ->dailyAt('00:00')
            ->timezone('America/New_York');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}