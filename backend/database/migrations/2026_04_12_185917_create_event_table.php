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
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->string('slug', 220)->unique();
            $table->longText('deskripsi')->nullable();
            $table->string('kategori', 80)->nullable();
            $table->string('penyelenggara', 150)->nullable();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai')->nullable();
            $table->time('jam_mulai')->nullable();
            $table->time('jam_selesai')->nullable();
            $table->string('lokasi', 255)->nullable();
            $table->foreignId('kecamatan_id')->nullable()->constrained('kecamatan')
                  ->nullOnDelete()->cascadeOnUpdate();
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->string('thumbnail', 500)->nullable();
            $table->boolean('featured')->default(false);
            $table->enum('status', ['draft','published','selesai'])
                  ->default('draft');
            $table->timestamps();

            $table->index('status');
            $table->index('tanggal_mulai');
            $table->index('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};
