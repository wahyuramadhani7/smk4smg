'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EvaluasiContent {
  main_title: string;
  main_subtitle: string;
  ats_title: string;
  ats_description: string;
  ats_schedule: string;
  as_title: string;
  mapel_title: string;
  mapel_items: { name: string; subtitle: string }[];
  kejuruan_title: string;
  kejuruan_items: { name: string; subtitle: string }[];
  footer_text: string;
}

export default function Evaluasi() {
  const [content, setContent] = useState<EvaluasiContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('evaluasi_content').select('*').limit(1).single();
      if (data) setContent(data as EvaluasiContent);
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
  if (!content) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <p style={{ color: '#6b7280', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Data tidak ditemukan</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes fadeDown    { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInLeft  { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeInRight { from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn     { from{opacity:0;transform:scale(.94)}        to{opacity:1;transform:scale(1)} }

        .ev-title  { animation: fadeDown .8s .1s ease both; }
        .ev-sub    { animation: fadeUp  .8s .25s ease both; }
        .ev-ats    { animation: fadeUp  .8s .3s ease both; }
        .ev-as     { animation: scaleIn .7s .4s ease both; }
        .ev-mapel  { animation: fadeInLeft  .8s .5s ease both; }
        .ev-kjr    { animation: fadeInRight .8s .5s ease both; }
        .ev-footer { animation: fadeUp .8s .6s ease both; }

        .ev-item { transition: transform .2s ease, background .2s ease; cursor: default; }
        .ev-item:hover { transform: translateX(6px); background: #f0f9ff !important; }

        .ev-card { transition: transform .25s ease, box-shadow .25s ease; }
        .ev-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.08); }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="ev-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>Penilaian Siswa</span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              📝
            </div>

            <h1 className="ev-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              {content.main_title}
            </h1>

            <p className="ev-sub" style={{ fontSize: 'clamp(1rem,1.8vw,1.1rem)', color: '#6b7280', lineHeight: 1.85, maxWidth: 600, margin: '0 auto 20px', fontWeight: 500 }}>
              {content.main_subtitle}
            </p>

            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto' }} />
          </div>
        </section>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 0' }}>

          {/* Section header */}
          <div className="ev-ats" style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>Rencana Kegiatan</p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 800, letterSpacing: '-0.01em', color: '#111827', margin: 0 }}>Asesmen Siswa</h2>
            <div style={{ width: 48, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '14px auto 0' }} />
          </div>

          {/* ATS Card */}
          <div className="ev-card ev-ats" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', marginBottom: 24 }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #1d4ed8, #60a5fa)' }} />
            <div style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', margin: '0 0 4px' }}>Asesmen</p>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>{content.ats_title}</h3>
                </div>
              </div>

              <p style={{ fontSize: 14.5, color: '#4b5563', lineHeight: 1.85, marginBottom: 20 }}>{content.ats_description}</p>

              <div style={{ borderRadius: 12, padding: '18px 20px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>Dilaksanakan pada:</p>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.85, whiteSpace: 'pre-line', margin: 0, fontWeight: 500 }}>{content.ats_schedule}</p>
              </div>
            </div>
          </div>

          {/* AS Card */}
          <div className="ev-card ev-as" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', marginBottom: 24 }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg, #0891b2, #38bdf8)' }} />
            <div style={{ padding: '32px 32px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#ecfeff', border: '1px solid #a5f3fc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', margin: '0 0 4px' }}>Asesmen Sumatif</p>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: 0 }}>{content.as_title}</h3>
                </div>
              </div>

              {/* 2-col grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20, paddingBottom: 32 }}>

                {/* Mapel */}
                <div className="ev-mapel" style={{ borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,.04)' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg, #1d4ed8, #60a5fa)' }} />
                  <div style={{ padding: 22 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📚</div>
                      <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8' }}>{content.mapel_title}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {content.mapel_items.map((item, i) => (
                        <li key={i} className="ev-item" style={{ display: 'flex', gap: 12, padding: '9px 10px', borderRadius: 10, border: '1px solid #f3f4f6', background: '#fafafa' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1d4ed8', flexShrink: 0, marginTop: 7 }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: '0 0 2px' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{item.subtitle}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Kejuruan */}
                <div className="ev-kjr" style={{ borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden', background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,.04)' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg, #f59e0b, #fcd34d)' }} />
                  <div style={{ padding: 22 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🔧</div>
                      <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 700, color: '#d97706' }}>{content.kejuruan_title}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {content.kejuruan_items.map((item, i) => (
                        <li key={i} className="ev-item" style={{ display: 'flex', gap: 12, padding: '9px 10px', borderRadius: 10, border: '1px solid #f3f4f6', background: '#fafafa' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0, marginTop: 7 }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', margin: '0 0 2px' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{item.subtitle}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ev-footer" style={{ textAlign: 'center', padding: '24px 32px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'pre-line', margin: 0, fontWeight: 500 }}>{content.footer_text}</p>
          </div>

        </div>
      </main>
    </>
  );
}