<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('website_name')->nullable();
            $table->string('website_logo')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('hotel_address')->nullable();
            $table->string('hotel_contact_no')->nullable();
            $table->string('contact_person_mobile')->nullable();
            $table->string('hotel_email')->nullable();
            $table->string('hotel_facebook_page')->nullable();
            $table->string('hotel_instagram_page')->nullable();
            $table->string('hotel_twitter_page')->nullable();
            $table->text('hotel_short_info')->nullable();
            $table->decimal('gst', 11, 2)->default(0.00);
            $table->integer('persons_allowed_for_spa')->default(0);
            $table->integer('persons_allowed_for_Jacuzzi')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
