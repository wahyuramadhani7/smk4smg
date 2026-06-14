'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ICTContent {
  main_title: string;
  main_subtitle: string;
  lms_title: string;
  lms_description: string;
  lms_icon: string;
  lms_url: string;
  eraport_title: string;
  eraport_description: string;
  eraport_icon: string;
  eraport_url: string;
  footer_note: string;
}

const DEFAULT: ICTContent = {
  main_title: 'ICT',
  main_subtitle: 'Information and Communication Technology\nSMK Negeri 4 Semarang',
  lms_title: 'LMS SMKN 4 Semarang',
  lms_description: 'Platform pembelajaran daring untuk mengakses materi pelajaran, tugas, kuis, dan diskusi antar siswa dan guru.',
  lms_icon: '🚀',
  lms_url: 'https://lms.smk4semarang.sch.id',
  eraport_title: 'E-Raport SMKN 4 Semarang',
  eraport_description: 'Sistem rapor elektronik untuk melihat nilai, rapor semester, dan rekapitulasi prestasi siswa secara online.',
  eraport_icon: '📊',
  eraport_url: 'https://erapor.smk4semarang.sch.id',
  footer_note: 'Butuh bantuan login atau mengalami kendala teknis?\nSilakan hubungi Tim ICT SMK 4 Semarang',
};

const CARDS = [
  {
    key: 'lms' as const,
    accent: '#2563eb',
    accentSoft: 'rgba(37,99,235,.15)',
    accentBorder: 'rgba(37,99,235,.35)',
    accentText: '#60a5fa',
    barGrad: 'linear-gradient(90deg,#2563eb,#38bdf8)',
    btnBg: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
    btnGlow: 'rgba(29,78,216,.2)',
    label: 'Akses LMS Siswa',
    delay: '.25s',
  },
  {
    key: 'eraport' as const,
    accent: '#059669',
    accentSoft: 'rgba(5,150,105,.15)',
    accentBorder: 'rgba(5,150,105,.35)',
    accentText: '#6ee7b7',
    barGrad: 'linear-gradient(90deg,#059669,#34d399)',
    btnBg: 'linear-gradient(135deg,#047857,#059669)',
    btnGlow: 'rgba(5,150,105,.2)',
    label: 'Akses E-Raport',
    delay: '.4s',
  },
];

export default function ICT() {
  const [content, setContent] = useState<ICTContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('ict_content').select('*').limit(1).single();
      if (data) {
        setContent({
          main_title:          data.main_title          || DEFAULT.main_title,
          main_subtitle:       data.main_subtitle       || DEFAULT.main_subtitle,
          lms_title:           data.lms_title           || DEFAULT.lms_title,
          lms_description:     data.lms_description     || DEFAULT.lms_description,
          lms_icon:            data.lms_icon            || DEFAULT.lms_icon,
          lms_url:             data.lms_url             || DEFAULT.lms_url,
          eraport_title:       data.eraport_title       || DEFAULT.eraport_title,
          eraport_description: data.eraport_description || DEFAULT.eraport_description,
          eraport_icon:        data.eraport_icon        || DEFAULT.eraport_icon,
          eraport_url:         data.eraport_url         || DEFAULT.eraport_url,
          footer_note:         data.footer_note         || DEFAULT.footer_note,
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

  const cardData = [
    { ...CARDS[0], title: content.lms_title, desc: content.lms_description, icon: content.lms_icon, url: content.lms_url },
    { ...CARDS[1], title: content.eraport_title, desc: content.eraport_description, icon: content.eraport_icon, url: content.eraport_url },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(.94)}        to{opacity:1;transform:scale(1)} }

        .ict-title  { animation: fadeDown .8s .1s ease both; }
        .ict-sub    { animation: fadeUp  .8s .25s ease both; }
        .ict-footer { animation: fadeUp  .8s .6s ease both; }

        .ict-card {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .ict-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,.1);
        }

        .ict-btn {
          position: relative; overflow: hidden;
          transition: transform .2s ease, box-shadow .3s ease;
          display: block; text-align: center; text-decoration: none;
        }
        .ict-btn:hover {
          transform: translateY(-2px);
        }
        .ict-btn::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,.15);
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s ease;
        }
        .ict-btn:hover::after { transform: scaleX(1); }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="ict-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>Teknologi Informasi</span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              💻
            </div>

            <h1 className="ict-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              {content.main_title}
            </h1>

            <p className="ict-sub" style={{ fontSize: 'clamp(1rem,1.8vw,1.1rem)', color: '#6b7280', lineHeight: 1.85, maxWidth: 520, margin: '0 auto 20px', fontWeight: 500, whiteSpace: 'pre-line' }}>
              {content.main_subtitle}
            </p>

            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Cards ── */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>

            {cardData.map((card) => (
              <div
                key={card.key}
                className="ict-card"
                style={{
                  borderRadius: 16, overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  background: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,.05)',
                  display: 'flex', flexDirection: 'column',
                  animation: `scaleIn .7s ${card.delay} ease both`,
                }}
              >
                <div style={{ height: 4, background: card.barGrad, flexShrink: 0 }} />
                <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>

                  {/* Icon */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: '#eff6ff', border: '1px solid #bfdbfe',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.7rem', marginBottom: 20,
                  }}>
                    {card.icon}
                  </div>

                  {/* Label */}
                  <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>
                    {card.key === 'lms' ? 'Learning Management System' : 'Rapor Elektronik'}
                  </p>

                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                    {card.title}
                  </h2>

                  <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.85, flex: 1, marginBottom: 28 }}>
                    {card.desc}
                  </p>

                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ict-btn"
                    style={{
                      background: card.btnBg,
                      color: '#fff', fontWeight: 700,
                      borderRadius: 9999, padding: '13px 24px',
                      fontSize: 14, letterSpacing: '.02em',
                      boxShadow: `0 4px 16px ${card.btnGlow}`,
                    }}
                  >
                    {card.label} →
                  </a>
                </div>
              </div>
            ))}

          </div>

          {/* Footer note */}
          <div className="ict-footer" style={{
            textAlign: 'center', padding: '24px 32px', borderRadius: 12,
            background: '#f9fafb', border: '1px solid #e5e7eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'pre-line', margin: 0, fontWeight: 500 }}>
              {content.footer_note}
            </p>
          </div>
        </div>

      </main>
    </>
  );
}