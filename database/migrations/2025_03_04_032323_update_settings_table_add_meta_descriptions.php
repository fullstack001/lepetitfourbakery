<?php

use App\Models\Settings;
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
        Schema::table('settings', function (Blueprint $table) {
            $table->after('sunday_opening_times', function($table) {
                $table->string('meta_description_home',300)->nullable();
                $table->string('meta_description_boutique',300)->nullable();
                $table->string('meta_description_catering',300)->nullable();
                $table->string('meta_description_contact',300)->nullable();
            });
        });
        $meta_description_home = 'Le Petit Four bakery offers authentic, 100% homemade French viennoiseries made with premium ingredients for rich flavor. Experience a taste of France today!';
        $meta_description_boutique = 'Experience authentic French craftsmanship, quality ingredients, and rich tradition. Discover the story, passion, and culture behind everything we create.';
        $meta_description_catering = 'Enjoy authentic French catering made with the finest ingredients. Place your order, choose a pickup date, and savor handcrafted pastries for any occasion.';
        $meta_description_contact = 'Get in touch with us for inquiries, orders, or assistance. We\'re here to help and look forward to welcoming you to our bakery.';
        $settings = Settings::first();
        if(!is_null($settings)) {
            $settings->update(compact([
                'meta_description_home',
                'meta_description_boutique',
                'meta_description_catering',
                'meta_description_contact',
            ]));
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn(['meta_description_home', 'meta_description_boutique', 'meta_description_catering', 'meta_description_contact']);
        });
    }
};
