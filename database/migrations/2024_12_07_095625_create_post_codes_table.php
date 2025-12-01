<?php

use App\Models\PostCode;
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
        Schema::create('post_codes', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')->unique();
            $table->string('post_code');
            $table->double('extra_fee')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        foreach([
                    '02481','02457','02462','02482','02494','02468','02492','02464','02466','02461','02493','02465','02495','02459','01760','02460','02453','02030','02454','02458','02132','01778','02467','02451','02477','02471','02472','02026','02452','02135','02027','02090','02445','01770','02478','01705','01704','01703','02447','02131','02130','02446','02456','02134','02136','01701','01773','02479','02138','02163','02476','02215','02052'
                ] as $code) {
            PostCode::create([
                'post_code' => $code,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_codes');
    }
};
