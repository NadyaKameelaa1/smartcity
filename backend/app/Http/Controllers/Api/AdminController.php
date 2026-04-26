<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Cari user berdasarkan username atau email
        $user = User::where('username', $request->username)
                    ->orWhere('email', $request->username)
                    ->first();

        // Cek user exist & password cocok
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Username atau password salah.'
            ], 401);
        }

        // Cek role: hanya 'admin' yang boleh masuk panel ini
        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Akses ditolak. Akun ini bukan admin wisata.'
            ], 403);
        }

        // Hapus token lama (opsional, biar tidak numpuk)
        $user->tokens()->where('name', 'admin_token')->delete();

        // Buat token baru
        $token = $user->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'token'   => $token,
            'user'    => [
                'id'         => $user->id,
                'name'       => $user->name,
                'username'   => $user->username,
                'email'      => $user->email,
                'role'       => $user->role,
                'wisata_id'  => $user->wisata_id,
                'avatar_url' => $user->avatar_url,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout berhasil.']);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json(['user' => $user]);
    }

    public function index()
    {
        // Daftar akun admin (untuk super-admin)
        $admins = User::where('role', 'admin')->get();
        return response()->json(['data' => $admins]);
    }
}