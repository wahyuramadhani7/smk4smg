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

        .pk-title   { animation: fadeDown .8s .1s ease both; }
        .pk-desc    { animation: fadeUp  .8s .25s ease both; }
        .pk-card-l  { animation: fadeInLeft  .8s .3s ease both; }
        .pk-card-r  { animation: fadeInRight .8s .45s ease both; }
        .pk-doc     { animation: scaleIn .7s .6s ease both; }

        .tujuan-item {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .tujuan-item:hover {
          transform: translateX(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,.06);
        }

        .btn-doc {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: box-shadow .3s ease, transform .2s ease;
        }
        .btn-doc:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(29,78,216,.25) !important;
        }

        .pk-card {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .pk-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,.1);
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>

            <div className="pk-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>
                Kurikulum Merdeka
              </span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              📋
            </div>

            <h1 className="pk-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              {content.profil_title}
            </h1>

            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Body ── */}
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px 0' }}>

          <p className="pk-desc" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', color: '#6b7280', lineHeight: 1.85, marginBottom: 48, textAlign: 'center', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', fontWeight: 500 }}>
            {content.profil_description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>

            {/* Card Tujuan Pembelajaran */}
            <div className="pk-card pk-card-l" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #1d4ed8, #60a5fa)', flexShrink: 0 }} />
              <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                  🎯
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>
                  Tujuan Pembelajaran Vokasi
                </p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 20px' }}>
                  Tujuan Pembelajaran
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {content.tujuan_pembelajaran.map((item, i) => (
                    <li key={i} className="tujuan-item" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 10, border: '1px solid #f3f4f6', background: '#fafafa' }}>
                      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 6, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', color: '#1d4ed8' }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Sistem Pembelajaran */}
            <div className="pk-card pk-card-r" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 4, background: 'linear-gradient(90deg, #f59e0b, #fcd34d)', flexShrink: 0 }} />
              <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 20 }}>
                  📚
                </div>
                <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8', marginBottom: 8 }}>
                  Sistem Pembelajaran
                </p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#111827', margin: '0 0 14px' }}>
                  Metode Belajar
                </h2>
                <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.85, flex: 1, margin: 0 }}>
                  {content.sistem_pembelajaran}
                </p>
              </div>
            </div>

          </div>

          {/* Dokumen */}
          <div className="pk-doc" style={{ padding: '24px 32px', borderRadius: 12, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8', marginBottom: 6 }}>
                Dokumen Resmi
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, fontWeight: 500 }}>
                Unduh dokumen Kurikulum Merdeka SMK Negeri 4 Semarang dalam format PDF.
              </p>
            </div>
            <a href={content.dokumen_kurikulum_url} target="_blank" rel="noopener noreferrer" className="btn-doc" style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)', color: '#fff', fontWeight: 700, borderRadius: 9999, padding: '12px 24px', textDecoration: 'none', fontSize: 14, boxShadow: '0 4px 16px rgba(29,78,216,.2)', whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '.02em' }}>
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