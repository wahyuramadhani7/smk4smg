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
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(96,165,250,.15)', borderTopColor: '#60a5fa', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes fadeDown    { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp      { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn     { from { opacity:0; transform:scale(.93); } to { opacity:1; transform:scale(1); } }

        .sk-title { animation: fadeDown .8s .1s ease both; }
        .sk-sub   { animation: fadeUp  .8s .25s ease both; }

        .sk-card  { transition: transform .3s ease, box-shadow .3s ease; cursor: default; }
        .sk-card:hover { transform: translateY(-8px); }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#050810', fontFamily: 'Outfit, sans-serif', paddingBottom: 80 }}>

        {/* ── Hero banner ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(37,99,235,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.05) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="sk-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa' }}>Kurikulum Merdeka</span>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
            </div>
            <h1 className="sk-title" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              letterSpacing: '.04em', lineHeight: 1,
              color: '#fff', margin: '0 0 20px',
            }}>
              STRUKTUR KURIKULUM
            </h1>
            <div style={{ width: 80, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #2563eb, #38bdf8)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Cards ── */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px 0' }}>

          {/* Timeline connector — desktop only */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, position: 'relative' }}>

            {KELAS.map((k) => (
              <div
                key={k.key}
                className="sk-card"
                style={{
                  borderRadius: 20,
                  border: `1px solid ${k.accentSoft.replace('.15', '.3')}`,
                  overflow: 'hidden',
                  animation: `scaleIn .7s ${k.delay} ease both`,
                }}
              >
                {/* Card top accent bar */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${k.accent}, transparent)` }} />

                <div style={{ padding: 32, background: 'rgba(255,255,255,.03)' }}>
                  {/* Icon + label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: k.accentSoft,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: k.accentText,
                    }}>
                      {k.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '.06em', color: '#fff', margin: 0, lineHeight: 1 }}>{k.label}</p>
                      <p style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: k.accentText, margin: '4px 0 0', fontWeight: 600 }}>{k.semester}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(255,255,255,.07)', marginBottom: 20 }} />

                  {/* Content */}
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,.72)', lineHeight: 1.8, margin: 0 }}>
                    {content[k.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar legend */}
          <div className="sk-sub" style={{
            marginTop: 40, borderRadius: 20, padding: '28px 32px',
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.08)',
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa', flexShrink: 0 }}>Progres 3 Tahun</span>
            <div style={{ flex: 1, minWidth: 200, height: 8, borderRadius: 9999, background: 'rgba(255,255,255,.07)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 9999,
                background: 'linear-gradient(90deg, #2563eb, #38bdf8, #a5b4fc)',
                width: '100%',
                animation: 'scaleIn .9s .5s ease both',
                transformOrigin: 'left',
              }} />
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {KELAS.map(k => (
                <div key={k.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: k.accentText, display: 'inline-block' }} />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{k.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}