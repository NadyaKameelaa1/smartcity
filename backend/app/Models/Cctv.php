<?php

namespace App\Models;

use App\Models\Kecamatan;
use App\Models\MapMarker;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Cctv extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'cctv';

    // Kolom yang boleh diisi secara mass-assignment
    protected $fillable = [
        'nama',
        'stream_url',
        'status',
    ];

    /**
     * Relasi ke tabel Kecamatan.
     * CCTV berada di dalam satu kecamatan.
     */
    public function kecamatan(): BelongsTo
    {
        return $this->belongsTo(Kecamatan::class, 'kecamatan_id');
    }

    /**
     * RELASI SAKTI (Polymorphic):
     * Menghubungkan CCTV ke tabel map_markers.
     */
    public function marker(): MorphOne
    {
        return $this->morphOne(MapMarker::class, 'markable');
    }
}
