// src/pages/Event.jsx
import { useState, useMemo } from 'react';
import { eventData } from '../data/mockData';
import EventCard from '../components/EventCard';

const KATEGORI = ['Semua', 'Budaya', 'Olahraga', 'Pemerintahan', 'Pariwisata', 'Pendidikan', 'Lainnya'];

export default function Event() {
    const [kategori, setKategori] = useState('Semua');
    const [search,   setSearch]   = useState('');
    const [view,     setView]     = useState('grid');

    const now = new Date();

    const filtered = useMemo(() => {
        // Hanya tampilkan event yang belum selesai
        let data = eventData.filter(e => new Date(e.tanggal) >= now);

        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(e =>
                e.nama.toLowerCase().includes(q) || e.lokasi.toLowerCase().includes(q)
            );
        }
        if (kategori !== 'Semua') data = data.filter(e => e.kategori === kategori);
        data.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
        return data;
    }, [search, kategori]);

    return (
        <div className="page-event">

            {/* ── Hero ── */}
            <div className="page-hero-v2 page-hero-v2--event">
                <div className="page-hero-v2__overlay" />
                <div className="page-hero-v2__pattern" />
                <div className="page-hero-v2__deco">
                    {Array.from({ length: 25 }).map((_, i) => <span key={i} />)}
                </div>
                <div className="container page-hero-v2__content">
                    <div className="page-hero-v2__label">
                        <i className="fas fa-calendar-alt" /> Agenda Kota
                    </div>
                    <h1 className="page-hero-v2__title">Event & Agenda Purbalingga</h1>
                    <p className="page-hero-v2__desc">
                        Festival budaya, kegiatan olahraga, acara pemerintahan, dan wisata terkini di Purbalingga.
                    </p>
                    <div className="page-hero-v2__search">
                        <i className="fas fa-search page-hero-v2__search-icon" />
                        <input
                            type="text"
                            placeholder="Cari nama event atau lokasi..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="page-hero-v2__search-input"
                        />
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div style={{ background: 'var(--cream)', position: 'relative', zIndex: 2 }}>
                <div className="container page-body">

                    {/* Toolbar */}
                    <div className="page-toolbar">
                        <div className="page-filter-tabs">
                            {KATEGORI.map(k => (
                                <button
                                    key={k}
                                    className={`page-filter-tab${kategori === k ? ' active' : ''}`}
                                    onClick={() => setKategori(k)}
                                    style={{ color: '#1e3c6d' }}
                                >{k}</button>
                            ))}
                        </div>
                        <div className="page-view-toggle">
                            <button
                                className={`page-view-btn${view === 'grid' ? ' active' : ''}`}
                                onClick={() => setView('grid')}
                            ><i className="fas fa-th" /></button>
                            <button
                                className={`page-view-btn${view === 'list' ? ' active' : ''}`}
                                onClick={() => setView('list')}
                            ><i className="fas fa-list" /></button>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="page-empty">
                            <i className="fas fa-calendar-times" />
                            <p>Tidak ada event yang sesuai.</p>
                            <button className="btn btn-outline" onClick={() => { setSearch(''); setKategori('Semua'); }}>
                                Reset Filter
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="page-section-label">
                                <i className="fas fa-clock" /> Event Mendatang
                                <span className="page-section-count">{filtered.length}</span>
                            </div>
                            <div className={view === 'grid' ? 'event-grid-full' : 'event-list-full'}>
                                {filtered.map(e => (
                                    <EventCard key={e.id} event={e} showFullDate />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}