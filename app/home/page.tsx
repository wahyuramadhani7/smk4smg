"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface HomeContent {
  hero_title: string;
  hero_subtitle: string;
  hero_bg_url: string;
  sambutan_kutipan: string;
  sambutan_nama: string;
  sambutan_jabatan: string;
  visi: string;
  misi: string[];
  stats: { value: string; label: string }[];
  foto1_url: string;
  foto1_caption: string;
  foto2_url: string;
  foto2_caption: string;
}

const DEFAULT: HomeContent = {
  hero_title: "SMK 4 Semarang",
  hero_subtitle:
    "Sekolah vokasi unggulan berbasis industri yang mencetak generasi kompeten dan berkarakter.",
  hero_bg_url:
    "https://images.unsplash.com/photo-1594737625785-6c2e9d3b8f3e?q=80&w=2070&fit=crop",
  sambutan_kutipan:
    "Kami berkomitmen untuk mencetak generasi muda yang kompeten, kreatif, dan siap memasuki dunia industri melalui pendidikan vokasi yang berkualitas.",
  sambutan_nama: "Drs. Ahmad Santoso, M.Pd.",
  sambutan_jabatan: "Kepala Sekolah SMK 4 Semarang",
  visi: "Menjadi sekolah menengah kejuruan yang unggul dalam menghasilkan lulusan kompeten, berakhlak mulia, dan siap bersaing di era industri 4.0.",
  misi: [
    "Menyelenggarakan pendidikan vokasi yang relevan dengan kebutuhan industri",
    "Mengembangkan potensi siswa melalui pembelajaran berbasis proyek",
    "Membangun kerjasama yang kuat dengan dunia usaha dan industri",
    "Menanamkan nilai-nilai karakter dan etos kerja yang tinggi",
  ],
  stats: [
    { value: "1.250+", label: "Siswa Aktif" },
    { value: "92", label: "Guru & Tendik" },
    { value: "7", label: "Program Keahlian" },
    { value: "52", label: "Mitra Industri" },
  ],
  foto1_url:
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800",
  foto1_caption: "Kepala Sekolah SMK 4 Semarang",
  foto2_url: "",
  foto2_caption: "",
};

/* ── Animated Counter ── */
function Counter({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.,]/g, "");
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        let startTime = 0;
        const duration = 1800;
        const step = (ts: number) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.floor(eased * numeric).toLocaleString("id") + suffix);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

/* ── Floating particles ── */
function Particles() {
  const items = Array.from({ length: 16 }, (_, i) => ({
    left: `${5 + ((i * 6.2) % 90)}%`,
    top: `${10 + ((i * 13.7) % 80)}%`,
    delay: `${(i * 0.4) % 6}s`,
    duration: `${7 + ((i * 1.1) % 7)}s`,
    size: `${2 + ((i * 0.7) % 4)}px`,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {items.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background:
              i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#60a5fa" : "#818cf8",
            opacity: 0.25,
            animation: `particleFloat ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [c, setC] = useState<HomeContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("home_content")
        .select("*")
        .limit(1)
        .single();
      setC(data ? (data as HomeContent) : DEFAULT);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050810",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(96,165,250,.15)",
            borderTopColor: "#60a5fa",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes spin         { to { transform: rotate(360deg); } }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: .2; }
          50%       { transform: translateY(-30px) scale(1.2); opacity: .5; }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @keyframes ringRotate {
          to { transform: rotate(360deg); }
        }

        .hero-badge { animation: fadeDown .8s .1s ease both; }
        .hero-h1    { animation: fadeUp 1s .3s ease both; }
        .hero-sub   { animation: fadeUp 1s .5s ease both; }
        .hero-btn   { animation: fadeUp 1s .7s ease both; }
        .hero-scroll{ animation: fadeIn 1s 1.2s ease both; }

        .sambutan-foto    { animation: fadeInLeft .9s .2s ease both; }
        .sambutan-text    { animation: fadeInRight .9s .4s ease both; }

        .visicard   { animation: fadeInLeft .9s .2s ease both; }
        .misicard   { animation: fadeInRight .9s .4s ease both; }
        .visi-label { animation: fadeDown .8s .1s ease both; }

        .stat-0 { animation: scaleIn .7s .1s ease both; }
        .stat-1 { animation: scaleIn .7s .25s ease both; }
        .stat-2 { animation: scaleIn .7s .4s ease both; }
        .stat-3 { animation: scaleIn .7s .55s ease both; }
        .stats-label { animation: fadeDown .8s .05s ease both; }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.05) !important;
          box-shadow: 0 0 40px rgba(56,189,248,.3) !important;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .misi-item:hover {
          transform: translateX(8px);
          background: rgba(37,99,235,.1) !important;
          transition: transform .25s ease, background .25s ease;
        }
        .scroll-dot { animation: scrollBounce 1.6s ease-in-out infinite; }

        .btn-main {
          position: relative; overflow: hidden;
          transition: box-shadow .3s ease, transform .2s ease;
        }
        .btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(37,99,235,.6) !important;
        }
        .btn-main::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,.15);
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s ease;
        }
        .btn-main:hover::after { transform: scaleX(1); }

        /* ── Sambutan Grid ── */
        .sambutan-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 56px;
          align-items: center;
        }

        /* ── Stats Grid: 2x2 on all sizes, 4-col on lg ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (min-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .sambutan-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .section-padding { padding: 60px 0 !important; }
          .stats-grid { gap: 12px; }
          .stat-card-inner { padding: 24px 16px !important; }
          .visicard, .misicard { padding: 24px 20px !important; }
          .section-inner { padding: 0 16px !important; }
          .sambutan-grid { gap: 28px; }
        }

        @media (max-width: 380px) {
  .hero-badge-text { letter-spacing: .08em; font-size: 13px; }
}
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: "#050810",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {/* ══ HERO ══ */}
        <section
          style={{
            position: "relative",
            height: "100vh",
            minHeight: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${c.hero_bg_url}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(1.1) translateY(${scrollY * 0.2}px)`,
              filter: "brightness(.4) saturate(1.3)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(37,99,235,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.06) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 20%, rgba(5,8,16,.9) 80%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 160,
              background: "linear-gradient(to top, #050810, transparent)",
            }}
          />

          <Particles />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              padding: "0 20px",
              maxWidth: 900,
              margin: "0 auto",
              width: "100%",
            }}
          >
            {/* SESUDAH */}
            <div
              className="hero-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 2,
                  background: "linear-gradient(90deg, transparent, #60a5fa)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                className="hero-badge-text"
                style={{
                  fontSize: 40,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  color: "#ffffff",
                  textShadow:
                    "0 0 20px rgba(96,165,250,0.8), 0 0 40px rgba(56,189,248,0.4)",
                  WebkitTextStroke: "0.3px rgba(255,255,255,0.9)",
                }}
              >
                SMK NEGERI 4 SEMARANG
              </span>
              <span
                style={{
                  width: 40,
                  height: 2,
                  background: "linear-gradient(90deg, #60a5fa, transparent)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            </div>

            <h1
              className="hero-h1"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(2.75rem, 8.8vw, 6.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: "0 0 28px",
              }}
            >
              UKIR PRESTASI
              <br />
              <span
                style={{
                  WebkitTextStroke: "2px #38bdf8",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                TIADA HENTI
              </span>
            </h1>

            <p
              className="hero-sub"
              style={{
                fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                color: "rgba(255,255,255,.68)",
                lineHeight: 1.75,
                maxWidth: 580,
                margin: "0 auto 40px",
              }}
            >
              {c.hero_subtitle}
            </p>

            <div className="hero-btn">
              <a
                href="#sambutan"
                className="btn-main hero-btn-inner"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: ".05em",
                  borderRadius: 9999,
                  padding: "16px 34px",
                  textDecoration: "none",
                  boxShadow: "0 0 30px rgba(37,99,235,.4)",
                  fontSize: "0.96rem",
                }}
              >
                Kenali Kami Lebih Dekat
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className="hero-scroll"
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,.3)",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: ".3em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <div
              className="scroll-dot"
              style={{
                width: 4,
                height: 20,
                borderRadius: 9999,
                background: "#38bdf8",
              }}
            />
          </div>
        </section>

        {/* ══ SAMBUTAN ══ */}
        <section
          id="sambutan"
          className="section-padding"
          style={{
            padding: "96px 0",
            background: "#0a0f1e",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #2563eb, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              background:
                "radial-gradient(ellipse at 80% 40%, rgba(37,99,235,.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            className="section-inner"
            style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}
          >
            <div className="sambutan-grid">
              <div className="sambutan-foto">
                <div
                  style={{
                    position: "relative",
                    maxWidth: 420,
                    margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: -3,
                      borderRadius: 28,
                      background:
                        "linear-gradient(135deg, #2563eb, #38bdf8, #2563eb)",
                      padding: 2,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 26,
                        background: "#0a0f1e",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 24,
                      overflow: "hidden",
                      aspectRatio: "4/3",
                    }}
                  >
                    <Image
                      src={c.foto1_url || "/placeholder-kepsek.jpg"}
                      alt={c.foto1_caption}
                      fill
                      style={{
                        objectFit: "cover",
                        filter: "saturate(1.1) contrast(1.05)",
                      }}
                      priority
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(5,8,16,.75) 0%, transparent 55%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        right: 16,
                        background: "rgba(37,99,235,.7)",
                        backdropFilter: "blur(12px)",
                        borderRadius: 12,
                        padding: "8px 16px",
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {c.foto1_caption}
                    </div>
                  </div>
                </div>
              </div>

              <div className="sambutan-text">
                <p
                  style={{
                    fontSize: 11,
                    letterSpacing: ".35em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#38bdf8",
                    marginBottom: 12,
                  }}
                >
                  Sambutan Kepala Sekolah
                </p>
                <h2
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "#fff",
                    marginBottom: 32,
                  }}
                >
                  Assalamu'alaikum
                  <br />
                  <span style={{ color: "#60a5fa" }}>Wr. Wb.</span>
                </h2>

                <div
                  className="sambutan-quote"
                  style={{
                    position: "relative",
                    paddingLeft: 24,
                    borderLeft: "3px solid #2563eb",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      left: -8,
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "7rem",
                      lineHeight: 0.7,
                      color: "rgba(37,99,235,.15)",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    "
                  </div>
                  <blockquote
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
                      color: "rgba(255,255,255,.72)",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    {c.sambutan_kutipan}
                  </blockquote>
                </div>

                <div
                  style={{
                    marginTop: 36,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      padding: 2,
                      borderRadius: "50%",
                      background: "conic-gradient(#2563eb, #38bdf8, #2563eb)",
                      animation: "ringRotate 4s linear infinite",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "#0f1629",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {c.sambutan_nama
                        .split(" ")
                        .map((w: string) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 4,
                        fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                      }}
                    >
                      {c.sambutan_nama}
                    </p>
                    <p style={{ fontSize: 13, color: "#60a5fa" }}>
                      {c.sambutan_jabatan}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    marginTop: 24,
                    fontSize: 13,
                    color: "rgba(255,255,255,.3)",
                  }}
                >
                  Wassalamu'alaikum Wr. Wb.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VISI & MISI ══ */}
        <section
          className="section-padding"
          style={{
            padding: "96px 0",
            background: "#0f1629",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #38bdf8, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(37,99,235,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.05) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div
            className="section-inner"
            style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}
          >
            <div
              className="visi-label"
              style={{ textAlign: "center", marginBottom: 56 }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: ".35em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#38bdf8",
                  marginBottom: 12,
                }}
              >
                Arah Sekolah
              </p>
              <h2
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: ".04em",
                  color: "#fff",
                  margin: "0 0 16px",
                }}
              >
                VISI &amp; MISI
              </h2>
              <div
                style={{
                  width: 80,
                  height: 4,
                  borderRadius: 9999,
                  background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                  margin: "0 auto",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              <div
                className="visicard"
                style={{
                  borderRadius: 20,
                  padding: 32,
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,.9), rgba(29,78,216,.95))",
                  border: "1px solid rgba(96,165,250,.3)",
                  boxShadow: "0 0 60px rgba(37,99,235,.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,.06), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "rgba(255,255,255,.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: ".3em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "rgba(255,255,255,.6)",
                    }}
                  >
                    Visi
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                    color: "#fff",
                    lineHeight: 1.8,
                    fontWeight: 500,
                  }}
                >
                  {c.visi}
                </p>
              </div>

              <div
                className="misicard"
                style={{
                  borderRadius: 20,
                  padding: 32,
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "rgba(37,99,235,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: ".3em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "#38bdf8",
                    }}
                  >
                    Misi
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {c.misi.map((m: string, i: number) => (
                    <li
                      key={i}
                      className="misi-item"
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: "rgba(37,99,235,.25)",
                          color: "#38bdf8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Bebas Neue, sans-serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(0.8rem, 1.4vw, 0.875rem)",
                          color: "rgba(255,255,255,.72)",
                          lineHeight: 1.7,
                        }}
                      >
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATISTIK ══ */}
        <section
          className="section-padding"
          style={{
            padding: "96px 0",
            background: "#050810",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #2563eb, transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,.1) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          {[240, 420, 600].map((r, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: r * 2,
                height: r * 2,
                borderRadius: "50%",
                border: "1px solid rgba(37,99,235,.07)",
                pointerEvents: "none",
              }}
            />
          ))}

          <div
            className="section-inner"
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "0 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="stats-label"
              style={{ textAlign: "center", marginBottom: 56 }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: ".35em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#38bdf8",
                  marginBottom: 12,
                }}
              >
                Fakta &amp; Angka
              </p>
              <h2
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: ".04em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                SEKOLAH KAMI
              </h2>
            </div>

            <div className="stats-grid">
              {c.stats.map((s: { value: string; label: string }, i: number) => (
                <div
                  key={i}
                  className={`stat-card stat-card-inner stat-${i}`}
                  style={{
                    borderRadius: 20,
                    padding: "32px 24px",
                    textAlign: "center",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,.015))",
                    border: "1px solid rgba(96,165,250,.15)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1,
                      marginBottom: 8,
                      background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <Counter value={s.value} />
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(11px, 1.5vw, 13px)",
                      color: "rgba(255,255,255,.5)",
                      letterSpacing: ".05em",
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
