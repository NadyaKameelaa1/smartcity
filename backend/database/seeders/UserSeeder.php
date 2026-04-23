<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
        [
            'id' => '1e23d1b3-4e2e-4d6c-aba6-2d1889cfaccb',
            'email' => 'aizar.faruq11@gmail.com',
            'username' => 'aizar124',
            'password' => Hash::make('password_kamu'), // Sesuaikan passwordnya
            'name' => 'aizar faruq nafiul umam',
            'no_hp' => '08123456789',
            'tanggal_lahir' => '2005-01-01',
            'jenis_kelamin' => 'L',
            'kecamatan_id' => 1,
            'role' => 'user',
            'isVerified' => 1,
            'verifyToken' => '0487ff88-c339-4eba-8400-2f3c1c5b1735',
            'createdAt' => '2026-04-19 16:22:36.534410',
            'updatedAt' => '2026-04-19 18:12:45.339044',
        ],
        [
            'id' => '6c879424-243b-4ab8-aac2-e1d5d514eb2b',
            'email' => 'admin@purbalingga.id',
            'username' => 'Admin',
            'password' => Hash::make('password_admin'),
            'name' => 'Admin Purbalingga',
            'no_hp' => null,          
            'tanggal_lahir' => null,  
            'jenis_kelamin' => null, 
            'kecamatan_id' => null,   
            'role' => 'superadmin',
            'isVerified' => 1,
            'verifyToken' => null,
            'createdAt' => '2026-04-18 19:51:40.740438',
            'updatedAt' => '2026-04-19 18:08:09.065484',
        ],
    ]);
    }
}
