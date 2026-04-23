// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import ScrollTop from './components/ScrollTop';
import EventCard from './components/EventCard';

import Home             from './pages/Home';
import Wisata           from './pages/Wisata';
import Berita           from './pages/Berita';
import BeritaDetail     from './pages/BeritaDetail';
import Event            from './pages/Event';
import Pengumuman       from './pages/Pengumuman';
import PengumumanDetail from './pages/PengumumanDetail';
import Pejabat      from './pages/Pejabat';
import Search           from './pages/Search';
import Tiket            from './pages/Tiket';
import Peta             from './pages/Peta';
import Profile          from './pages/Profile';
import EditProfile      from './pages/EditProfile';
import Pelayanan from './pages/Pelayanan';
import RiwayatTiket from './pages/RiwayatTiket';
import WisataDetail from './pages/WisataDetail';
import Login from './pages/Login';
import Daftar from './pages/Daftar';

// Scroll ke atas setiap ganti halaman
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
} 

// Halaman yang tidak pakai Navbar/Footer
const FULLSCREEN_PAGES = ['/peta', '/login', '/daftar'];

function Layout() {
    const { pathname } = useLocation();
    const isFullscreen = FULLSCREEN_PAGES.includes(pathname);

    return (
        <>
            <ScrollToTop />
                
            {!isFullscreen && <Navbar />}
            <main>
                
                <Routes>
                    <Route path="/login"                  element={<Login />} />
                    <Route path="/daftar"                  element={<Daftar />} />

                    <Route path="/"                  element={<Home />} />
                    <Route path="/wisata"              element={<Wisata />} />
                    <Route path="/wisata/:slug"              element={<WisataDetail />} />

                    <Route path="/berita"              element={<Berita />} />
                    <Route path="/berita/:slug"       element={<BeritaDetail />} />

                    <Route path="/event"               element={<Event />} />

                    <Route path="/pengumuman"          element={<Pengumuman />} />
                    <Route path="/pengumuman/:slug"     element={<PengumumanDetail />} />

                    <Route path="/pejabat"             element={<Pejabat />} />

                    <Route path="/pelayanan"             element={<Pelayanan />} />
                    <Route path="/search"             element={<Search />} />

                    <Route path="/riwayat"              element={<RiwayatTiket />} />

                    
                    <Route path="/tiket"              element={<Tiket />} />
                    <Route path="/profile"            element={<Profile />} />
                    <Route path="/peta"               element={<Peta />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    {/* 404 fallback */}
                    <Route path="*"                   element={<NotFound />} />
                </Routes>
            </main>
            {!isFullscreen && <Footer />}
            {!isFullscreen && <ScrollTop />}
        </>
    );
}

function NotFound() {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 90 }}>
            <i className="fas fa-map-signs" style={{ fontSize: 56, color: 'var(--teal-300)' }} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--dark)' }}>404</h1>
            <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>Halaman tidak ditemukan</p>
            <a href="/" className="btn btn-primary"><i className="fas fa-home" /> Kembali ke Beranda</a>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}