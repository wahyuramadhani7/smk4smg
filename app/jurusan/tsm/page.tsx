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
  nama_lengkap: 'Desain Pemodelan & Informasi Bangunan',
  subtitle: 'Program Keahlian DPIB · SMK Negeri 4 Semarang',
  profil_description:
    'Program keahlian DPIB mempersiapkan siswa untuk menguasai teknologi desain dan pemodelan bangunan berbasis digital. Lulusan mampu merancang, memodelkan, dan mendokumentasikan proyek konstruksi menggunakan perangkat lunak BIM (Building Information Modeling) terkini sesuai standar industri.',
  kompetensi: [
    'Membuat gambar teknik bangunan 2D & 3D dengan AutoCAD',
    'Memodelkan bangunan menggunakan Revit / BIM software',
    'Menyusun dokumen perencanaan dan RAB konstruksi',
    'Merancang interior dan eksterior bangunan secara digital',
    'Berkolaborasi dalam proyek konstruksi berbasis teknologi',
  ],
  icon: '🏗️',
  color: '#059669',
};

export default function JurusanDPIB() {
  const [jurusan, setJurusan] = useState<Jurusan>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('jurusan_content')
        .select('*')
        .eq('kode', 'DPIB')
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
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(52,211,153,.15)', borderTopColor: '#34d399', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(.93);        } to { opacity:1; transform:scale(1);     } }

        .dpib-title  { animation: fadeDown .8s .1s  ease both; }
        .dpib-icon   { animation: scaleIn  .7s .15s ease both; }
        .dpib-sub    { animation: fadeUp   .8s .3s  ease both; }
        .dpib-bar    { animation: fadeUp   .8s .35s ease both; }
        .dpib-footer { animation: fadeUp   .8s .6s  ease both; }

        .dpib-card {
          transition: transform .3s ease, box-shadow .3s ease;
          cursor: default;
        }
        .dpib-card:hover { transform: translateY(-8px); }

        .dpib-kompetensi-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 14px; color: rgba(255,255,255,.65);
          line-height: 1.7; padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .dpib-kompetensi-item:last-child { border-bottom: none; }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#050810', fontFamily: 'Outfit, sans-serif', paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden' }}>
          {/* bg glow */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(5,150,105,.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          {/* grid */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(5,150,105,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(5,150,105,.05) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* bottom line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#34d399,transparent)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* eyebrow */}
            <div className="dpib-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#34d399', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 600, color: '#6ee7b7' }}>Program Keahlian</span>
              <span style={{ width: 24, height: 1, background: '#34d399', display: 'inline-block' }} />
            </div>

            {/* icon */}
            <div className="dpib-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: 'rgba(5,150,105,.15)', fontSize: '2.4rem' }}>
              {jurusan.icon}
            </div>

            {/* title */}
            <h1 className="dpib-title" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.4rem,6vw,4.8rem)', letterSpacing: '.04em', lineHeight: 1, color: '#fff', margin: '0 0 20px' }}>
              {jurusan.nama_lengkap}
            </h1>

            {/* subtitle */}
            <p className="dpib-sub" style={{ fontSize: 'clamp(.95rem,1.8vw,1.1rem)', color: 'rgba(255,255,255,.6)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 24px', whiteSpace: 'pre-line' }}>
              {jurusan.subtitle}
            </p>

            {/* accent bar */}
            <div className="dpib-bar" style={{ width: 80, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg,#059669,#34d399)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Cards ── */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>

            {/* Card 1 — Profil */}
            <div className="dpib-card" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(5,150,105,.35)', display: 'flex', flexDirection: 'column', animation: 'scaleIn .7s .25s ease both' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg,#059669,#34d399)', flexShrink: 0 }} />
              <div style={{ padding: 32, background: 'rgba(255,255,255,.03)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, flexShrink: 0, background: 'rgba(5,150,105,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem', marginBottom: 20 }}>
                  📐
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: '#6ee7b7', marginBottom: 8 }}>
                  Tentang Jurusan
                </p>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', letterSpacing: '.05em', color: '#fff', margin: '0 0 14px' }}>
                  Profil Jurusan
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', lineHeight: 1.8, flex: 1, margin: 0 }}>
                  {jurusan.profil_description}
                </p>
              </div>
            </div>

            {/* Card 2 — Kompetensi */}
            <div className="dpib-card" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(37,99,235,.35)', display: 'flex', flexDirection: 'column', animation: 'scaleIn .7s .4s ease both' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg,#2563eb,#38bdf8)', flexShrink: 0 }} />
              <div style={{ padding: 32, background: 'rgba(255,255,255,.03)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, flexShrink: 0, background: 'rgba(37,99,235,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem', marginBottom: 20 }}>
                  🎓
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa', marginBottom: 8 }}>
                  Kemampuan Lulusan
                </p>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', letterSpacing: '.05em', color: '#fff', margin: '0 0 14px' }}>
                  Kompetensi
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                  {jurusan.kompetensi.map((item, i) => (
                    <li key={i} className="dpib-kompetensi-item">
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#38bdf8)', flexShrink: 0, marginTop: 7, display: 'inline-block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="dpib-footer" style={{ textAlign: 'center', padding: '24px 32px', borderRadius: 16, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(96,165,250,.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', whiteSpace: 'pre-line', margin: 0 }}>
              {'Butuh informasi lebih lanjut tentang jurusan DPIB?\nSilakan hubungi Waka Kurikulum SMK Negeri 4 Semarang'}
            </p>
          </div>
        </div>

      </main>
    </>
  );
}