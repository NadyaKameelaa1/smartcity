<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Beragam Pelayanan Publik dan Spot Olahraga Meriahkan Purbalingga Car Free Day',
                'slug' => 'beragam-pelayanan-publik-dan-spot-olahraga-meriahkan-purbalingga-car-free-day',
                'kategori' => 'Olahraga',
                'penyelenggara' => 'Pemerintah Kabupaten Purbalingga',
                'tanggal_mulai' => '2025-06-22',
                'tanggal_selesai' => null,
                'jam_mulai' => '06:00',
                'jam_selesai' => '09.00',
                'lokasi' => 'Alun-Alun Purbalingga dan GOR Goentoer Darjono',
                'kecamatan_id' => 5,
                'thumbnail' => 'beragam-pelayanan-publik-dan-spot-olahraga-meriahkan-purbalingga-car-free-day.jpg',
                'status' => 'published',
            ],
        ];

        foreach ($data as $item) {
            \App\Models\Event::create($item);
        }


    }
}
