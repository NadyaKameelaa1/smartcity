<?php

// use Illuminate\Http\Request;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PelayananController;
use App\Http\Controllers\Api\PengumumanController;
use App\Http\Controllers\Api\StatistikController;
use App\Http\Controllers\Api\WisataController;
use Illuminate\Support\Facades\Route;

Route::get('/wisata', [WisataController::class, 'index']);
Route::get('/wisata/{slug}', [WisataController::class, 'show']);

Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{slug}', [BeritaController::class, 'show']);

Route::get('/pengumuman', [PengumumanController::class, 'index']);
Route::get('/pengumuman/{slug}', [PengumumanController::class, 'show']);

Route::get('/pelayanan', [PelayananController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);

Route::get('/statistik-purbalingga', [StatistikController::class, 'index']);