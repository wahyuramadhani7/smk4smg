'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface KurikulumContent {
  profil_title: string;
  profil_description: string;
  tujuan_pembelajaran: string[];
  sistem_pembelajaran: string;
  dokumen_kurikulum_url: string;
}

const DEFAULT: KurikulumContent = {
  profil_title: 'Profil Kurikulum',
  profil_description: 'SMK 4 Semarang menerapkan Kurikulum Merdeka yang dirancang untuk menghasilkan lulusan yang kompeten sesuai kebutuhan industri saat ini.',
  tujuan_pembelajaran: [
    'Mengembangkan kompetensi teknis dan soft skills siswa',
    'Menyiapkan siswa siap kerja atau melanjutkan pendidikan tinggi',
    'Membangun karakter disiplin, kreatif, dan inovatif',
  ],
  sistem_pembelajaran: 'Berbasis Proyek Nyata (Project Based Learning) dengan pendekatan industri.',
  dokumen_kurikulum_url: '#',
};

export default function ProfilKurikulum() {
  const [content, setContent] = useState<KurikulumContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('kurikulum_content')
        .select('profil_title, profil_description, tujuan_pembelajaran, sistem_pembelajaran, dokumen_kurikulum_url')
        .limit(1)
        .single();
      if (data) {
        setContent({
          profil_title: data.profil_title || DEFAULT.profil_title,
          profil_description: data.profil_description || '',
          tujuan_pembelajaran: data.tujuan_pembelajaran || [],
          sistem_pembelajaran: data.sistem_pembelajaran || '',
          dokumen_kurikulum_url: data.dokumen_kurikulum_url || '#',
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
        @keyframes fadeInLeft  { from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeInRight { from { opacity:0; transform:translateX(36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn     { from { opacity:0; transform:scale(.94); } to { opacity:1; transform:scale(1); } }

        .pk-title   { animation: fadeDown .8s .1s ease both; }
        .pk-desc    { animation: fadeUp  .8s .25s ease both; }
        .pk-card-l  { animation: fadeInLeft  .8s .3s ease both; }
        .pk-card-r  { animation: fadeInRight .8s .45s ease both; }
        .pk-sistem  { animation: fadeUp .8s .5s ease both; }
        .pk-doc     { animation: scaleIn .7s .6s ease both; }

        .tujuan-item { transition: transform .25s ease, background .25s ease; cursor: default; }
        .tujuan-item:hover { transform: translateX(8px); background: rgba(37,99,235,.1) !important; }

        .btn-doc {
          display: inline-flex; align-items: center; gap: 10;
          position: relative; overflow: hidden;
          transition: box-shadow .3s ease, transform .2s ease;
        }
        .btn-doc:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(37,99,235,.55) !important; }
        .btn-doc::after {
          content:''; position:absolute; inset:0;
          background:rgba(255,255,255,.15);
          transform:scaleX(0); transform-origin:left;
          transition:transform .35s ease;
        }
        .btn-doc:hover::after { transform:scaleX(1); }
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
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="pk-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa' }}>Kurikulum Merdeka</span>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
            </div>
            <h1 className="pk-title" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              letterSpacing: '.04em', lineHeight: 1,
              color: '#fff', margin: '0 0 20px',
            }}>
              {content.profil_title}
            </h1>
            <div style={{ width: 80, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #2563eb, #38bdf8)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Body ── */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px 0' }}>

          {/* Deskripsi */}
          <p className="pk-desc" style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'rgba(255,255,255,.7)',
            lineHeight: 1.85, marginBottom: 60, textAlign: 'center', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {content.profil_description}
          </p>

          {/* 2-col grid: Tujuan + Sistem */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>

            {/* Tujuan Pembelajaran */}
            <div className="pk-card-l" style={{
              borderRadius: 20, padding: 32,
              background: 'linear-gradient(135deg, rgba(37,99,235,.88), rgba(29,78,216,.95))',
              border: '1px solid rgba(96,165,250,.3)',
              boxShadow: '0 0 50px rgba(37,99,235,.2)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,.06), transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: 'rgba(255,255,255,.65)' }}>Tujuan Pembelajaran Vokasi</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {content.tujuan_pembelajaran.map((item, i) => (
                  <li key={i} className="tujuan-item" style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    padding: '10px 12px', borderRadius: 12,
                    border: '1px solid rgba(255,255,255,.1)',
                  }}>
                    <span style={{
                      flexShrink: 0, width: 26, height: 26, borderRadius: 8,
                      background: 'rgba(255,255,255,.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem', color: '#fff', lineHeight: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,.85)', lineHeight: 1.7 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sistem Pembelajaran */}
            <div className="pk-card-r" style={{
              borderRadius: 20, padding: 32,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,99,235,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <span style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: '#38bdf8' }}>Sistem Pembelajaran</span>
              </div>
              <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.1rem)', color: 'rgba(255,255,255,.72)', lineHeight: 1.85, margin: 0 }}>
                {content.sistem_pembelajaran}
              </p>
            </div>
          </div>

          {/* Dokumen */}
          <div className="pk-doc" style={{
            borderRadius: 20, padding: '32px 36px',
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(96,165,250,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20,
          }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: '#38bdf8', marginBottom: 8 }}>Dokumen Resmi</p>
              <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, margin: 0 }}>
                Unduh dokumen Kurikulum Merdeka SMK Negeri 4 Semarang dalam format PDF.
              </p>
            </div>
            <a
              href={content.dokumen_kurikulum_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-doc"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#fff', fontWeight: 600, letterSpacing: '.04em',
                borderRadius: 9999, padding: '14px 28px',
                textDecoration: 'none', fontSize: 14,
                boxShadow: '0 0 24px rgba(37,99,235,.35)',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PDF
            </a>
          </div>

        </div>
      </main>
    </>
  );
}