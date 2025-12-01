<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class ToastCroissantPolling extends Command
{
    protected $signature = 'app:toast-croissant-polling';
    protected $description = 'Continuously poll Toast every minute for 15 minutes and update Vestaboard';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔄 Starting 15-minute polling loop at ' . now()->format('H:i:s'));

        $iterations = 15; // number of 1-minute loops (15 minutes total)
        for ($i = 1; $i <= $iterations; $i++) {
            $startTime = Carbon::now()->format('H:i:s');
            $this->line("▶️  Loop {$i}/{$iterations} — {$startTime}");

            try {
                // Call the counter in “today” mode
                $exitCode = $this->call('app:toast-croissant-counter', ['--mode' => 'today']);

                if ($exitCode === 0) {
                    $this->info("✅ Loop {$i}: updated successfully");
                } else {
                    $this->error("❌ Loop {$i}: update failed (exit code {$exitCode})");
                }
            } catch (\Throwable $e) {
                $this->error("💥 Loop {$i}: exception — " . $e->getMessage());
            }

            // Don’t sleep after the last iteration
            if ($i < $iterations) {
                $this->line("⏸ Sleeping 60 seconds before next poll...");
                sleep(40);
            }
        }

        $this->info('🏁 Finished polling loop at ' . now()->format('H:i:s'));
        return 0;
    }
}