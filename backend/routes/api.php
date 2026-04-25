<?php

// use Illuminate\Http\Request;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\BuildingCategoriesController;
use App\Http\Controllers\Api\BuildingController;
use App\Http\Controllers\Api\BuildingGroupsController;
use App\Http\Controllers\Api\CCTVController;
use App\Http\Controllers\Api\DesaController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\KecamatanController;
use App\Http\Controllers\Api\PelayananController;
use App\Http\Controllers\Api\PengumumanController;
use App\Http\Controllers\Api\StatistikController;
use App\Http\Controllers\Api\WisataController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
 
    // Perlu token
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });
});

Route::get('/wisata', [WisataController::class, 'index']);
Route::get('/wisata/{slug}', [WisataController::class, 'show']);

Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{slug}', [BeritaController::class, 'show']);

Route::get('/pengumuman', [PengumumanController::class, 'index']);
Route::get('/pengumuman/{slug}', [PengumumanController::class, 'show']);

Route::get('/pelayanan', [PelayananController::class, 'index']);

Route::get('/events', [EventController::class, 'index']);

Route::get('/statistik-purbalingga', [StatistikController::class, 'index']);

Route::get('/building-categories', [BuildingCategoriesController::class, 'index']);

Route::get('/building-groups', [BuildingGroupsController::class, 'index']);

// -------------------------------------------------------------------------

Route::prefix('super-admin')->group(function () {
    Route::get('/wisata', [WisataController::class, 'index']);
    Route::get('/kecamatan', [KecamatanController::class, 'index']);

    Route::get('/desa', [DesaController::class, 'index']);

    Route::get('/pengumuman', [PengumumanController::class, 'index']);

    Route::get('/berita', [BeritaController::class, 'index']);

    Route::get('/event', [EventController::class, 'index']);

    Route::get('/akun', [AdminController::class, 'index']);

    Route::get('/cctv', [CCTVController::class, 'index']);

    Route::get('/buildings', [BuildingController::class, 'index']);
    Route::post('/buildings', [BuildingController::class, 'store']);
    Route::post('/buildings/{id}', [BuildingController::class, 'update']);
    Route::patch('/buildings/{id}/status',[BuildingController::class, 'updateStatus']);
    Route::delete('/buildings/{id}',      [BuildingController::class, 'destroy']);

    Route::get('/building-categories', [BuildingCategoriesController::class, 'index']);
    Route::get('/building-groups', [BuildingGroupsController::class, 'index']);
});

