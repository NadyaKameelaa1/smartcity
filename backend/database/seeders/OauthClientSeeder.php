<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OauthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('oauth_clients')->insert([
        [
            'id' => 'd4d3c15f-1ef1-49f6-9e4f-c5858557fa94',
            'name' => 'Purbalingga Pay',
            'clientId' => 'purbalingga-pay',
            'clientSecret' => 'secret_pay_1b31ba3d242aafb14c57b34a',
            'redirectUris' => json_encode(["http://localhost:5173/callback"], JSON_UNESCAPED_SLASHES),
            'allowedScopes' => json_encode(["openid", "profile", "email"]),
            'isActive' => 1,
            'createdAt' => '2026-04-18 19:51:40.776003',
        ],
        [
            'id' => 'daf91e71-b876-4542-a12e-591269552d33',
            'name' => 'Web Wisata Purbalingga',
            'clientId' => 'purbalingga-wisata',
            'clientSecret' => 'secret_wisata_4380fbe01b0a712d14eb0835',
            'redirectUris' => json_encode(["http://localhost:3001/callback"], JSON_UNESCAPED_SLASHES),
            'allowedScopes' => json_encode(["openid", "profile", "email"]),
            'isActive' => 1,
            'createdAt' => '2026-04-18 19:51:40.804940',
        ],
    ]);
    }
}
