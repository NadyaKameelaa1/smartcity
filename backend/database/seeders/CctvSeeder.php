<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CctvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cctvs = [
            [
                'nama' => 'Alun-alun Purbalingga',
                'stream_url' => 'https://www.youtube.com/embed/jfKfPfyJRdk', // Dummy live
            ],
            [
                'nama' => 'Simpang Empat Terminal',
                'stream_url' => 'https://www.youtube.com/embed/jfKfPfyJRdk',
            ],
            [
                'nama' => 'Simpang Empat Bancar',
                'stream_url' => 'https://www.youtube.com/embed/jfKfPfyJRdk',
            ],
            [
                'nama' => 'Pasar Segamas',
                'stream_url' => 'https://www.youtube.com/embed/jfKfPfyJRdk',
            ],
        ];

        foreach ($cctvs as $cctv) {
            DB::table('cctv')->insert(array_merge($cctv, [
                'status' => 'online',
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
