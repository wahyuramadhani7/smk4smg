"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const jurusan = ["DPIB", "TPM", "TKR", "TITL", "TEI", "DKV", "ANS", "TSM"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setOpenSub(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggleSub = (menu: string) =>
    setOpenSub((prev) => (prev === menu ? null : menu));

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const closeAll = () => { setIsOpen(false); setOpenSub(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .nb {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
          border-bottom: 1px solid #e8e8e8;
          transition: box-shadow 0.3s ease;
        }
        .nb--scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
        }
        .nb__inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .nb__bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 1rem;
        }
        .nb__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #111827;
          flex-shrink: 1;
          min-width: 0;
          overflow: hidden;
        }
        .nb__logo-text { min-width: 0; overflow: hidden; flex-shrink: 1; }
        .nb__school-logo {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          object-fit: contain;
          background: #f0f4ff;
          padding: 3px;
          border: 1.5px solid #dde3f0;
          flex-shrink: 0;
        }
        .nb__logo-main {
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.2;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          letter-spacing: 0.01em;
        }
        .nb__logo-sub {
          font-size: 0.72rem;
          color: #6b7280;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        /* Desktop Nav */
        .nb__desktop {
          display: none;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .nb__desktop { display: flex; }
          .nb__ham { display: none !important; }
        }

        .nb__link {
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
          position: relative;
        }
        .nb__link:hover { color: #111827; background: #f3f4f6; }
        .nb__link--active {
          color: #1d4ed8;
          border-bottom: 2px solid #1d4ed8;
          border-radius: 0;
          padding-bottom: 0.35rem;
        }

        /* Dropdown */
        .nb__dd { position: relative; }
        .nb__dd-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .nb__dd-btn:hover,
        .nb__dd-btn[aria-expanded="true"] { color: #111827; background: #f3f4f6; }

        .nb__chevron {
          display: inline-block;
          width: 0; height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4.5px solid currentColor;
          opacity: 0.5;
          transition: transform 0.22s ease;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .nb__dd-btn[aria-expanded="true"] .nb__chevron { transform: rotate(180deg); opacity: 0.8; }

        .nb__panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 200px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 6px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          animation: panelFade 0.15s ease both;
          z-index: 100;
        }
        .nb__panel--jurusan { min-width: 260px; padding: 12px; }

        @keyframes panelFade {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .nb__panel-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .nb__panel-item:hover { background: #f3f4f6; color: #111827; }

        .nb__dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #d1d5db;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .nb__panel-item:hover .nb__dot { background: #1d4ed8; }

        .nb__jurusan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 6px;
        }
        .nb__jurusan-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          border-radius: 8px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #374151;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .nb__jurusan-chip:hover {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #1d4ed8;
        }

        /* Login Button — kuning sesuai referensi */
        .nb__login {
          margin-left: 8px;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          background: #f59e0b;
          border: none;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.01em;
        }
        .nb__login:hover { background: #d97706; transform: translateY(-1px); }

        /* Hamburger */
        .nb__ham {
          width: 40px; height: 40px;
          border-radius: 8px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: background 0.2s ease;
          outline: none;
          flex-shrink: 0;
          margin-left: auto;
        }
        .nb__ham:hover { background: #e5e7eb; }
        .nb__ham-line {
          width: 20px; height: 2px;
          background: #374151;
          border-radius: 2px;
          transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }

        /* Mobile overlay */
        .nb__overlay {
          position: fixed;
          inset: 0;
          top: 72px;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(2px);
          z-index: 999;
          animation: fadeIn 0.2s ease;
        }

        /* Mobile Menu */
        .nb__mobile {
          position: fixed;
          top: 72px;
          left: 0; right: 0;
          z-index: 1000;
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          padding: 8px 12px 20px;
          max-height: calc(100dvh - 72px);
          overflow-y: auto;
          animation: slideDown 0.28s cubic-bezier(0.16,1,0.3,1) both;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        .nb__m-link {
          display: flex;
          align-items: center;
          padding: 11px 14px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nb__m-link:hover { background: #f3f4f6; color: #111827; }
        .nb__m-acc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.15s, color 0.15s;
        }
        .nb__m-acc-btn:hover,
        .nb__m-acc-btn[aria-expanded="true"] { background: #f3f4f6; color: #111827; }
        .nb__m-acc-btn[aria-expanded="true"] .nb__chevron { transform: rotate(180deg); opacity: 0.8; }

        .nb__m-sub {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin: 2px 0 4px 14px;
          padding-left: 14px;
          border-left: 2px solid #bfdbfe;
        }
        .nb__m-sub-link {
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #6b7280;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nb__m-sub-link:hover { background: #f3f4f6; color: #111827; }

        .nb__m-jurusan-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin: 6px 14px 10px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 10px;
        }
        .nb__m-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 6px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          color: #374151;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.02em;
        }
        .nb__m-chip:hover { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }

        .nb__divider { height: 1px; background: #f3f4f6; margin: 4px 14px; }

        .nb__m-login {
          display: block;
          margin: 10px 14px 0;
          padding: 13px 16px;
          border-radius: 8px;
          background: #f59e0b;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          text-align: center;
          transition: background 0.2s;
        }
        .nb__m-login:hover { background: #d97706; }

        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 400px) {
          .nb__inner { padding: 0 0.75rem; }
          .nb__bar { height: 60px; }
          .nb__school-logo { width: 38px; height: 38px; }
          .nb__logo-main { font-size: 0.82rem; }
          .nb__logo-sub { display: none; }
          .nb__overlay, .nb__mobile { top: 60px; max-height: calc(100dvh - 60px); }
        }
        @media (min-width: 401px) and (max-width: 540px) {
          .nb__inner { padding: 0 1rem; }
          .nb__bar { height: 64px; }
          .nb__school-logo { width: 44px; height: 44px; }
          .nb__logo-main { font-size: 0.9rem; }
          .nb__logo-sub { font-size: 0.62rem; }
          .nb__overlay, .nb__mobile { top: 64px; max-height: calc(100dvh - 64px); }
        }
        @media (min-width: 541px) and (max-width: 767px) {
          .nb__bar { height: 68px; }
          .nb__overlay, .nb__mobile { top: 68px; max-height: calc(100dvh - 68px); }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .nb__inner { padding: 0 1.25rem; }
          .nb__link, .nb__dd-btn { padding: 0.4rem 0.7rem; font-size: 0.82rem; }
          .nb__login { padding: 0.45rem 0.9rem; font-size: 0.82rem; }
        }
      `}</style>

      <nav className={`nb${scrolled ? " nb--scrolled" : ""}`} aria-label="Navigasi utama">
        <div className="nb__inner">
          <div className="nb__bar">

            {/* Logo */}
            <Link href="/home" className="nb__logo" aria-label="SMK Negeri 4 Semarang – Beranda">
              <img src="./images/logosmk4.png" alt="Logo SMK Negeri 4 Semarang" className="nb__school-logo" />
              <div className="nb__logo-text">
                <span className="nb__logo-main">SMK NEGERI 4 SEMARANG</span>
                <span className="nb__logo-sub">Semarang · Jawa Tengah</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="nb__desktop" role="menubar">
              <Link href="/home" className="nb__link nb__link--active" role="menuitem">Home</Link>

              <div className="nb__dd" onMouseEnter={() => handleDropdownEnter("kurikulum")} onMouseLeave={handleDropdownLeave}>
                <button className="nb__dd-btn" aria-haspopup="true" aria-expanded={activeDropdown === "kurikulum"}
                  onClick={() => setActiveDropdown(prev => prev === "kurikulum" ? null : "kurikulum")}>
                  Kurikulum <span className="nb__chevron" aria-hidden="true" />
                </button>
                {activeDropdown === "kurikulum" && (
                  <div className="nb__panel" role="menu">
                    <Link href="/kurikulum/profil" className="nb__panel-item" onClick={() => setActiveDropdown(null)}>
                      <span className="nb__dot" /> Profil Kurikulum
                    </Link>
                    <Link href="/kurikulum/struktur" className="nb__panel-item" onClick={() => setActiveDropdown(null)}>
                      <span className="nb__dot" /> Struktur Kurikulum
                    </Link>
                  </div>
                )}
              </div>

              <div className="nb__dd" onMouseEnter={() => handleDropdownEnter("jurusan")} onMouseLeave={handleDropdownLeave}>
                <button className="nb__dd-btn" aria-haspopup="true" aria-expanded={activeDropdown === "jurusan"}
                  onClick={() => setActiveDropdown(prev => prev === "jurusan" ? null : "jurusan")}>
                  Jurusan <span className="nb__chevron" aria-hidden="true" />
                </button>
                {activeDropdown === "jurusan" && (
                  <div className="nb__panel nb__panel--jurusan" role="menu">
                    <div className="nb__jurusan-grid">
                      {jurusan.map(j => (
                        <Link key={j} href={`/jurusan/${j.toLowerCase()}`} className="nb__jurusan-chip" onClick={() => setActiveDropdown(null)}>{j}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/bahan-ajar" className="nb__link">Bahan Ajar</Link>
              <Link href="/evaluasi" className="nb__link">Evaluasi</Link>
              <Link href="/ict" className="nb__link">ICT</Link>
              <Link href="/login" className="nb__login">Login Admin</Link>
            </div>

            {/* Hamburger */}
            <button className="nb__ham" onClick={() => setIsOpen(prev => !prev)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"} aria-expanded={isOpen} aria-controls="mobile-menu">
              <div className="nb__ham-line" style={isOpen ? { transform: "rotate(45deg) translate(0, 7px)" } : {}} />
              <div className="nb__ham-line" style={isOpen ? { opacity: 0, transform: "scaleX(0)" } : {}} />
              <div className="nb__ham-line" style={isOpen ? { transform: "rotate(-45deg) translate(0, -7px)" } : {}} />
            </button>
          </div>
        </div>

        {isOpen && <div className="nb__overlay" aria-hidden="true" onClick={closeAll} />}

        {isOpen && (
          <div className="nb__mobile" id="mobile-menu" role="navigation">
            <Link href="/home" onClick={closeAll} className="nb__m-link">Home</Link>
            <div className="nb__divider" />

            <button onClick={() => toggleSub("kurikulum")} className="nb__m-acc-btn" aria-expanded={openSub === "kurikulum"}>
              Kurikulum <span className="nb__chevron" />
            </button>
            {openSub === "kurikulum" && (
              <div className="nb__m-sub">
                <Link href="/kurikulum/profil" onClick={closeAll} className="nb__m-sub-link">Profil Kurikulum</Link>
                <Link href="/kurikulum/struktur" onClick={closeAll} className="nb__m-sub-link">Struktur Kurikulum</Link>
              </div>
            )}

            <button onClick={() => toggleSub("jurusan")} className="nb__m-acc-btn" aria-expanded={openSub === "jurusan"}>
              Jurusan <span className="nb__chevron" />
            </button>
            {openSub === "jurusan" && (
              <div className="nb__m-jurusan-grid">
                {jurusan.map(j => (
                  <Link key={j} href={`/jurusan/${j.toLowerCase()}`} onClick={closeAll} className="nb__m-chip">{j}</Link>
                ))}
              </div>
            )}

            <div className="nb__divider" />
            <Link href="/bahan-ajar" onClick={closeAll} className="nb__m-link">Bahan Ajar</Link>
            <Link href="/evaluasi" onClick={closeAll} className="nb__m-link">Evaluasi</Link>
            <Link href="/ict" onClick={closeAll} className="nb__m-link">ICT</Link>
            <Link href="/login" onClick={closeAll} className="nb__m-login">Login Admin</Link>
          </div>
        )}
      </nav>
    </>
  );
}