<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kecamatan;
// use Illuminate\Http\Request;

class KecamatanController extends Controller
{
    public function index(){
        $kecamatan = Kecamatan::where('nama')->get();
        return response()->json(['data' => $kecamatan]);
    }
}
