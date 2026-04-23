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
        Schema::create('users', function (Blueprint $table) {
            // Pakai UUID sesuai standar tim SSO
            $table->uuid('id')->primary(); 
            $table->string('email', 255)->unique();
            $table->string('username', 255)->unique();
            $table->string('password', 255);
            $table->string('name', 255); // SSO pakai 'name', bukan 'full_name'
            $table->string('avatarUrl', 255)->nullable();

            // YANG DITAMBAHIN :
            $table->foreignId('kecamatan_id')
                ->nullable()
                ->constrained('kecamatan') // Merujuk ke tabel kecamatan
                ->nullOnDelete();
            $table->text('no_hp')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();

            // -------------------
            
            $table->enum('role', ['user', 'admin', 'superadmin'])->default('user');

            // YANG DITAMBAHIN PART 2 :
            // wisata ini untuk role admin (staff wisata, biar staff wisata A cuma bisa ubah status tiket wisata A, gabisa ngeliat dan ngubah data wisata lain)
            $table->foreignId('wisata_id')
                ->nullable() 
                ->constrained('wisata')
                ->onDelete('set null');

            // ---------------------
            
            $table->tinyInteger('isVerified')->default(0);
            $table->string('verifyToken', 255)->nullable();
            $table->datetime('verifyTokenExpiry')->nullable();
            $table->string('mfaSecret', 255)->nullable();
            $table->tinyInteger('mfaEnabled')->default(0);
            $table->string('resetToken', 255)->nullable();
            $table->datetime('resetTokenExpiry')->nullable();
            
            $table->rememberToken();
            $table->dateTime('createdAt', 6)->nullable();
            $table->dateTime('updatedAt', 6)->nullable();
        });

        // Sesuaikan tabel sessions karena user_id sekarang UUID (string)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id')->nullable()->index(); // Pakai string untuk UUID
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
