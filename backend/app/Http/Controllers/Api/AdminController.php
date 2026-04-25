<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        $admins = User::with('wisata')
            ->where('role', 'admin')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar akun admin berhasil diambil',
            'data' => $admins
        ], 200);
    }
}
