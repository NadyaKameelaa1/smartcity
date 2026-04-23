<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengumuman;
// use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    public function index()
    {
        $pengumuman = Pengumuman::orderBy('tanggal_mulai', 'desc')->get();
        return response()->json([
            'success' => true,
            'data'    => $pengumuman
        ]);
    }

    public function show($slug) {
        $pengumuman = Pengumuman::where('slug', $slug)->firstOrFail();
        
        return response()->json([
            'success' => true,
            'data'    => $pengumuman
        ]);
    }
}
