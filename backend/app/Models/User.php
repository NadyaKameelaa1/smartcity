<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Karena ID tim SSO adalah UUID (varchar 36)
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * Nama kolom yang bisa diisi (Mass Assignable).
     * Sesuaikan dengan kolom di tabel SSO.
     */
    protected $fillable = [
        'id',
        'email',
        'username',
        'password',
        'name',
        'avatarUrl',
        'no_hp',
        'tanggal_lahir',
        'jenis_kelamin',
        'kecamatan_id',
        'role',
        'isVerified',
        'verifyToken',
        'verifyTokenExpiry',
        'mfaSecret',
        'mfaEnabled',
        'resetToken',
        'resetTokenExpiry',
        'wisata_id', // Relasi tambahan milikmu
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'verifyToken',
        'mfaSecret',
    ];

    /**
     * Konfigurasi Timestamp.
     * SSO menggunakan camelCase: createdAt & updatedAt.
     */
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'tanggal_lahir' => 'date:Y-m-d',
            'isVerified' => 'boolean',
            'mfaEnabled' => 'boolean',
            'verifyTokenExpiry' => 'datetime',
            'resetTokenExpiry' => 'datetime',
            'createdAt' => 'datetime',
            'updatedAt' => 'datetime',
        ];
    }

    // Relasi ke Kecamatan (Kota Asal)
    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class, 'kecamatan_id');
    }

    /**
     * Relasi ke Wisata.
     * User (Staff) memiliki satu tempat wisata yang dikelola.
     */
    public function wisata(): BelongsTo
    {
        // Hubungkan foreign key wisata_id ke tabel wisata
        return $this->belongsTo(Wisata::class, 'wisata_id');
    }
    
}