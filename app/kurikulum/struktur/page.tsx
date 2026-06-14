'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface StrukturContent {
  struktur_kelas_x: string;
  struktur_kelas_xi: string;
  struktur_kelas_xii: string;
}

const DEFAULT: StrukturContent = {
  struktur_kelas_x: 'Dasar-dasar kejuruan + mata pelajaran umum + proyek sederhana.',
  struktur_kelas_xi: 'Pembelajaran inti jurusan + praktik di workshop + magang industri tahap awal.',
  struktur_kelas_xii: 'Spesialisasi keahlian + magang industri intensif + persiapan kerja.',
};

const KELAS = [
  {
    key: 'struktur_kelas_x' as const,
    label: 'Kelas X',
    semester: 'Semester 1 – 2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    accent: 'rgba(37,99,235,.9)',
    accentSoft: 'rgba(37,99,235,.15)',
    accentText: '#60a5fa',
    delay: '.1s',
  },
  {
    key: 'struktur_kelas_xi' as const,
    label: 'Kelas XI',
    semester: 'Semester 3 – 4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    accent: 'rgba(8,145,178,.9)',
    accentSoft: 'rgba(8,145,178,.15)',
    accentText: '#38bdf8',
    delay: '.25s',
  },
  {
    key: 'struktur_kelas_xii' as const,
    label: 'Kelas XII',
    semester: 'Semester 5 – 6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    accent: 'rgba(79,70,229,.9)',
    accentSoft: 'rgba(79,70,229,.15)',
    accentText: '#a5b4fc',
    delay: '.4s',
  },
];

export default function StrukturKurikulum() {
  const [content, setContent] = useState<StrukturContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('kurikulum_content')
        .select('struktur_kelas_x, struktur_kelas_xi, struktur_kelas_xii')
        .limit(1)
        .single();
      if (data) {
        setContent({
          struktur_kelas_x: data.struktur_kelas_x || DEFAULT.struktur_kelas_x,
          struktur_kelas_xi: data.struktur_kelas_xi || DEFAULT.struktur_kelas_xi,
          struktur_kelas_xii: data.struktur_kelas_xii || DEFAULT.struktur_kelas_xii,
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

        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes fadeDown    { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp      { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInLeft  { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeInRight { from { opacity:0; transform:translateX(36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn     { from { opacity:0; transform:scale(.94); } to { opacity:1; transform:scale(1); } }

        .sk-title  { animation: fadeDown .8s .1s ease both; }
        .sk-sub    { animation: fadeUp  .8s .25s ease both; }
        .sk-card-0 { animation: fadeInLeft  .8s .3s ease both; }
        .sk-card-1 { animation: scaleIn     .7s .4s ease both; }
        .sk-card-2 { animation: fadeInRight .8s .45s ease both; }
        .sk-legend { animation: scaleIn .7s .6s ease both; }

        .sk-card {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .sk-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,.1);
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>

            <div className="sk-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>
                Kurikulum Merdeka
              </span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              🏫
            </div>

            <h1 className="sk-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              Struktur Kurikulum
            </h1>

            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Body ── */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px 0' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>

            {KELAS.map((k, idx) => (
              <div
                key={k.key}
                className={`sk-card sk-card-${idx}`}
                style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: 4, background: `linear-gradient(90deg, ${k.accent}, transparent)` }} />
                <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>

                  <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8', marginBottom: 20 }}>
                    {k.icon}
                  </div>

                  <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>
                    {k.semester}
                  </p>

                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                    {k.label}
                  </h2>

                  <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.85, flex: 1, margin: 0 }}>
                    {content[k.key]}
                  </p>

                </div>
              </div>
            ))}

          </div>

          {/* Progress bar legend */}
          <div className="sk-legend" style={{ padding: '24px 32px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left', flexShrink: 0 }}>
              <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8', marginBottom: 6 }}>
                Progres 3 Tahun
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, fontWeight: 500 }}>
                Perjalanan belajar dari Kelas X hingga Kelas XII.
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ height: 8, borderRadius: 9999, background: '#e5e7eb', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 9999, background: 'linear-gradient(90deg, #2563eb, #38bdf8, #a5b4fc)', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                {KELAS.map(k => (
                  <div key={k.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: k.accentText, display: 'inline-block' }} />
                    <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{k.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}