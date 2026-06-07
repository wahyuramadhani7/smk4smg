"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const jurusan = ["DPIB", "TPM", "TKR", "TITL", "TEI", "DKV", "ANS"];

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
    return () => {
      document.body.style.overflow = "";
    };
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

  const closeAll = () => {
    setIsOpen(false);
    setOpenSub(null);
  };

  return (
    <>
     <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .nb {
    font-family: 'Plus Jakarta Sans', sans-serif;
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: box-shadow 0.3s ease, background 0.3s ease;
  }

  .nb--scrolled {
    box-shadow: 0 4px 30px rgba(10, 35, 90, 0.4);
  }

  .nb__bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, #0a1f5c 0%, #1140a0 55%, #1a55c8 100%);
    z-index: 0;
  }

  .nb__bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 80% 50%, rgba(100,160,255,0.08) 0%, transparent 60%),
      url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M26 0l26 26-26 26L0 26z'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .nb__inner {
    position: relative;
    z-index: 1;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .nb__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 82px;
    gap: 1rem;
  }

  /* ── LOGO WRAPPER ── */
  .nb__logo {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    color: white;
    flex-shrink: 1;        /* boleh menyusut */
    min-width: 0;          /* kunci agar tidak overflow */
    outline: none;
    overflow: hidden;
  }

  /* ── LOGO TEXT WRAPPER ── */
  .nb__logo-text {
    min-width: 0;
    overflow: hidden;
    flex-shrink: 1;
  }

  /* ── LOGO IMAGE ── */
  .nb__school-logo {
    width: 68px;
    height: 68px;
    border-radius: 14px;
    object-fit: contain;
    background: white;
    padding: 3px;
    box-shadow:
      0 0 0 2px rgba(255,255,255,0.4),
      0 0 0 5px rgba(96,165,250,0.25),
      0 8px 24px rgba(0,0,0,0.45);
    flex-shrink: 0;        /* logo gambar tidak boleh menyusut */
  }

  /* ── LOGO TEKS UTAMA ── */
  .nb__logo-main {
    font-size: 2rem;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: 0.02em;
    color: #ffffff;
    -webkit-text-stroke: 0.5px #ffffff;
    text-shadow:
      0 0 24px rgba(147,197,253,0.6),
      0 2px 8px rgba(0,0,0,0.5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  /* ── LOGO SUBTEKS ── */
  .nb__logo-sub {
    font-size: 1rem;
    color: rgba(255,255,255,0.95);
    font-weight: 700;
    -webkit-text-stroke: 0.3px rgba(255,255,255,0.9);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  /* ── DESKTOP NAV ── */
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
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255,255,255,0.82);
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
    outline: none;
    position: relative;
  }

  .nb__link:hover {
    color: white;
    background: rgba(255,255,255,0.12);
  }

  /* ── DROPDOWN ── */
  .nb__dd {
    position: relative;
  }

  .nb__dd-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255,255,255,0.82);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
    outline: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .nb__dd-btn:hover,
  .nb__dd-btn[aria-expanded="true"] {
    color: white;
    background: rgba(255,255,255,0.12);
  }

  .nb__chevron {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4.5px solid currentColor;
    opacity: 0.65;
    transition: transform 0.22s ease;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .nb__dd-btn[aria-expanded="true"] .nb__chevron {
    transform: rotate(180deg);
    opacity: 1;
  }

  /* ── DROPDOWN PANEL ── */
  .nb__panel {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 200px;
    background: #0d2260;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 6px;
    box-shadow: 0 16px 40px rgba(5,15,50,0.55), 0 4px 12px rgba(0,0,0,0.3);
    animation: panelFade 0.17s ease both;
    z-index: 100;
  }

  .nb__panel--jurusan {
    min-width: 260px;
    padding: 12px;
  }

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
    color: rgba(255,255,255,0.78);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .nb__panel-item:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  .nb__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .nb__panel-item:hover .nb__dot {
    background: #60a5fa;
  }

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
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.8);
    font-size: 0.78rem;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.03em;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .nb__jurusan-chip:hover {
    background: rgba(37,99,235,0.5);
    border-color: rgba(96,165,250,0.4);
    color: white;
  }

  /* ── LOGIN BUTTON ── */
  .nb__login {
    margin-left: 8px;
    padding: 0.5rem 1.1rem;
    border-radius: 8px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    white-space: nowrap;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .nb__login:hover {
    background: rgba(255,255,255,0.24);
    border-color: rgba(255,255,255,0.35);
    transform: translateY(-1px);
  }

  /* ── HAMBURGER: flex-shrink: 0 agar tidak pernah kepotong ── */
  .nb__ham {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: background 0.2s ease, border-color 0.2s ease;
    outline: none;
    flex-shrink: 0;     /* tidak boleh menyusut sama sekali */
    margin-left: auto;  /* dorong ke kanan */
  }

  .nb__ham:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.25);
  }

  .nb__ham-line {
    width: 22px;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
    transform-origin: center;
  }

  /* ── MOBILE OVERLAY ── */
  .nb__overlay {
    position: fixed;
    inset: 0;
    top: 82px;
    background: rgba(5, 18, 55, 0.6);
    backdrop-filter: blur(4px);
    z-index: 999;
    animation: fadeIn 0.2s ease;
  }

  /* ── MOBILE MENU ── */
  .nb__mobile {
    position: fixed;
    top: 82px;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #0d2260;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 8px 12px 20px;
    max-height: calc(100dvh - 82px);
    overflow-y: auto;
    animation: slideDown 0.28s cubic-bezier(0.16,1,0.3,1) both;
  }

  .nb__m-link {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255,255,255,0.82);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }

  .nb__m-link:hover {
    background: rgba(255,255,255,0.08);
    color: white;
  }

  .nb__m-acc-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255,255,255,0.82);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: background 0.15s, color 0.15s;
  }

  .nb__m-acc-btn:hover,
  .nb__m-acc-btn[aria-expanded="true"] {
    background: rgba(255,255,255,0.08);
    color: white;
  }

  .nb__m-acc-btn[aria-expanded="true"] .nb__chevron {
    transform: rotate(180deg);
    opacity: 1;
  }

  .nb__m-sub {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 2px 0 4px 14px;
    padding-left: 14px;
    border-left: 2px solid rgba(96,165,250,0.3);
  }

  .nb__m-sub-link {
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }

  .nb__m-sub-link:hover {
    background: rgba(255,255,255,0.07);
    color: white;
  }

  .nb__m-jurusan-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    margin: 6px 14px 10px;
    padding: 12px;
    background: rgba(255,255,255,0.04);
    border-radius: 10px;
  }

  .nb__m-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 6px;
    border-radius: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.8);
    font-size: 0.75rem;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    letter-spacing: 0.02em;
  }

  .nb__m-chip:hover {
    background: rgba(37,99,235,0.45);
    color: white;
  }

  .nb__divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 6px 14px;
  }

  .nb__m-login {
    display: block;
    margin: 10px 14px 0;
    padding: 13px 16px;
    border-radius: 10px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    transition: background 0.2s;
  }

  .nb__m-login:hover {
    background: rgba(255,255,255,0.2);
  }

  @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 400px) {
    .nb__inner        { padding: 0 0.75rem; }
    .nb__bar          { height: 66px; gap: 0.5rem; }
    .nb__logo         { gap: 8px; }
    .nb__school-logo  { width: 42px; height: 42px; border-radius: 10px; }
    .nb__logo-main    { font-size: 0.82rem; -webkit-text-stroke: 0.3px #ffffff; }
    .nb__logo-sub     { display: none; }
    .nb__overlay,
    .nb__mobile       { top: 66px; max-height: calc(100dvh - 66px); }
  }

  @media (min-width: 401px) and (max-width: 540px) {
    .nb__inner        { padding: 0 1rem; }
    .nb__bar          { height: 70px; gap: 0.75rem; }
    .nb__logo         { gap: 10px; }
    .nb__school-logo  { width: 48px; height: 48px; }
    .nb__logo-main    { font-size: 0.95rem; -webkit-text-stroke: 0.35px #ffffff; }
    .nb__logo-sub     { font-size: 0.62rem; letter-spacing: 0.08em; }
    .nb__overlay,
    .nb__mobile       { top: 70px; max-height: calc(100dvh - 70px); }
  }

  @media (min-width: 541px) and (max-width: 767px) {
    .nb__inner        { padding: 0 1.25rem; }
    .nb__bar          { height: 74px; gap: 1rem; }
    .nb__logo         { gap: 12px; }
    .nb__school-logo  { width: 56px; height: 56px; }
    .nb__logo-main    { font-size: 1.2rem; -webkit-text-stroke: 0.4px #ffffff; }
    .nb__logo-sub     { font-size: 0.72rem; letter-spacing: 0.1em; }
    .nb__overlay,
    .nb__mobile       { top: 74px; max-height: calc(100dvh - 74px); }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .nb__inner        { padding: 0 1.25rem; }
    .nb__logo         { gap: 14px; }
    .nb__school-logo  { width: 60px; height: 60px; }
    .nb__logo-main    { font-size: 1.5rem; -webkit-text-stroke: 0.45px #ffffff; }
    .nb__logo-sub     { font-size: 0.82rem; }
    .nb__link,
    .nb__dd-btn       { padding: 0.45rem 0.7rem; font-size: 0.82rem; }
    .nb__login        { padding: 0.45rem 0.9rem; font-size: 0.82rem; }
  }
`}</style>

      <nav
        className={`nb${scrolled ? " nb--scrolled" : ""}`}
        aria-label="Navigasi utama"
      >
        <div className="nb__bg" aria-hidden="true" />
        <div className="nb__inner">
          <div className="nb__bar">
            {/* Logo */}
            <Link
              href="/home"
              className="nb__logo"
              aria-label="SMK Negeri 4 Semarang – Beranda"
            >
              <img
                src="./images/logosmk4.png"
                alt="Logo SMK Negeri 4 Semarang"
                className="nb__school-logo"
              />
              <div>
                <p className="nb__logo-main">SMK NEGERI 4 SEMARANG</p>
                <p className="nb__logo-sub">Semarang · Jawa Tengah</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="nb__desktop" role="menubar">
              <Link href="/home" className="nb__link" role="menuitem">
                Home
              </Link>

              <div
                className="nb__dd"
                onMouseEnter={() => handleDropdownEnter("kurikulum")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="nb__dd-btn"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "kurikulum"}
                  onClick={() =>
                    setActiveDropdown((prev) =>
                      prev === "kurikulum" ? null : "kurikulum",
                    )
                  }
                >
                  Kurikulum
                  <span className="nb__chevron" aria-hidden="true" />
                </button>
                {activeDropdown === "kurikulum" && (
                  <div className="nb__panel" role="menu">
                    <Link
                      href="/kurikulum/profil"
                      className="nb__panel-item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="nb__dot" /> Profil Kurikulum
                    </Link>
                    <Link
                      href="/kurikulum/struktur"
                      className="nb__panel-item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="nb__dot" /> Struktur Kurikulum
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="nb__dd"
                onMouseEnter={() => handleDropdownEnter("jurusan")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="nb__dd-btn"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "jurusan"}
                  onClick={() =>
                    setActiveDropdown((prev) =>
                      prev === "jurusan" ? null : "jurusan",
                    )
                  }
                >
                  Jurusan
                  <span className="nb__chevron" aria-hidden="true" />
                </button>
                {activeDropdown === "jurusan" && (
                  <div className="nb__panel nb__panel--jurusan" role="menu">
                    <div className="nb__jurusan-grid">
                      {jurusan.map((j) => (
                        <Link
                          key={j}
                          href={`/jurusan/${j.toLowerCase()}`}
                          className="nb__jurusan-chip"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {j}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/bahan-ajar" className="nb__link">
                Bahan Ajar
              </Link>
              <Link href="/evaluasi" className="nb__link">
                Evaluasi
              </Link>
              <Link href="/ict" className="nb__link">
                ICT
              </Link>

              <Link href="/login" className="nb__login">
                Login Admin
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="nb__ham"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div
                className="nb__ham-line"
                style={
                  isOpen ? { transform: "rotate(45deg) translate(0, 7px)" } : {}
                }
              />
              <div
                className="nb__ham-line"
                style={isOpen ? { opacity: 0, transform: "scaleX(0)" } : {}}
              />
              <div
                className="nb__ham-line"
                style={
                  isOpen
                    ? { transform: "rotate(-45deg) translate(0, -7px)" }
                    : {}
                }
              />
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div className="nb__overlay" aria-hidden="true" onClick={closeAll} />
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="nb__mobile" id="mobile-menu" role="navigation">
            <Link href="/home" onClick={closeAll} className="nb__m-link">
              Home
            </Link>

            <div className="nb__divider" />

            <button
              onClick={() => toggleSub("kurikulum")}
              className="nb__m-acc-btn"
              aria-expanded={openSub === "kurikulum"}
            >
              Kurikulum
              <span className="nb__chevron" />
            </button>
            {openSub === "kurikulum" && (
              <div className="nb__m-sub">
                <Link
                  href="/kurikulum/profil"
                  onClick={closeAll}
                  className="nb__m-sub-link"
                >
                  Profil Kurikulum
                </Link>
                <Link
                  href="/kurikulum/struktur"
                  onClick={closeAll}
                  className="nb__m-sub-link"
                >
                  Struktur Kurikulum
                </Link>
              </div>
            )}

            <button
              onClick={() => toggleSub("jurusan")}
              className="nb__m-acc-btn"
              aria-expanded={openSub === "jurusan"}
            >
              Jurusan
              <span className="nb__chevron" />
            </button>
            {openSub === "jurusan" && (
              <div className="nb__m-jurusan-grid">
                {jurusan.map((j) => (
                  <Link
                    key={j}
                    href={`/jurusan/${j.toLowerCase()}`}
                    onClick={closeAll}
                    className="nb__m-chip"
                  >
                    {j}
                  </Link>
                ))}
              </div>
            )}

            <div className="nb__divider" />

            <Link href="/bahan-ajar" onClick={closeAll} className="nb__m-link">
              Bahan Ajar
            </Link>
            <Link href="/evaluasi" onClick={closeAll} className="nb__m-link">
              Evaluasi
            </Link>
            <Link href="/ict" onClick={closeAll} className="nb__m-link">
              ICT
            </Link>

            <Link href="/login" onClick={closeAll} className="nb__m-login">
              Login Admin
            </Link>
          </div>
        )}
      </nav>
      {/* ── FOOTER ── */}
      <footer style={{
        background: 'linear-gradient(110deg, #0a1f5c 0%, #1140a0 55%, #1a55c8 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '1.25rem 2rem',
        textAlign: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.82rem',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.03em',
        }}>
          Handmade with{' '}
          <span style={{ color: '#f87171', fontSize: '0.9rem' }}>♥</span>
          {' '}by{' '}
          {['Lathifa', 'Key', 'Lala', 'Ikhfina'].map((name, i, arr) => (
            <span key={name}>
              <span style={{
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 700,
              }}>
                {name}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.35)', margin: '0 4px' }}>·</span>
              )}
            </span>
          ))}
        </p>
      </footer>
    </>
    
  );
}
