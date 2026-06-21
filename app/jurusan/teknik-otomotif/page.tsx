'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Jurusan {
  nama_lengkap: string;
  subtitle: string;
  profil_description: string;
  kompetensi: string[];
  icon: string;
  color: string;
}

const DEFAULT_TKR: Jurusan = {
  nama_lengkap: 'Teknik Kendaraan Ringan',
  subtitle: 'Program Keahlian TKR · SMK Negeri 4 Semarang',
  profil_description:
    'Program keahlian Teknik Kendaraan Ringan mempersiapkan siswa untuk menguasai teknologi otomotif kendaraan ringan secara profesional. Lulusan mampu melakukan perawatan, perbaikan, dan diagnosa sistem kendaraan ringan sesuai standar industri otomotif nasional maupun internasional.',
  kompetensi: [
    'Melakukan perawatan dan perbaikan mesin kendaraan ringan',
    'Mendiagnosa kerusakan sistem kelistrikan kendaraan',
    'Memperbaiki sistem pemindah tenaga dan chasis kendaraan',
    'Menggunakan alat diagnosis elektronik (scanner) kendaraan modern',
    'Menerapkan K3 (Keselamatan & Kesehatan Kerja) di bengkel otomotif',
  ],
  icon: '🚗',
  color: '#1d4ed8',
};

const DEFAULT_TSM: Jurusan = {
  nama_lengkap: 'Teknik Sepeda Motor',
  subtitle: 'Program Keahlian TSM · SMK Negeri 4 Semarang',
  profil_description:
    'Program keahlian Teknik Sepeda Motor mempersiapkan siswa untuk menguasai teknologi perawatan dan perbaikan sepeda motor secara profesional. Lulusan mampu mendiagnosa, memperbaiki, dan melakukan perawatan berkala kendaraan roda dua dari berbagai merek sesuai standar industri otomotif nasional maupun internasional.',
  kompetensi: [
    'Melakukan perawatan dan tune-up mesin sepeda motor',
    'Mendiagnosa dan memperbaiki sistem kelistrikan sepeda motor',
    'Memperbaiki sistem bahan bakar konvensional dan injeksi (EFI)',
    'Menggunakan alat diagnosis elektronik untuk kendaraan roda dua modern',
    'Menerapkan K3 (Keselamatan & Kesehatan Kerja) di bengkel otomotif',
  ],
  icon: '🏍️',
  color: '#1d4ed8',
};

type KodeTO = 'TKR' | 'TSM';

export default function JurusanTO() {
  const [tkr, setTkr] = useState<Jurusan>(DEFAULT_TKR);
  const [tsm, setTsm] = useState<Jurusan>(DEFAULT_TSM);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<KodeTO>('TKR');

  useEffect(() => {
    (async () => {
      // Ambil data TKR — logic fetch sama seperti komponen JurusanTKR asli
      const { data: dataTkr } = await supabase
        .from('jurusan_content')
        .select('*')
        .eq('kode', 'TKR')
        .single();

      if (dataTkr) {
        setTkr({
          nama_lengkap:       dataTkr.nama_lengkap       || DEFAULT_TKR.nama_lengkap,
          subtitle:           dataTkr.subtitle           || DEFAULT_TKR.subtitle,
          profil_description: dataTkr.profil_description || DEFAULT_TKR.profil_description,
          kompetensi:         dataTkr.kompetensi         || DEFAULT_TKR.kompetensi,
          icon:               dataTkr.icon               || DEFAULT_TKR.icon,
          color:              dataTkr.color              || DEFAULT_TKR.color,
        });
      }

      // Ambil data TSM — logic fetch sama seperti komponen JurusanTSM asli
      const { data: dataTsm } = await supabase
        .from('jurusan_content')
        .select('*')
        .eq('kode', 'TSM')
        .single();

      if (dataTsm) {
        setTsm({
          nama_lengkap:       dataTsm.nama_lengkap       || DEFAULT_TSM.nama_lengkap,
          subtitle:           dataTsm.subtitle           || DEFAULT_TSM.subtitle,
          profil_description: dataTsm.profil_description || DEFAULT_TSM.profil_description,
          kompetensi:         dataTsm.kompetensi         || DEFAULT_TSM.kompetensi,
          icon:               dataTsm.icon               || DEFAULT_TSM.icon,
          color:              dataTsm.color              || DEFAULT_TSM.color,
        });
      }

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#1d4ed8', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const jurusan = activeTab === 'TKR' ? tkr : tsm;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(.93);        } to { opacity:1; transform:scale(1);     } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }

        .to-title  { animation: fadeDown .8s .1s  ease both; }
        .to-icon   { animation: scaleIn  .7s .15s ease both; }
        .to-sub    { animation: fadeUp   .8s .3s  ease both; }
        .to-bar    { animation: fadeUp   .8s .35s ease both; }
        .to-footer { animation: fadeUp   .8s .6s  ease both; }
        .to-content { animation: fadeIn .5s ease both; }

        .to-tabs {
          display: inline-flex;
          gap: 6px;
          padding: 6px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          animation: fadeUp .8s .4s ease both;
        }
        .to-tab-btn {
          border: none;
          background: transparent;
          padding: 10px 22px;
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          transition: all .25s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .to-tab-btn:hover { color: #111827; }
        .to-tab-btn.active {
          background: #ffffff;
          color: #1d4ed8;
          box-shadow: 0 4px 14px rgba(0,0,0,.08);
        }

        .to-card {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .to-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,.1);
        }

        .to-kompetensi-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #374151;
          line-height: 1.7;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .to-kompetensi-item:last-child { border-bottom: none; }
        .to-kompetensi-item:hover { color: #111827; }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 48px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          {/* top accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>

            {/* eyebrow */}
            <div className="to-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>
                Bidang Keahlian
              </span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            {/* icon */}
            <div className="to-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              🔧
            </div>

            {/* title */}
            <h1 className="to-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              Teknik Otomotif
            </h1>

            {/* subtitle */}
            <p className="to-sub" style={{ fontSize: 'clamp(.95rem,1.8vw,1.05rem)', color: '#6b7280', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 24px', whiteSpace: 'pre-line', fontWeight: 500 }}>
              {'Bidang Keahlian Teknik Otomotif · SMK Negeri 4 Semarang\nMenaungi Program Keahlian Teknik Kendaraan Ringan (TKR) dan Teknik Sepeda Motor (TSM)'}
            </p>

            {/* accent bar */}
            <div className="to-bar" style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto 32px' }} />

            {/* Tab switcher TKR / TSM */}
            <div className="to-tabs">
              <button
                className={`to-tab-btn ${activeTab === 'TKR' ? 'active' : ''}`}
                onClick={() => setActiveTab('TKR')}
              >
                <span>{tkr.icon}</span>
                Teknik Kendaraan Ringan
              </button>
              <button
                className={`to-tab-btn ${activeTab === 'TSM' ? 'active' : ''}`}
                onClick={() => setActiveTab('TSM')}
              >
                <span>{tsm.icon}</span>
                Teknik Sepeda Motor
              </button>
            </div>
          </div>
        </section>

        {/* ── Content (mengikuti jurusan yang aktif) ── */}
        <div key={activeTab} className="to-content" style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px 0' }}>

          {/* Judul jurusan aktif */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, color: '#111827', margin: 0 }}>
              {jurusan.nama_lengkap}
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginTop: 6, fontWeight: 500 }}>
              {jurusan.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>

            {/* Card 1 — Profil */}
            <div className="to-card" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', animation: 'scaleIn .7s .1s ease both' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1d4ed8, #60a5fa)', flexShrink: 0 }} />
              <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                  {activeTab === 'TKR' ? '🔩' : '🔧'}
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>
                  Tentang Jurusan
                </p>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                  Profil Jurusan
                </h3>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.85, flex: 1, margin: 0 }}>
                  {jurusan.profil_description}
                </p>
              </div>
            </div>

            {/* Card 2 — Kompetensi */}
            <div className="to-card" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', animation: 'scaleIn .7s .2s ease both' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #f59e0b, #fcd34d)', flexShrink: 0 }} />
              <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                  🎓
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>
                  Kemampuan Lulusan
                </p>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                  Kompetensi
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                  {jurusan.kompetensi.map((item, i) => (
                    <li key={i} className="to-kompetensi-item">
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0, marginTop: 1 }}>
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="to-footer" style={{ textAlign: 'center', padding: '20px 32px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'pre-line', margin: 0, fontWeight: 500 }}>
              {`Butuh informasi lebih lanjut tentang jurusan ${jurusan.nama_lengkap}?\nSilakan hubungi Waka Kurikulum SMK Negeri 4 Semarang`}
            </p>
          </div>
        </div>

      </main>
    </>
  );
}