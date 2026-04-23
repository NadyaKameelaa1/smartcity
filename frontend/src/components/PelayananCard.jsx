// src/components/PelayananCard.jsx

const KATEGORI_COLOR = {
    Pengadaan:    { bg: 'rgba(64,114,175,.1)',  color: 'var(--teal-700)',  border: 'rgba(64,114,175,.2)'  },
    Informasi:    { bg: 'rgba(13,148,136,.08)', color: '#0f766e',          border: 'rgba(13,148,136,.2)'  },
    Hukum:        { bg: 'rgba(124,58,237,.08)', color: '#6d28d9',          border: 'rgba(124,58,237,.2)'  },
    Pemerintahan: { bg: 'rgba(30,58,138,.08)',  color: '#1e3a8a',          border: 'rgba(30,58,138,.2)'   },
    Perizinan:    { bg: 'rgba(212,168,83,.12)', color: '#92400e',          border: 'rgba(212,168,83,.3)'  },
    Keuangan:     { bg: 'rgba(5,150,105,.08)',  color: '#047857',          border: 'rgba(5,150,105,.2)'   },
    Kesehatan:    { bg: 'rgba(220,38,38,.07)',  color: '#b91c1c',          border: 'rgba(220,38,38,.15)'  },
    Sosial:       { bg: 'rgba(236,72,153,.07)', color: '#9d174d',          border: 'rgba(236,72,153,.15)' },
    Pengaduan:    { bg: 'rgba(239,68,68,.07)',  color: '#b91c1c',          border: 'rgba(239,68,68,.15)'  },
};

const defaultColor = { bg: 'var(--teal-50)', color: 'var(--teal-700)', border: 'var(--teal-100)' };

export default function PelayananCard({ data }) {
    // ✅ data.kategori — sesuai nama kolom di DB
    const col        = KATEGORI_COLOR[data.kategori] || defaultColor;
    const isExternal = data.url?.startsWith('http');

    return (
        <>
            <style>{`
                .pelayanan-page { min-height: 100vh; background: var(--cream); }

                /* Hero */
                .pelayanan-hero {
                    position: relative;
                    background: linear-gradient(135deg, #102d4d 0%, #284d83 60%, #4072af 100%);
                    min-height: 300px;
                    display: flex; align-items: flex-end;
                    padding-top: 90px; overflow: hidden;
                }
                .pelayanan-hero__overlay {
                    position: absolute; inset: 0;
                    background: linear-gradient(to bottom, rgba(10,29,61,.3) 0%, rgba(10,29,61,.8) 100%);
                }
                .pelayanan-hero__pattern {
                    position: absolute; inset: 0; opacity: .06;
                    background-image: radial-gradient(circle at 2px 2px, var(--teal-300) 1px, transparent 0);
                    background-size: 32px 32px;
                }
                /* Dekorasi titik-titik di kanan */
                .pelayanan-hero__deco {
                    position: absolute; right: 80px; top: 50%; transform: translateY(-50%);
                    display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; opacity: .15;
                }
                .pelayanan-hero__deco span {
                    width: 8px; height: 8px; border-radius: 50%; background: white; display: block;
                }
                .pelayanan-hero__content {
                    position: relative; z-index: 2; padding-bottom: 44px; width: 100%;
                }
                .pelayanan-hero__label {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
                    color: var(--teal-300); margin-bottom: 10px;
                }
                .pelayanan-hero__title {
                    font-family: var(--font-display);
                    font-size: clamp(26px, 4.5vw, 46px);
                    font-weight: 700; color: white; margin-bottom: 10px; line-height: 1.15;
                }
                .pelayanan-hero__desc {
                    font-size: 15px; color: rgba(255,255,255,.7);
                    line-height: 1.7; max-width: 500px; margin-bottom: 0;
                }

                /* Stats strip */
                .pelayanan-stats-strip {
                    background: white;
                    border-bottom: 1px solid var(--border);
                    padding: 0;
                }
                .pelayanan-stats-inner {
                    display: flex;
                }
                .pelayanan-stat-item {
                    flex: 1; display: flex; flex-direction: column; align-items: center;
                    padding: 20px 16px; border-right: 1px solid var(--border);
                    gap: 2px;
                }
                .pelayanan-stat-item:last-child { border-right: none; }
                .pelayanan-stat-item__num {
                    font-family: var(--font-display);
                    font-size: 26px; font-weight: 700; color: var(--teal-700); line-height: 1;
                }
                .pelayanan-stat-item__label {
                    font-size: 11px; color: var(--text-muted); text-align: center; line-height: 1.4;
                }

                /* Body */
                .pelayanan-body { padding: 40px 0 80px; }

                /* Toolbar */
                .pelayanan-toolbar {
                    display: flex; align-items: center; gap: 16px;
                    margin-bottom: 28px; flex-wrap: wrap;
                }
                .pelayanan-search-wrap {
                    position: relative; flex: 1; max-width: 360px;
                }
                .pelayanan-search-icon {
                    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
                    color: var(--teal-400); font-size: 13px; pointer-events: none;
                }
                .pelayanan-search-input {
                    width: 100%; padding: 10px 16px 10px 38px;
                    border-radius: 50px; border: 1.5px solid var(--border);
                    background: white; font-family: var(--font-body);
                    font-size: 13.5px; color: var(--dark); outline: none;
                    transition: var(--transition);
                }
                .pelayanan-search-input:focus {
                    border-color: var(--teal-500);
                    box-shadow: 0 0 0 3px rgba(64,114,175,.1);
                }
                .pelayanan-search-input::placeholder { color: var(--text-muted); }

                /* Filter tabs */
                .pelayanan-filter-tabs {
                    display: flex; gap: 6px; flex-wrap: wrap; flex: 1;
                }
                .pelayanan-filter-tab {
                    padding: 7px 16px; border-radius: 50px;
                    border: 1.5px solid var(--border);
                    background: white; font-family: var(--font-body);
                    font-size: 12.5px; font-weight: 500; color: var(--text-muted);
                    cursor: pointer; transition: var(--transition); white-space: nowrap;
                }
                .pelayanan-filter-tab:hover  { border-color: var(--teal-400); color: var(--teal-700); }
                .pelayanan-filter-tab.active {
                    border-color: var(--teal-600); background: var(--teal-600);
                    color: white; font-weight: 600;
                }

                .pelayanan-count {
                    font-size: 13px; color: var(--text-muted);
                    margin-bottom: 20px; font-weight: 500;
                }

                /* Main layout */
                .pelayanan-layout {
                    display: grid;
                    grid-template-columns: 1fr 280px;
                    gap: 32px; align-items: start;
                }

                /* Grid kartu */
                .pelayanan-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                }

                /* Kartu */
                .pelayanan-card-new {
                    display: flex; flex-direction: column;
                    background: white; border-radius: var(--radius-lg);
                    border: 1px solid var(--border);
                    box-shadow: var(--shadow-sm);
                    padding: 22px 20px 18px;
                    text-decoration: none;
                    transition: var(--transition);
                    position: relative; overflow: hidden;
                    cursor: pointer;
                }
                .pelayanan-card-new::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    background: linear-gradient(90deg, var(--teal-500), var(--teal-700));
                    transform: scaleX(0); transform-origin: left;
                    transition: transform .3s ease;
                }
                .pelayanan-card-new:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--teal-200);
                }
                .pelayanan-card-new:hover::before { transform: scaleX(1); }

                .pelayanan-card-new__icon-wrap {
                    width: 48px; height: 48px; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 20px; margin-bottom: 14px;
                    transition: var(--transition);
                    flex-shrink: 0;
                }
                .pelayanan-card-new:hover .pelayanan-card-new__icon-wrap {
                    transform: scale(1.08);
                }
                .pelayanan-card-new__name {
                    font-weight: 700; font-size: 14.5px;
                    color: var(--dark); margin-bottom: 6px; line-height: 1.3;
                }
                .pelayanan-card-new__desc {
                    font-size: 12.5px; color: var(--text-muted);
                    line-height: 1.55; flex: 1; margin-bottom: 14px;
                }
                .pelayanan-card-new__footer {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-top: auto;
                }
                .pelayanan-card-new__badge {
                    font-size: 10px; font-weight: 700;
                    padding: 3px 9px; border-radius: 50px;
                    letter-spacing: .3px;
                }
                .pelayanan-card-new__arrow {
                    width: 26px; height: 26px; border-radius: 50%;
                    background: var(--teal-50); display: flex;
                    align-items: center; justify-content: center;
                    color: var(--teal-500); font-size: 11px;
                    transition: var(--transition); flex-shrink: 0;
                }
                .pelayanan-card-new:hover .pelayanan-card-new__arrow {
                    background: var(--teal-600); color: white;
                }

                /* Empty state */
                .pelayanan-empty {
                    grid-column: 1/-1; text-align: center;
                    padding: 64px 0; display: flex; flex-direction: column;
                    align-items: center; gap: 14px;
                }
                .pelayanan-empty i { font-size: 44px; color: var(--teal-200); }
                .pelayanan-empty p  { font-size: 15px; color: var(--text-muted); }

                /* Sidebar */
                .pelayanan-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 16px; }
                .pelayanan-sidebar-card {
                    background: white; border-radius: var(--radius-lg);
                    border: 1px solid var(--border); padding: 24px;
                    box-shadow: var(--shadow-sm);
                }
                .pelayanan-sidebar-title {
                    font-size: 13px; font-weight: 700;
                    color: var(--dark); margin-bottom: 16px;
                    padding-bottom: 12px; border-bottom: 1px solid var(--border);
                    display: flex; align-items: center; gap: 8px;
                }
                .pelayanan-sidebar-title i { color: var(--teal-500); }

                .pelayanan-kontak-row {
                    display: flex; align-items: center; gap: 12px; margin-top: 12px;
                }
                .pelayanan-kontak-ico {
                    width: 34px; height: 34px; border-radius: 9px;
                    background: var(--teal-50); border: 1px solid var(--teal-100);
                    display: flex; align-items: center; justify-content: center;
                    color: var(--teal-600); font-size: 12px; flex-shrink: 0;
                }
                .pelayanan-kontak-label { font-size: 11px; color: var(--text-muted); margin-bottom: 2px; }
                .pelayanan-kontak-val   { font-size: 13px; font-weight: 600; color: var(--dark); }

                /* CTA card */
                .pelayanan-cta-card {
                    background: linear-gradient(135deg, var(--teal-700), var(--teal-950));
                    border-radius: var(--radius-lg);
                    padding: 24px; color: white; border: none;
                }
                .pelayanan-cta-card__icon { font-size: 26px; margin-bottom: 12px; }
                .pelayanan-cta-card__title { font-weight: 700; font-size: 15px; margin-bottom: 8px; }
                .pelayanan-cta-card__desc  { font-size: 13px; opacity: .8; line-height: 1.6; margin-bottom: 18px; }
                .pelayanan-cta-btn {
                    display: flex; align-items: center; justify-content: center;
                    gap: 7px; width: 100%; padding: 9px;
                    border-radius: var(--radius-md);
                    font-family: var(--font-body); font-size: 13px; font-weight: 600;
                    cursor: pointer; transition: var(--transition); text-decoration: none;
                    margin-bottom: 8px;
                }
                .pelayanan-cta-btn:last-child { margin-bottom: 0; }
                .pelayanan-cta-btn--light {
                    background: rgba(255,255,255,.15);
                    color: white; border: 1px solid rgba(255,255,255,.25);
                }
                .pelayanan-cta-btn--light:hover { background: rgba(255,255,255,.25); }
                .pelayanan-cta-btn--wa {
                    background: rgba(37,211,102,.2);
                    color: white; border: 1px solid rgba(37,211,102,.4);
                }
                .pelayanan-cta-btn--wa:hover { background: rgba(37,211,102,.35); }

                @media (max-width: 1024px) {
                    .pelayanan-layout { grid-template-columns: 1fr; }
                    .pelayanan-sidebar { position: static; }
                    .pelayanan-cards-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                    .pelayanan-stats-inner { flex-wrap: wrap; }
                    .pelayanan-stat-item   { flex: 1 1 50%; border-bottom: 1px solid var(--border); }
                    .pelayanan-cards-grid  { grid-template-columns: 1fr; }
                    .pelayanan-toolbar     { flex-direction: column; align-items: stretch; }
                    .pelayanan-search-wrap { max-width: 100%; }
                    .pelayanan-hero__deco  { display: none; }
                }
            `}</style>
            <a
                href={data.url || '#'}
                className="pelayanan-card-new"
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noreferrer' : undefined}
            >
                <div
                    className="pelayanan-card-new__icon-wrap"
                    style={{ background: col.bg, border: `1px solid ${col.border}` }}
                >
                    <i className={`fas ${data.icon}`} style={{ color: col.color }} />
                </div>
                <div className="pelayanan-card-new__name">{data.nama}</div>
                <div className="pelayanan-card-new__desc">{data.deskripsi}</div>
                <div className="pelayanan-card-new__footer">
                    <span
                        className="pelayanan-card-new__badge"
                        style={{ background: col.bg, color: col.color, border: `1px solid ${col.border}` }}
                    >
                        {data.kategori}
                    </span>
                    <div className="pelayanan-card-new__arrow">
                        <i className={`fas ${isExternal ? 'fa-external-link-alt' : 'fa-arrow-right'}`} />
                    </div>
                </div>
            </a>
        </>
    );
}