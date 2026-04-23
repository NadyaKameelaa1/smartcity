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
        Schema::create('oauth_clients', function (Blueprint $table) {
            $table->uuid('id')->primary(); // varchar(36)
            $table->string('name', 255);
            $table->string('clientId', 255)->unique();
            $table->string('clientSecret', 255);
            $table->longtext('redirectUris'); // Menggunakan longtext sesuai gambar
            $table->longtext('allowedScopes');
            $table->string('logoUrl', 255)->nullable();
            $table->string('description', 255)->nullable();
            $table->tinyInteger('isActive')->default(1); // tinyint(4)
            $table->datetime('createdAt', 6); // datetime(6)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('oauth_clients');
    }
};
