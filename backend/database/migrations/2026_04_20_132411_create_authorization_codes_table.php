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
        Schema::create('authorization_codes', function (Blueprint $table) {
            $table->string('code', 255)->primary(); // varchar(255)
            $table->string('userId', 255); // Foreign key ke tabel users (UUID)
            $table->string('clientId', 255); // Foreign key ke oauth_clients
            $table->string('redirectUri', 255);
            $table->longtext('scopes');
            $table->string('codeChallenge', 255)->nullable();
            $table->string('codeChallengeMethod', 255)->nullable();
            $table->string('nonce', 255)->nullable();
            $table->datetime('expiresAt');
            $table->datetime('createdAt', 6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authorization_codes');
    }
};
