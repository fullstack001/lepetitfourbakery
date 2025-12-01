<?php

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
        Schema::table('landing_modals', function (Blueprint $table) {
            $table->text('title_top')->nullable(true)->change();
            $table->text('content_top')->nullable(true)->change();
            $table->text('title_bottom')->nullable(true)->change();
            $table->text('content_bottom')->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('landing_modals', function (Blueprint $table) {
            $table->text('title_top')->nullable(false)->change();
            $table->text('content_top')->nullable(false)->change();
            $table->text('title_bottom')->nullable(false)->change();
            $table->text('content_bottom')->nullable(false)->change();
        });
    }
};
