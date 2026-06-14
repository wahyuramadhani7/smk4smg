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

const DEFAULT: Jurusan = {
  nama_lengkap: 'Teknik Pemesinan',
  subtitle: 'Program Keahlian TPM · SMK Negeri 4 Semarang',
  profil_description:
    'Program keahlian Teknik Pemesinan mempersiapkan siswa untuk menguasai teknologi manufaktur dan permesinan secara profesional. Lulusan mampu mengoperasikan mesin bubut, frais, gerinda, dan mesin CNC sesuai standar industri manufaktur nasional maupun internasional.',
  kompetensi: [
    'Mengoperasikan mesin bubut konvensional dan CNC',
    'Menggunakan mesin frais dan gerinda secara presisi',
    'Membaca dan membuat gambar teknik mesin',
    'Melakukan pengukuran dan pemeriksaan kualitas produk',
    'Menerapkan K3 (Keselamatan & Kesehatan Kerja) di industri',
  ],
  icon: '⚙️',
  color: '#d97706',
};

export default function JurusanTPM() {
  const [jurusan, setJurusan] = useState<Jurusan>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('jurusan_content')
        .select('*')
        .eq('kode', 'TPM')
        .single();

      if (data) {
        setJurusan({
          nama_lengkap:       data.nama_lengkap       || DEFAULT.nama_lengkap,
          subtitle:           data.subtitle           || DEFAULT.subtitle,
          profil_description: data.profil_description || DEFAULT.profil_description,
          kompetensi:         data.kompetensi         || DEFAULT.kompetensi,
          icon:               data.icon               || DEFAULT.icon,
          color:              data.color              || DEFAULT.color,
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(.93);        } to { opacity:1; transform:scale(1);     } }

        .tpm-title  { animation: fadeDown .8s .1s  ease both; }
        .tpm-icon   { animation: scaleIn  .7s .15s ease both; }
        .tpm-sub    { animation: fadeUp   .8s .3s  ease both; }
        .tpm-bar    { animation: fadeUp   .8s .35s ease both; }
        .tpm-footer { animation: fadeUp   .8s .6s  ease both; }

        .tpm-card {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .tpm-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,.1);
        }

        .tpm-kompetensi-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #374151;
          line-height: 1.7;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .tpm-kompetensi-item:last-child { border-bottom: none; }
        .tpm-kompetensi-item:hover { color: #111827; }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          {/* top accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>

            {/* eyebrow */}
            <div className="tpm-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>
                Program Keahlian
              </span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            {/* icon */}
            <div className="tpm-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              {jurusan.icon}
            </div>

            {/* title */}
            <h1 className="tpm-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              {jurusan.nama_lengkap}
            </h1>

            {/* subtitle */}
            <p className="tpm-sub" style={{ fontSize: 'clamp(.95rem,1.8vw,1.05rem)', color: '#6b7280', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 24px', whiteSpace: 'pre-line', fontWeight: 500 }}>
              {jurusan.subtitle}
            </p>

            {/* accent bar */}
            <div className="tpm-bar" style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Cards ── */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>

            {/* Card 1 — Profil */}
            <div className="tpm-card" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', animation: 'scaleIn .7s .25s ease both' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1d4ed8, #60a5fa)', flexShrink: 0 }} />
              <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                  🔧
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>
                  Tentang Jurusan
                </p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                  Profil Jurusan
                </h2>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.85, flex: 1, margin: 0 }}>
                  {jurusan.profil_description}
                </p>
              </div>
            </div>

            {/* Card 2 — Kompetensi */}
            <div className="tpm-card" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', animation: 'scaleIn .7s .4s ease both' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #f59e0b, #fcd34d)', flexShrink: 0 }} />
              <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                  🎓
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>
                  Kemampuan Lulusan
                </p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                  Kompetensi
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                  {jurusan.kompetensi.map((item, i) => (
                    <li key={i} className="tpm-kompetensi-item">
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
          <div className="tpm-footer" style={{ textAlign: 'center', padding: '20px 32px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'pre-line', margin: 0, fontWeight: 500 }}>
              {'Butuh informasi lebih lanjut tentang jurusan Teknik Pemesinan?\nSilakan hubungi Waka Kurikulum SMK Negeri 4 Semarang'}
            </p>
          </div>
        </div>

      </main>
    </>
  );
}