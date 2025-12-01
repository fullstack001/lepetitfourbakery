<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    protected function sizes($value)
    {
            $value--;
            return [
                2,1,1,2,1,1,1,2,1
            ][$value]??1;
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            for ($i = 1; $i <= 9; $i++) {
                $table->unsignedTinyInteger("module_{$i}_size")
                    ->default($this->sizes($i))
                    ->after("module_{$i}_button_link");
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            for ($i = 1; $i <= 9; $i++) {
                $table->dropColumn("module_{$i}_size");
            }
        });
    }
};
