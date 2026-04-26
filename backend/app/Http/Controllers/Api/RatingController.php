<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use App\Models\Wisata;
use App\Models\TicketOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    /**
     * POST /api/wisata/{wisata_id}/rating
     * Submit atau update rating untuk sebuah wisata.
     *
     * Rules:
     *  - User harus sudah pernah berkunjung (ada ticket_order dengan status_tiket = 'Digunakan')
     *  - Satu user hanya bisa punya 1 rating per wisata (upsert)
     *  - Setelah simpan rating, update kolom rating & total_review di tabel wisata
     */
    public function store(Request $request, int $wisataId)
    {
        $user = Auth::user();

        // Validasi input
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // Pastikan wisata ada
        $wisata = Wisata::findOrFail($wisataId);

        // Pastikan user pernah berkunjung (tiket sudah digunakan)
        $sudahBerkunjung = TicketOrder::where('user_id', $user->id)
            ->where('wisata_id', $wisataId)
            ->where('status_tiket', 'Digunakan')
            ->exists();

        if (!$sudahBerkunjung) {
            return response()->json([
                'success' => false,
                'message' => 'Kamu belum pernah berkunjung ke wisata ini atau tiket belum digunakan.',
            ], 403);
        }

        // Simpan atau update rating (upsert: 1 user, 1 wisata, 1 rating)
        DB::transaction(function () use ($user, $wisataId, $request, $wisata) {
            Rating::updateOrCreate(
                [
                    'user_id'   => $user->id,
                    'wisata_id' => $wisataId,
                ],
                [
                    'rating' => $request->rating,
                ]
            );

            // Recalculate rata-rata rating dan total_review di tabel wisata
            $avg   = Rating::where('wisata_id', $wisataId)->avg('rating');
            $count = Rating::where('wisata_id', $wisataId)->count();

            $wisata->update([
                'rating'       => round($avg, 2),
                'total_review' => $count,
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Rating berhasil disimpan. Terima kasih atas ulasanmu!',
            'data'    => [
                'wisata_id'    => $wisataId,
                'rating'       => $request->rating,
                'rating_baru'  => round(Rating::where('wisata_id', $wisataId)->avg('rating'), 2),
                'total_review' => Rating::where('wisata_id', $wisataId)->count(),
            ],
        ]);
    }

    /**
     * GET /api/wisata/{wisata_id}/rating/saya
     * Cek apakah user sudah mereview wisata ini, dan berapa ratingnya.
     */
    public function mySingleRating(int $wisataId)
    {
        $user = Auth::user();

        $rating = Rating::where('user_id', $user->id)
            ->where('wisata_id', $wisataId)
            ->first();

        return response()->json([
            'success'       => true,
            'sudah_direview' => !is_null($rating),
            'rating'        => $rating?->rating,
        ]);
    }
}