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
  hero_title: "SMK NEGERI 4 SEMARANG",
  hero_subtitle:
    "Sekolah vokasi unggulan berbasis industri yang mencetak generasi kompeten dan berkarakter.",
  hero_bg_url:
    "https://images.unsplash.com/photo-1594737625785-6c2e9d3b8f3e?q=80&w=2070&fit=crop",
  sambutan_kutipan:
    "Kami berkomitmen untuk mencetak generasi muda yang kompeten, kreatif, dan siap memasuki dunia industri melalui pendidikan vokasi yang berkualitas.",
  sambutan_nama: "Drs. Ahmad Santoso, M.Pd.",
  sambutan_jabatan: "Kepala Sekolah SMK Negeri 4 Semarang",
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
  foto1_url: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800",
  foto1_caption: "Kepala Sekolah SMK Negeri 4 Semarang",
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
    if (isNaN(numeric)) { setDisplay(value); return; }

    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function Home() {
  const [c, setC] = useState<HomeContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("home_content").select("*").limit(1).single();
      const result = data ? (data as HomeContent) : DEFAULT;
      result.hero_title = "SMK NEGERI 4 SEMARANG";
      setC(result);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#1d4ed8", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes scrollBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

        .hero-badge { animation: fadeDown .7s .1s ease both; }
        .hero-h1    { animation: fadeUp .9s .25s ease both; }
        .hero-sub   { animation: fadeUp .9s .4s ease both; }
        .hero-btns  { animation: fadeUp .9s .55s ease both; }
        .hero-scroll{ animation: fadeIn 1s 1s ease both; }

        .sambutan-foto { animation: fadeUp .8s .2s ease both; }
        .sambutan-text { animation: fadeUp .8s .35s ease both; }

        .visi-label { animation: fadeDown .7s .1s ease both; }
        .visicard   { animation: scaleIn .7s .2s ease both; }
        .misicard   { animation: scaleIn .7s .32s ease both; }

        .stats-label { animation: fadeDown .7s .05s ease both; }
        .stat-0 { animation: scaleIn .6s .1s ease both; }
        .stat-1 { animation: scaleIn .6s .2s ease both; }
        .stat-2 { animation: scaleIn .6s .3s ease both; }
        .stat-3 { animation: scaleIn .6s .4s ease both; }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(29,78,216,.12);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .misi-item:hover {
          background: #eff6ff !important;
          transform: translateX(4px);
          transition: transform .2s ease, background .2s ease;
        }
        .btn-yellow {
          transition: background .2s ease, transform .15s ease, box-shadow .2s ease;
        }
        .btn-yellow:hover {
          background: #d97706 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,158,11,.3) !important;
        }
        .btn-outline:hover {
          background: rgba(255,255,255,.15) !important;
          transform: translateY(-2px);
        }
        .scroll-dot { animation: scrollBounce 1.6s ease-in-out infinite; }

        .sambutan-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 56px;
          align-items: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (min-width: 900px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 900px) {
          .sambutan-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .section-padding { padding: 60px 0 !important; }
          .stats-grid { gap: 12px; }
          .stat-card { padding: 24px 16px !important; }
          .visicard, .misicard { padding: 24px 20px !important; }
          .section-inner { padding: 0 16px !important; }
          .sambutan-grid { gap: 28px; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ══ HERO ══ */}
        <section style={{ position: "relative", height: "100vh", minHeight: 520, display: "flex", alignItems: "center", overflow: "hidden" }}>

          {/* Background image */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url('${c.hero_bg_url}')`,
            backgroundSize: "cover", backgroundPosition: "center",
          }} />

          {/* Overlay gelap center */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(10,20,60,.65)",
          }} />

          {/* Content — tengah */}
          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>

              {/* Badge kuning */}
              <div className="hero-badge" style={{ marginBottom: 20 }}>
                <span style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: ".18em",
                  textTransform: "uppercase", color: "#f59e0b",
                }}>
                  SELAMAT DATANG DI SEKOLAH UNGGULAN
                </span>
              </div>

              <h1 className="hero-h1" style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#ffffff",
                margin: "0 0 24px",
                letterSpacing: "-0.01em",
              }}>
                {c.hero_title}
              </h1>

              <p className="hero-sub" style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                color: "rgba(255,255,255,.82)",
                lineHeight: 1.75,
                margin: "0 auto 36px",
                maxWidth: 520,
              }}>
                {c.hero_subtitle}
              </p>

              <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                <a href="#sambutan" className="btn-yellow" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#f59e0b", color: "#ffffff",
                  fontWeight: 700, fontSize: "0.9rem", letterSpacing: ".02em",
                  borderRadius: 6, padding: "14px 28px",
                  textDecoration: "none", border: "none",
                }}>
                  Kenali Kami Lebih Dekat
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
                <a href="#visi" className="btn-outline" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,.08)",
                  border: "2px solid rgba(255,255,255,.6)",
                  color: "#ffffff",
                  fontWeight: 700, fontSize: "0.9rem",
                  borderRadius: 6, padding: "14px 28px",
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                }}>
                  Visi &amp; Misi
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll" style={{
            position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            color: "rgba(255,255,255,.4)",
          }}>
            <span style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase" }}>Scroll</span>
            <div className="scroll-dot" style={{ width: 4, height: 20, borderRadius: 9999, background: "#f59e0b" }} />
          </div>
        </section>

        {/* ══ SAMBUTAN ══ */}
        <section id="sambutan" className="section-padding" style={{ padding: "96px 0", background: "#ffffff", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #1d4ed8, #f59e0b)" }} />

          <div className="section-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div className="sambutan-grid">

              {/* Foto */}
              <div className="sambutan-foto">
                <div style={{ position: "relative", maxWidth: 420, margin: "0 auto" }}>
                  <div style={{
                    position: "relative", borderRadius: 16, overflow: "hidden",
                    aspectRatio: "4/3", boxShadow: "0 20px 60px rgba(0,0,0,.12)",
                    border: "1px solid #e5e7eb",
                  }}>
                    <Image
                      src={c.foto1_url || "/placeholder-kepsek.jpg"}
                      alt={c.foto1_caption}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)" }} />
                    <div style={{
                      position: "absolute", bottom: 14, left: 14, right: 14,
                      background: "rgba(29,78,216,.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 8, padding: "7px 14px",
                      color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "center",
                    }}>
                      {c.foto1_caption}
                    </div>
                  </div>
                </div>
              </div>

              {/* Teks */}
              <div className="sambutan-text">
                <p style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", fontWeight: 700, color: "#f59e0b", marginBottom: 10 }}>
                  Sambutan Kepala Sekolah
                </p>
                <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, lineHeight: 1.2, color: "#111827", marginBottom: 28 }}>
                  Assalamu'alaikum<br />
                  <span style={{ color: "#1d4ed8" }}>Wr. Wb.</span>
                </h2>

                <div style={{ position: "relative", paddingLeft: 20, borderLeft: "3px solid #f59e0b" }}>
                  <blockquote style={{
                    position: "relative", zIndex: 1,
                    fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                    color: "#4b5563",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    margin: 0,
                  }}>
                    {c.sambutan_kutipan}
                  </blockquote>
                </div>

                <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "#eff6ff",
                    border: "2px solid #bfdbfe",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#1d4ed8", fontWeight: 800, fontSize: 15, flexShrink: 0,
                  }}>
                    {c.sambutan_nama.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#111827", marginBottom: 3, fontSize: "clamp(.85rem, 1.4vw, 1rem)" }}>
                      {c.sambutan_nama}
                    </p>
                    <p style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600 }}>{c.sambutan_jabatan}</p>
                  </div>
                </div>

                <p style={{ marginTop: 20, fontSize: 13, color: "#9ca3af" }}>Wassalamu'alaikum Wr. Wb.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VISI & MISI ══ */}
        <section id="visi" className="section-padding" style={{ padding: "96px 0", background: "#f9fafb", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "#e5e7eb" }} />

          <div className="section-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
            <div className="visi-label" style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", fontWeight: 700, color: "#f59e0b", marginBottom: 10 }}>
                Arah Sekolah
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 800, color: "#111827", margin: "0 0 14px" }}>
                Visi &amp; Misi
              </h2>
              <div style={{ width: 60, height: 4, borderRadius: 9999, background: "linear-gradient(90deg, #1d4ed8, #f59e0b)", margin: "0 auto" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

              {/* Visi */}
              <div className="visicard" style={{
                borderRadius: 16, padding: 32,
                background: "#1d4ed8",
                boxShadow: "0 12px 40px rgba(29,78,216,.2)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", fontWeight: 700, color: "rgba(255,255,255,.7)" }}>Visi</span>
                </div>
                <p style={{ fontSize: "clamp(.9rem, 1.4vw, 1.05rem)", color: "#fff", lineHeight: 1.8, fontWeight: 500 }}>
                  {c.visi}
                </p>
              </div>

              {/* Misi */}
              <div className="misicard" style={{
                borderRadius: 16, padding: 32,
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 20px rgba(0,0,0,.05)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", fontWeight: 700, color: "#1d4ed8" }}>Misi</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {c.misi.map((m: string, i: number) => (
                    <li key={i} className="misi-item" style={{
                      display: "flex", gap: 12, alignItems: "flex-start",
                      padding: "10px 12px", borderRadius: 10,
                      border: "1px solid #f3f4f6",
                      background: "#fafafa",
                    }}>
                      <span style={{
                        flexShrink: 0, width: 26, height: 26, borderRadius: 7,
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: "0.85rem",
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: "clamp(.8rem, 1.3vw, .875rem)", color: "#374151", lineHeight: 1.7 }}>
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
        <section className="section-padding" style={{ padding: "96px 0", background: "#ffffff", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "#e5e7eb" }} />

          <div className="section-inner" style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <div className="stats-label" style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", fontWeight: 700, color: "#f59e0b", marginBottom: 10 }}>
                Fakta &amp; Angka
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 800, color: "#111827", margin: 0 }}>
                Sekolah Kami
              </h2>
            </div>

            <div className="stats-grid">
              {c.stats.map((s: { value: string; label: string }, i: number) => (
                <div key={i} className={`stat-card stat-${i}`} style={{
                  borderRadius: 16, padding: "36px 24px", textAlign: "center",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  cursor: "default",
                }}>
                  <div style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: 800, lineHeight: 1, marginBottom: 8,
                    color: "#1d4ed8",
                  }}>
                    <Counter value={s.value} />
                  </div>
                  <div style={{ fontSize: "clamp(11px, 1.4vw, 13px)", color: "#6b7280", letterSpacing: ".04em", fontWeight: 600 }}>
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