<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cctv;
// use Illuminate\Http\Request;

class CCTVController extends Controller
{
    public function index()
    {
        $cctvs = Cctv::with('marker')->get(); // eager load marker
        return response()->json(['data' => $cctvs]);
    }
}
