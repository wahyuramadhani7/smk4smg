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
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(96,165,250,.15)', borderTopColor: '#60a5fa', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }
  if (!content) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810' }}>
        <p style={{ color: 'rgba(255,255,255,.4)', fontFamily: 'Outfit, sans-serif' }}>Data tidak ditemukan</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes fadeDown    { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp      { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInLeft  { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeInRight { from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes scaleIn     { from{opacity:0;transform:scale(.93)}        to{opacity:1;transform:scale(1)} }

        .ev-title  { animation: fadeDown .8s .1s ease both; }
        .ev-sub    { animation: fadeUp  .8s .25s ease both; }
        .ev-ats    { animation: fadeUp  .8s .3s ease both; }
        .ev-as     { animation: scaleIn .7s .4s ease both; }
        .ev-mapel  { animation: fadeInLeft  .8s .5s ease both; }
        .ev-kjr    { animation: fadeInRight .8s .5s ease both; }
        .ev-footer { animation: fadeUp .8s .6s ease both; }

        .ev-item { transition: transform .2s ease, background .2s ease; cursor: default; }
        .ev-item:hover { transform: translateX(6px); background: rgba(255,255,255,.05) !important; }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#050810', fontFamily: 'Outfit, sans-serif', paddingBottom: 80 }}>

        {/* Hero */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(37,99,235,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.05) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#38bdf8,transparent)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="ev-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa' }}>Penilaian Siswa</span>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
            </div>
            <h1 className="ev-title" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.8rem,7vw,5.5rem)', letterSpacing: '.04em', lineHeight: 1, color: '#fff', margin: '0 0 20px' }}>
              {content.main_title}
            </h1>
            <p className="ev-sub" style={{ fontSize: 'clamp(.95rem,1.8vw,1.1rem)', color: 'rgba(255,255,255,.6)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 24px' }}>
              {content.main_subtitle}
            </p>
            <div style={{ width: 80, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg,#2563eb,#38bdf8)', margin: '0 auto' }} />
          </div>
        </section>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px 0' }}>

          {/* Section header */}
          <div className="ev-ats" style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 600, color: '#38bdf8', marginBottom: 10 }}>Rencana Kegiatan</p>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '.04em', color: '#fff', margin: 0 }}>Asesmen Siswa</h2>
          </div>

          {/* ATS Card */}
          <div className="ev-ats" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(37,99,235,.3)', marginBottom: 24 }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg,#2563eb,#38bdf8)' }} />
            <div style={{ padding: 32, background: 'rgba(255,255,255,.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,99,235,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '.05em', color: '#fff', margin: 0 }}>{content.ats_title}</h3>
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.68)', lineHeight: 1.8, marginBottom: 20 }}>{content.ats_description}</p>
              <div style={{ borderRadius: 14, padding: '18px 20px', background: 'rgba(37,99,235,.12)', border: '1px solid rgba(37,99,235,.25)' }}>
                <p style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa', marginBottom: 8 }}>Dilaksanakan pada:</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', lineHeight: 1.75, whiteSpace: 'pre-line', margin: 0 }}>{content.ats_schedule}</p>
              </div>
            </div>
          </div>

          {/* AS Card */}
          <div className="ev-as" style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(8,145,178,.3)', marginBottom: 24 }}>
            <div style={{ height: 4, background: 'linear-gradient(90deg,#0891b2,#38bdf8)' }} />
            <div style={{ padding: '32px 32px 8px', background: 'rgba(255,255,255,.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(8,145,178,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', letterSpacing: '.05em', color: '#fff', margin: 0 }}>{content.as_title}</h3>
              </div>

              {/* 2-col grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 20, paddingBottom: 32 }}>

                {/* Mapel */}
                <div className="ev-mapel" style={{ borderRadius: 16, border: '1px solid rgba(79,70,229,.3)', overflow: 'hidden' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg,#4f46e5,#a5b4fc)' }} />
                  <div style={{ padding: 24, background: 'rgba(79,70,229,.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                      <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 600, color: '#a5b4fc' }}>{content.mapel_title}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {content.mapel_items.map((item, i) => (
                        <li key={i} className="ev-item" style={{ display: 'flex', gap: 12, padding: '9px 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,.05)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a5b4fc', flexShrink: 0, marginTop: 7 }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.82)', margin: '0 0 2px' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', margin: 0 }}>{item.subtitle}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Kejuruan */}
                <div className="ev-kjr" style={{ borderRadius: 16, border: '1px solid rgba(16,185,129,.3)', overflow: 'hidden' }}>
                  <div style={{ height: 3, background: 'linear-gradient(90deg,#10b981,#6ee7b7)' }} />
                  <div style={{ padding: 24, background: 'rgba(16,185,129,.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                      <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 600, color: '#6ee7b7' }}>{content.kejuruan_title}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {content.kejuruan_items.map((item, i) => (
                        <li key={i} className="ev-item" style={{ display: 'flex', gap: 12, padding: '9px 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,.05)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ee7b7', flexShrink: 0, marginTop: 7 }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.82)', margin: '0 0 2px' }}>{item.name}</p>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', margin: 0 }}>{item.subtitle}</p>
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
          <div className="ev-footer" style={{ textAlign: 'center', padding: '24px 32px', borderRadius: 16, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', whiteSpace: 'pre-line', margin: 0 }}>{content.footer_text}</p>
          </div>
        </div>
      </main>
    </>
  );
}