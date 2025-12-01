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
            $table->text('title_top')->change();
            $table->text('content_top')->change();
            $table->text('title_bottom')->change();
            $table->text('content_bottom')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('landing_modals', function (Blueprint $table) {
            $table->string('title_top')->change();
            $table->string('content_top')->change();
            $table->string('title_bottom')->change();
            $table->string('content_bottom')->change();
        });
    }
};
