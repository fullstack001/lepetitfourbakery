<?php

use App\Models\LandingModal;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('landing_modals', function (Blueprint $table) {
            $table->id();
            $table->string('title_top')->default('Modal title');
            $table->string('content_top')->default('Modal content');
            $table->string('title_bottom')->nullable();
            $table->string('content_bottom')->nullable();
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('delay_seconds')->default(9);
            $table->dateTime('active_begin_date')->nullable();
            $table->dateTime('active_end_date')->nullable();
            $table->timestamps();
        });
        LandingModal::create();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_modals');
    }
};
