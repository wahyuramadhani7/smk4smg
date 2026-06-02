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
        @keyframes fadeDown    { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp      { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn     { from { opacity:0; transform:scale(.93); } to { opacity:1; transform:scale(1); } }

        .ba-title { animation: fadeDown .8s .1s ease both; }
        .ba-sub   { animation: fadeUp  .8s .25s ease both; }

        .ba-card {
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .ba-card:hover {
          transform: translateY(-8px);
        }

        .doc-item {
          transition: all .2s ease;
        }
        .doc-item:hover {
          background: rgba(255,255,255,.06) !important;
          transform: translateX(6px);
        }

        .doc-link {
          color: inherit;
          text-decoration: none;
        }
        .doc-link:hover {
          color: #60a5fa;
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#050810', fontFamily: 'Outfit, sans-serif', paddingBottom: 80 }}>

        {/* Hero Banner */}
        <section style={{ position: 'relative', padding: '80px 24px 72px', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(37,99,235,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.05) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="ba-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
              <span style={{ fontSize: 11, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 600, color: '#60a5fa' }}>Materi Pembelajaran</span>
              <span style={{ width: 24, height: 1, background: '#60a5fa', display: 'inline-block' }} />
            </div>
            <h1 className="ba-title" style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              letterSpacing: '.04em', lineHeight: 1,
              color: '#fff', margin: '0 0 20px',
            }}>
              {content.main_title}
            </h1>
            <p className="ba-sub" style={{
              fontSize: 'clamp(.95rem, 1.8vw, 1.1rem)',
              color: 'rgba(255,255,255,.6)', lineHeight: 1.8,
              maxWidth: 600, margin: '0 auto 24px',
            }}>
              {content.main_subtitle}
            </p>
            <div style={{ width: 80, height: 4, borderRadius: 9999, background: 'linear-gradient(90deg, #2563eb, #38bdf8)', margin: '0 auto' }} />
          </div>
        </section>

        {/* Cards Grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {content.items.map((item, idx) => {
              const accent = ACCENTS[idx % ACCENTS.length];
              const animDelay = `${0.1 + idx * 0.1}s`;

              return (
                <div
                  key={item.id}
                  className="ba-card"
                  style={{
                    borderRadius: 20,
                    border: `1px solid ${accent.border}`,
                    overflow: 'hidden',
                    animation: `scaleIn .7s ${animDelay} ease both`,
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255,255,255,.02)',
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${accent.bar}, transparent)`, flexShrink: 0 }} />

                  {/* Card body */}
                  <div style={{ padding: '28px 28px 0', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                        background: accent.soft,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem',
                      }}>
                        {item.icon}
                      </div>
                      <h2 style={{
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: '1.45rem', letterSpacing: '.05em',
                        color: '#fff', margin: 0, lineHeight: 1.2, paddingTop: 4,
                      }}>
                        {item.title}
                      </h2>
                    </div>

                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', lineHeight: 1.8, marginBottom: 28 }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Documents */}
                  <div style={{
                    margin: '0 20px 24px',
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,.07)',
                    background: 'rgba(0,0,0,.25)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      padding: '10px 16px',
                      borderBottom: '1px solid rgba(255,255,255,.06)',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <span style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', fontWeight: 600, color: accent.text }}>
                        DOKUMEN TERSEDIA
                      </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: '6px 0', margin: 0 }}>
                      {item.documents.map((doc, i) => {
                        const hasValidLink = isDriveLink(doc.drive_link);
                        
                        return (
                          <li
                            key={i}
                            className="doc-item"
                            style={{
                              padding: '12px 16px',
                              borderBottom: i < item.documents.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none',
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
                                <span style={{
                                  marginTop: 3, flexShrink: 0,
                                  width: 7, height: 7, borderRadius: '50%',
                                  background: accent.text,
                                }} />
                                <div style={{ flex: 1 }}>
                                  <p style={{ fontSize: 13.5, fontWeight: 600, color: '#e0f2fe', margin: '0 0 3px' }}>
                                    {doc.name}
                                  </p>
                                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.5)', margin: 0 }}>
                                    {doc.subtitle}
                                  </p>
                                </div>
                                <span style={{ fontSize: 18, opacity: 0.6, marginTop: 2 }}>↗</span>
                              </a>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, opacity: 0.75 }}>
                                <span style={{
                                  marginTop: 3, flexShrink: 0,
                                  width: 7, height: 7, borderRadius: '50%',
                                  background: '#64748b',
                                }} />
                                <div>
                                  <p style={{ fontSize: 13.5, fontWeight: 600, color: 'rgba(255,255,255,.75)', margin: '0 0 3px' }}>
                                    {doc.name}
                                  </p>
                                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.4)', margin: 0 }}>
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