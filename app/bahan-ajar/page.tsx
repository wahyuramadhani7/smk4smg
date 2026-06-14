'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DocumentItem {
  name: string;
  subtitle: string;
  drive_link?: string;
}

interface BahanAjarItem {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
  documents: DocumentItem[];
}

interface BahanAjarContent {
  main_title: string;
  main_subtitle: string;
  items: BahanAjarItem[];
}

/* Accent palette */
const ACCENTS = [
  { border: 'rgba(37,99,235,.35)', bar: 'rgba(37,99,235,.9)', soft: 'rgba(37,99,235,.12)', text: '#60a5fa' },
  { border: 'rgba(8,145,178,.35)', bar: 'rgba(8,145,178,.9)', soft: 'rgba(8,145,178,.12)', text: '#38bdf8' },
  { border: 'rgba(79,70,229,.35)', bar: 'rgba(79,70,229,.9)', soft: 'rgba(79,70,229,.12)', text: '#a5b4fc' },
  { border: 'rgba(16,185,129,.35)', bar: 'rgba(16,185,129,.9)', soft: 'rgba(16,185,129,.12)', text: '#6ee7b7' },
  { border: 'rgba(245,158,11,.35)', bar: 'rgba(245,158,11,.9)', soft: 'rgba(245,158,11,.12)', text: '#fcd34d' },
  { border: 'rgba(239,68,68,.35)', bar: 'rgba(239,68,68,.9)', soft: 'rgba(239,68,68,.12)', text: '#fca5a5' },
];

const isDriveLink = (url?: string): boolean => {
  if (!url) return false;
  return url.startsWith('https://drive.google.com') || url.startsWith('https://docs.google.com');
};

export default function BahanAjar() {
  const [content, setContent] = useState<BahanAjarContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('bahan_ajar_content')
        .select('*')
        .limit(1)
        .single();

      if (data) {
        // Backward compatibility
        const normalized: BahanAjarContent = {
          ...data,
          items: data.items.map((item: any) => ({
            ...item,
            documents: item.documents.map((doc: any) => ({
              drive_link: '',
              ...doc,
            }))
          }))
        };
        setContent(normalized);
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
        @keyframes fadeDown    { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp      { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn     { from { opacity:0; transform:scale(.94); } to { opacity:1; transform:scale(1); } }

        .ba-title { animation: fadeDown .8s .1s ease both; }
        .ba-sub   { animation: fadeUp  .8s .25s ease both; }

        .ba-card {
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: default;
        }
        .ba-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,.1);
        }

        .doc-item {
          transition: all .2s ease;
        }
        .doc-item:hover {
          background: #f0f9ff !important;
          transform: translateX(4px);
        }

        .doc-link {
          color: inherit;
          text-decoration: none;
        }
        .doc-link:hover .doc-name {
          color: #1d4ed8 !important;
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", paddingBottom: 80 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>

            <div className="ba-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b' }}>
                Materi Pembelajaran
              </span>
              <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', width: 80, height: 80, borderRadius: 24, background: '#eff6ff', border: '1.5px solid #bfdbfe', fontSize: '2.4rem' }}>
              📖
            </div>

            <h1 className="ba-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(1.8rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', color: '#111827', margin: '0 0 16px' }}>
              {content.main_title}
            </h1>

            <p className="ba-sub" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.1rem)', color: '#6b7280', lineHeight: 1.85, maxWidth: 600, margin: '0 auto 20px', fontWeight: 500 }}>
              {content.main_subtitle}
            </p>

            <div style={{ width: 60, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #1d4ed8, #f59e0b)', margin: '0 auto' }} />
          </div>
        </section>

        {/* ── Cards Grid ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>

            {content.items.map((item, idx) => {
              const accent = ACCENTS[idx % ACCENTS.length];
              const animDelay = `${0.1 + idx * 0.1}s`;

              return (
                <div
                  key={item.id}
                  className="ba-card"
                  style={{
                    borderRadius: 16,
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    animation: `scaleIn .7s ${animDelay} ease both`,
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,.05)',
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${accent.bar}, transparent)`, flexShrink: 0 }} />

                  {/* Card body */}
                  <div style={{ padding: '28px 28px 0', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem',
                      }}>
                        {item.icon}
                      </div>
                      <div style={{ paddingTop: 4 }}>
                        <p style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', fontWeight: 700, color: '#f59e0b', margin: '0 0 4px' }}>
                          Materi
                        </p>
                        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: 0, lineHeight: 1.3 }}>
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.85, marginBottom: 24 }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Documents */}
                  <div style={{ margin: '0 20px 24px', borderRadius: 12, border: '1px solid #e5e7eb', background: '#f9fafb', overflow: 'hidden' }}>

                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 700, color: '#1d4ed8' }}>
                        Dokumen Tersedia
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: '4px 0', margin: 0 }}>
                      {item.documents.map((doc, i) => {
                        const hasValidLink = isDriveLink(doc.drive_link);

                        return (
                          <li
                            key={i}
                            className="doc-item"
                            style={{
                              padding: '12px 16px',
                              borderBottom: i < item.documents.length - 1 ? '1px solid #f3f4f6' : 'none',
                              borderRadius: 6,
                            }}
                          >
                            {hasValidLink ? (
                              <a
                                href={doc.drive_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="doc-link"
                                style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                              >
                                <span style={{ marginTop: 5, flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: '#1d4ed8', display: 'inline-block' }} />
                                <div style={{ flex: 1 }}>
                                  <p className="doc-name" style={{ fontSize: 13.5, fontWeight: 600, color: '#111827', margin: '0 0 2px' }}>
                                    {doc.name}
                                  </p>
                                  <p style={{ fontSize: 12.5, color: '#9ca3af', margin: 0 }}>
                                    {doc.subtitle}
                                  </p>
                                </div>
                                <span style={{ fontSize: 16, color: '#1d4ed8', opacity: 0.7, marginTop: 2 }}>↗</span>
                              </a>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, opacity: 0.6 }}>
                                <span style={{ marginTop: 5, flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }} />
                                <div>
                                  <p style={{ fontSize: 13.5, fontWeight: 600, color: '#374151', margin: '0 0 2px' }}>
                                    {doc.name}
                                  </p>
                                  <p style={{ fontSize: 12.5, color: '#9ca3af', margin: 0 }}>
                                    {doc.subtitle}
                                  </p>
                                </div>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </main>
    </>
  );
}