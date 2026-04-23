<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MapMarker extends Model
{
    protected $table = 'map_markers';

    protected $fillable = [
        'category_id',
        'markable_type',
        'markable_id',
        'lat',
        'lng',
        'is_active'
    ];

    /**
     * Relasi MorphTo: Mengambil data pemilik marker (bisa Wisata atau Cctv).
     */
    public function markable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Relasi ke BuildingCategory.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(BuildingCategory::class, 'category_id');
    }
}
