<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wisata;
// use Illuminate\Http\Request;

class WisataController extends Controller
{
    public function index()
    {
        // Kita ambil wisata, beserta markernya (untuk lat lng)
        $wisata = Wisata::with(['marker'])->where('status', 'Aktif')->get();

        return response()->json([
            'success' => true,
            'data'    => $wisata
        ]);
    }

    public function show($slug)
    {
        $wisata = Wisata::with(['marker', 'prices', 'kecamatan']) // Tambahkan prices dan kecamatan
        ->where('slug', $slug)
        ->orWhere('id', $slug)
        ->firstOrFail();

        $wisata->thumbnail_url = asset('storage/' . $wisata->thumbnail);
        
        // Tambahkan atribut buatan (Accessor) agar muncul di JSON
        $wisata->append(['alamat_lengkap', 'average_rating', 'total_reviews']);

        return response()->json([
            'success' => true,
            'data'    => $wisata
        ]);
    }
}