'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const jurusan = ['DPIB', 'TPM', 'TKR', 'TITL', 'TEI', 'DKV', 'ANS'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setOpenSub(null);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleSub = (menu: string) =>
    setOpenSub(prev => (prev === menu ? null : menu));

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

        /* ── Reset & Root ── */
        *, *::before, *::after { box-sizing: border-box; }

        .nb {
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }

        .nb--scrolled {
          box-shadow: 0 4px 30px rgba(10, 35, 90, 0.35);
        }

        /* ── Background gradient + pattern ── */
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

        /* ── Inner Container ── */
        .nb__inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .nb__bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 66px;
          gap: 1rem;
        }

        /* ── Logo ── */
        .nb__logo {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          color: white;
          flex-shrink: 0;
          outline: none;
        }

        .nb__logo:focus-visible .nb__logo-badge {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.6);
        }

        .nb__logo-badge {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.22);
          flex-shrink: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .nb__logo:hover .nb__logo-badge {
          transform: scale(1.07) rotate(-2deg);
          box-shadow: 0 6px 20px rgba(0,0,0,0.28);
        }

        .nb__logo-badge span {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1140a0;
          line-height: 1;
        }

        .nb__logo-main {
          font-size: 0.92rem;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: white;
        }

        .nb__logo-sub {
          font-size: 0.62rem;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 1px;
        }

        /* ── Desktop Nav ── */
        .nb__desktop {
          display: none;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: flex-end;
        }

        @media (min-width: 768px) {
          .nb__desktop { display: flex; }
          .nb__ham { display: none !important; }
        }

        /* ── Nav Link ── */
        .nb__link {
          padding: 0.42rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
          outline: none;
          position: relative;
        }

        .nb__link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: rgba(255,255,255,0.6);
          transition: transform 0.2s ease;
        }

        .nb__link:hover {
          color: white;
          background: rgba(255,255,255,0.11);
        }

        .nb__link:hover::after { transform: translateX(-50%) scaleX(1); }

        .nb__link:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: 2px;
        }

        /* ── Dropdown ── */
        .nb__dd {
          position: relative;
        }

        .nb__dd-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0.42rem 0.85rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
          outline: none;
        }

        .nb__dd-btn:hover,
        .nb__dd-btn[aria-expanded="true"] {
          color: white;
          background: rgba(255,255,255,0.13);
        }

        .nb__dd-btn:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: 2px;
          border-radius: 8px;
        }

        .nb__chevron {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid currentColor;
          opacity: 0.65;
          transition: transform 0.22s ease, opacity 0.15s;
          flex-shrink: 0;
        }

        .nb__dd-btn[aria-expanded="true"] .nb__chevron {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* ── Dropdown Panel ── */
        .nb__panel {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          background: white;
          border-radius: 14px;
          box-shadow: 0 24px 64px rgba(10,35,90,0.2), 0 4px 16px rgba(0,0,0,0.07);
          padding: 7px;
          min-width: 210px;
          z-index: 200;
          border: 1px solid rgba(10,35,90,0.07);

          /* Entry animation */
          animation: panelIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: top left;
        }

        @keyframes panelIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Arrow pointer */
        .nb__panel::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 20px;
          width: 12px;
          height: 12px;
          background: white;
          border-left: 1px solid rgba(10,35,90,0.07);
          border-top: 1px solid rgba(10,35,90,0.07);
          transform: rotate(45deg);
          border-radius: 2px 0 0 0;
        }

        .nb__panel-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 13px;
          border-radius: 9px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #1e3a6e;
          text-decoration: none;
          transition: background 0.15s, color 0.15s, transform 0.15s;
          outline: none;
        }

        .nb__panel-item:hover {
          background: #eef4ff;
          color: #1140a0;
          transform: translateX(2px);
        }

        .nb__panel-item:focus-visible {
          outline: 2px solid #1140a0;
          outline-offset: -2px;
          border-radius: 9px;
        }

        .nb__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1140a0;
          opacity: 0.25;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.15s;
        }

        .nb__panel-item:hover .nb__dot {
          opacity: 1;
          transform: scale(1.3);
        }

        /* ── Jurusan Panel ── */
        .nb__panel--jurusan { min-width: 270px; }

        .nb__jurusan-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          padding: 2px;
        }

        .nb__jurusan-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 8px;
          border-radius: 9px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1e3a6e;
          text-decoration: none;
          background: #f4f7ff;
          letter-spacing: 0.04em;
          transition: background 0.15s, color 0.15s, transform 0.18s, box-shadow 0.18s;
          outline: none;
        }

        .nb__jurusan-chip:hover {
          background: #1140a0;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(17,64,160,0.28);
        }

        .nb__jurusan-chip:focus-visible {
          outline: 2px solid #1140a0;
          outline-offset: 2px;
        }

        /* ── Login Button ── */
        .nb__login {
          margin-left: 6px;
          padding: 0.42rem 1.1rem;
          background: white;
          color: #1140a0;
          border-radius: 9px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.14);
          white-space: nowrap;
          outline: none;
          flex-shrink: 0;
        }

        .nb__login:hover {
          background: #eef4ff;
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(17,64,160,0.22);
        }

        .nb__login:active { transform: translateY(0); }

        .nb__login:focus-visible {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        /* ── Hamburger ── */
        .nb__ham {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: background 0.18s;
          flex-shrink: 0;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .nb__ham:hover { background: rgba(255,255,255,0.18); }

        .nb__ham:focus-visible {
          outline: 2px solid rgba(255,255,255,0.6);
          outline-offset: 2px;
        }

        .nb__ham-line {
          width: 19px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
          transform-origin: center;
        }

        /* ── Mobile Overlay ── */
        .nb__overlay {
          position: fixed;
          inset: 0;
          top: 66px;
          background: rgba(5, 18, 55, 0.55);
          backdrop-filter: blur(3px);
          z-index: 999;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ── Mobile Panel ── */
        .nb__mobile {
          position: fixed;
          top: 66px;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #0d2260;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 12px 16px 24px;
          max-height: calc(100dvh - 66px);
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          animation: slideDown 0.28s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nb__m-link {
          display: flex;
          align-items: center;
          padding: 11px 13px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .nb__m-link:hover { color: white; background: rgba(255,255,255,0.08); }

        .nb__m-link:focus-visible {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: -2px;
          border-radius: 10px;
        }

        .nb__m-acc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 13px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .nb__m-acc-btn:hover { color: white; background: rgba(255,255,255,0.08); }

        .nb__m-acc-btn[aria-expanded="true"] {
          color: white;
          background: rgba(255,255,255,0.08);
        }

        .nb__m-acc-btn:focus-visible {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: -2px;
          border-radius: 10px;
        }

        .nb__m-chevron {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid currentColor;
          opacity: 0.55;
          transition: transform 0.22s ease;
          flex-shrink: 0;
        }

        .nb__m-acc-btn[aria-expanded="true"] .nb__m-chevron {
          transform: rotate(180deg);
          opacity: 0.9;
        }

        .nb__m-sub {
          padding: 4px 0 4px 12px;
          display: flex;
          flex-direction: column;
          gap: 1px;
          animation: subIn 0.2s ease both;
        }

        @keyframes subIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nb__m-sub-link {
          display: block;
          padding: 9px 13px;
          border-radius: 9px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .nb__m-sub-link:hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.06); }

        .nb__m-jurusan-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          padding: 8px 13px 4px;
        }

        .nb__m-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 9px 4px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.07);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: background 0.15s, color 0.15s, transform 0.15s;
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .nb__m-chip:hover {
          background: rgba(255,255,255,0.16);
          color: white;
          transform: scale(1.04);
        }

        .nb__m-chip:focus-visible {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: 2px;
        }

        .nb__divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 7px 0;
        }

        .nb__m-login {
          display: block;
          margin-top: 12px;
          padding: 12px 16px;
          background: white;
          color: #1140a0;
          border-radius: 11px;
          font-size: 0.87rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          -webkit-tap-highlight-color: transparent;
          outline: none;
        }

        .nb__m-login:hover {
          background: #eef4ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(17,64,160,0.18);
        }

        .nb__m-login:focus-visible {
          outline: 2px solid #1140a0;
          outline-offset: 2px;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nb${scrolled ? ' nb--scrolled' : ''}`} aria-label="Navigasi utama">
        <div className="nb__bg" aria-hidden="true" />
        <div className="nb__inner">
          <div className="nb__bar">

            {/* Logo */}
            <Link href="/home" className="nb__logo" aria-label="SMK Negeri 4 Semarang – Beranda">
              <div className="nb__logo-badge" aria-hidden="true">
                <span>4</span>
              </div>
              <div>
                <p className="nb__logo-main">SMK NEGERI 4 SEMARANG</p>
                <p className="nb__logo-sub">Semarang · Jawa Tengah</p>
              </div>
            </Link>

            {/* ── Desktop Menu ── */}
            <div className="nb__desktop" role="menubar">

              <Link href="/home" className="nb__link" role="menuitem">Home</Link>

              {/* Kurikulum dropdown */}
              <div
                className="nb__dd"
                onMouseEnter={() => handleDropdownEnter('kurikulum')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="nb__dd-btn"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'kurikulum'}
                  onClick={() => setActiveDropdown(prev => prev === 'kurikulum' ? null : 'kurikulum')}
                >
                  Kurikulum
                  <span className="nb__chevron" aria-hidden="true" />
                </button>
                {activeDropdown === 'kurikulum' && (
                  <div className="nb__panel" role="menu" aria-label="Menu Kurikulum">
                    <Link href="/kurikulum/profil" className="nb__panel-item" role="menuitem" onClick={() => setActiveDropdown(null)}>
                      <span className="nb__dot" aria-hidden="true" />
                      Profil Kurikulum
                    </Link>
                    <Link href="/kurikulum/struktur" className="nb__panel-item" role="menuitem" onClick={() => setActiveDropdown(null)}>
                      <span className="nb__dot" aria-hidden="true" />
                      Struktur Kurikulum
                    </Link>
                  </div>
                )}
              </div>

              {/* Jurusan dropdown */}
              <div
                className="nb__dd"
                onMouseEnter={() => handleDropdownEnter('jurusan')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="nb__dd-btn"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'jurusan'}
                  onClick={() => setActiveDropdown(prev => prev === 'jurusan' ? null : 'jurusan')}
                >
                  Jurusan
                  <span className="nb__chevron" aria-hidden="true" />
                </button>
                {activeDropdown === 'jurusan' && (
                  <div className="nb__panel nb__panel--jurusan" role="menu" aria-label="Menu Jurusan">
                    <div className="nb__jurusan-grid">
                      {jurusan.map((j) => (
                        <Link
                          key={j}
                          href={`/jurusan/${j.toLowerCase()}`}
                          className="nb__jurusan-chip"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {j}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/bahan-ajar" className="nb__link" role="menuitem">Bahan Ajar</Link>
              <Link href="/evaluasi" className="nb__link" role="menuitem">Evaluasi</Link>
              <Link href="/ict" className="nb__link" role="menuitem">ICT</Link>

              <Link href="/login" className="nb__login">Login Admin</Link>
            </div>

            {/* Hamburger */}
            <button
              className="nb__ham"
              onClick={() => setIsOpen(prev => !prev)}
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div
                className="nb__ham-line"
                style={isOpen ? { transform: 'rotate(45deg) translate(0, 7px)' } : {}}
              />
              <div
                className="nb__ham-line"
                style={isOpen ? { opacity: 0, transform: 'scaleX(0)' } : {}}
              />
              <div
                className="nb__ham-line"
                style={isOpen ? { transform: 'rotate(-45deg) translate(0, -7px)' } : {}}
              />
            </button>

          </div>
        </div>

        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="nb__overlay"
            aria-hidden="true"
            onClick={closeAll}
          />
        )}

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div className="nb__mobile" id="mobile-menu" role="navigation" aria-label="Menu mobile">

            <Link href="/home" onClick={closeAll} className="nb__m-link">Home</Link>

            <div className="nb__divider" />

            {/* Kurikulum accordion */}
            <div>
              <button
                onClick={() => toggleSub('kurikulum')}
                className="nb__m-acc-btn"
                aria-expanded={openSub === 'kurikulum'}
                aria-controls="mobile-kurikulum"
              >
                Kurikulum
                <span className="nb__m-chevron" aria-hidden="true" />
              </button>
              {openSub === 'kurikulum' && (
                <div className="nb__m-sub" id="mobile-kurikulum">
                  <Link href="/kurikulum/profil" onClick={closeAll} className="nb__m-sub-link">
                    Profil Kurikulum
                  </Link>
                  <Link href="/kurikulum/struktur" onClick={closeAll} className="nb__m-sub-link">
                    Struktur Kurikulum
                  </Link>
                </div>
              )}
            </div>

            {/* Jurusan accordion */}
            <div>
              <button
                onClick={() => toggleSub('jurusan')}
                className="nb__m-acc-btn"
                aria-expanded={openSub === 'jurusan'}
                aria-controls="mobile-jurusan"
              >
                Jurusan
                <span className="nb__m-chevron" aria-hidden="true" />
              </button>
              {openSub === 'jurusan' && (
                <div className="nb__m-jurusan-grid" id="mobile-jurusan">
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
            </div>

            <div className="nb__divider" />

            <Link href="/bahan-ajar" onClick={closeAll} className="nb__m-link">Bahan Ajar</Link>
            <Link href="/evaluasi" onClick={closeAll} className="nb__m-link">Evaluasi</Link>
            <Link href="/ict" onClick={closeAll} className="nb__m-link">ICT</Link>

            <Link href="/login" onClick={closeAll} className="nb__m-login">
              Login Admin
            </Link>

          </div>
        )}
      </nav>
    </>
  );
}