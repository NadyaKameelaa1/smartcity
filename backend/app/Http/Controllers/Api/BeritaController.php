<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
// use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index() {
        $berita = Berita::where('status', 'published')->orderBy('published_at', 'desc')->get();
        return response()->json(['data' => $berita]);
    }

    public function show($slug) {
        $berita = Berita::where('slug', $slug)->firstOrFail();

        // Tambah 1 ke views
        $berita->increment('views'); 
        
        // Ambil ulang data terbaru dari DB biar variabel $berita update angkanya
        $berita->refresh(); 
        
        return response()->json([
            'success' => true,
            'data'    => $berita
        ]);
    }
}
