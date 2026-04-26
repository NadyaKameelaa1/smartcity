import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import AdminLayout from './AdminLayout'; // sesuaikan import layout kamu
import api from '../../api/axios';

export default function ScanTiket() {
    const [scanning,  setScanning]  = useState(false);
    const [result,    setResult]    = useState(null);
    const [error,     setError]     = useState(null);
    const [loading,   setLoading]   = useState(false);
    const [validated, setValidated] = useState(false);
    
    const html5QrRef  = useRef(null);
    const isRunning   = useRef(false); // track apakah scanner benar-benar running

    // ── Cleanup saat unmount ──────────────────────────────
    useEffect(() => {
        return () => {
            if (html5QrRef.current && isRunning.current) {
                html5QrRef.current.stop().catch(() => {});
                isRunning.current = false;
            }
        };
    }, []);

    // ── Start scanner saat scanning = true ───────────────
    useEffect(() => {
        if (!scanning) return;

        // Pastikan elemen DOM sudah ada
        const el = document.getElementById('qr-reader');
        if (!el) return;

        const html5Qr = new Html5Qrcode('qr-reader');
        html5QrRef.current = html5Qr;

        html5Qr.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            async (decodedText) => {
                // Berhasil scan — stop dulu
                if (isRunning.current) {
                    await html5Qr.stop().catch(() => {});
                    isRunning.current = false;
                }
                setScanning(false);
                await cekTiket(decodedText);
            },
            () => {} // per-frame error, abaikan
        ).then(() => {
            isRunning.current = true;
        }).catch(err => {
            isRunning.current = false;
            setError('Tidak bisa mengakses kamera. Pastikan izin kamera sudah diberikan.');
            setScanning(false);
        });

        // Cleanup saat scanning diset false dari luar (tombol Batal)
        return () => {
            if (html5QrRef.current && isRunning.current) {
                html5QrRef.current.stop().catch(() => {});
                isRunning.current = false;
            }
        };
    }, [scanning]);

    const startScan = () => {
        setResult(null);
        setError(null);
        setValidated(false);
        setScanning(true);
    };

    const stopScan = () => {
        if (html5QrRef.current && isRunning.current) {
            html5QrRef.current.stop().catch(() => {});
            isRunning.current = false;
        }
        setScanning(false);
    };

    const cekTiket = async (kodeOrder) => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/tiket/${kodeOrder}`);
            setResult(res.data.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Tiket tidak ditemukan.');
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleGunakan = async () => {
        if (!result) return;
        setLoading(true);
        try {
            await api.patch(`/admin/tiket/${result.kode_order}/gunakan`);
            setResult(prev => ({ ...prev, status_tiket: 'Digunakan' }));
            setValidated(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal memvalidasi tiket.');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
        setValidated(false);
        setScanning(false);
    };

    const isAktif = result?.status_tiket === 'Aktif';

    return (
        <AdminLayout>
            <div style={{ maxWidth: 540, margin: '0 auto', padding: '32px 24px' }}>

                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--teal-600)', marginBottom: 6 }}>
                        <i className="fa-solid fa-qrcode" /> Super Admin — Validasi Tiket
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--dark)', marginBottom: 6 }}>
                        Scan Tiket Wisata
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                        Arahkan kamera ke QR code pada e-ticket pengunjung untuk memvalidasi tiket masuk.
                    </p>
                </div>

                {/* Area Kamera */}
                {scanning && (
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ borderRadius: 16, overflow: 'hidden', border: '2px solid var(--teal-200)', background: '#000' }}>
                            <div id="qr-reader" style={{ width: '100%' }} />
                        </div>
                        <button
                            onClick={stopScan}
                            style={{ marginTop: 12, width: '100%', padding: '11px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                        >
                            <i className="fa-solid fa-times" style={{ marginRight: 6 }} /> Batal Scan
                        </button>
                    </div>
                )}

                {/* Tombol mulai scan */}
                {!scanning && !result && !loading && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: 100, height: 100, margin: '0 auto 24px', borderRadius: 24, background: 'var(--teal-50)', border: '2px dashed var(--teal-300)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-qrcode" style={{ fontSize: 40, color: 'var(--teal-400)' }} />
                        </div>
                        <button
                            onClick={startScan}
                            style={{ padding: '14px 36px', borderRadius: 50, border: 'none', background: 'var(--teal-600)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 14px rgba(64,114,175,.3)', fontFamily: 'var(--font-body)' }}
                        >
                            <i className="fa-solid fa-camera" /> Mulai Scan QR Code
                        </button>
                        <p style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
                            Pastikan izin kamera sudah diberikan di browser
                        </p>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: 'var(--teal-500)', marginBottom: 14, display: 'block' }} />
                        <div style={{ fontSize: 14, fontWeight: 600 }}>Memverifikasi tiket...</div>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div style={{ padding: '16px 20px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, color: '#b91c1c', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, marginBottom: 10 }}>
                            <i className="fa-solid fa-circle-exclamation" /> {error}
                        </div>
                        <button
                            onClick={reset}
                            style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #fecaca', background: 'white', color: '#b91c1c', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)' }}
                        >
                            <i className="fa-solid fa-rotate-right" style={{ marginRight: 6 }} /> Coba Lagi
                        </button>
                    </div>
                )}

                {/* Hasil scan */}
                {result && !loading && (
                    <div style={{ border: `2px solid ${validated ? '#bbf7d0' : isAktif ? 'var(--teal-300)' : '#fecaca'}`, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>

                        {/* Header status */}
                        <div style={{ padding: '16px 22px', background: validated ? '#16a34a' : isAktif ? 'var(--teal-600)' : '#b91c1c', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <i className={`fa-solid ${validated ? 'fa-circle-check' : isAktif ? 'fa-ticket-alt' : 'fa-ban'}`} style={{ fontSize: 20 }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 16 }}>
                                    {validated ? 'Tiket Berhasil Divalidasi!' : isAktif ? 'Tiket Valid & Aktif' : 'Tiket Sudah Digunakan'}
                                </div>
                                <div style={{ fontSize: 12, opacity: .8, fontFamily: 'monospace', letterSpacing: 1 }}>{result.kode_order}</div>
                            </div>
                        </div>

                        {/* Detail tiket */}
                        <div style={{ padding: '20px 22px', background: 'white' }}>
                            {[
                                { label: 'Destinasi',         val: result.wisata?.nama || '-',  icon: 'fa-mountain' },
                                { label: 'Tanggal Kunjungan', val: result.tanggal_kunjungan,    icon: 'fa-calendar' },
                                { label: 'Pengunjung',        val: `${result.jumlah_dewasa} Dewasa${result.jumlah_anak > 0 ? `, ${result.jumlah_anak} Anak` : ''}`, icon: 'fa-users' },
                                { label: 'Total Pembayaran',  val: 'Rp ' + Number(result.total_harga).toLocaleString('id-ID'), icon: 'fa-money-bill' },
                            ].map((row, i) => (
                                <div key={row.label} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                                    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--teal-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className={`fa-solid ${row.icon}`} style={{ color: 'var(--teal-500)', fontSize: 13 }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{row.label}</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>{row.val}</div>
                                    </div>
                                </div>
                            ))}

                            {/* Tombol aksi */}
                            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                                {isAktif && !validated && (
                                    <button
                                        onClick={handleGunakan}
                                        disabled={loading}
                                        style={{ flex: 2, padding: '13px', borderRadius: 10, border: 'none', background: 'var(--teal-600)', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-body)' }}
                                    >
                                        <i className="fa-solid fa-check" /> Tandai Sudah Digunakan
                                    </button>
                                )}
                                {validated && (
                                    <div style={{ flex: 2, padding: '13px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <i className="fa-solid fa-circle-check" /> Tiket Tervalidasi
                                    </div>
                                )}
                                {!isAktif && !validated && (
                                    <div style={{ flex: 2, padding: '13px', borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        <i className="fa-solid fa-ban" /> Tiket Tidak Valid
                                    </div>
                                )}
                                <button
                                    onClick={reset}
                                    style={{ flex: 1, padding: '13px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                                >
                                    {validated ? 'Selesai' : 'Scan Lagi'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}