'use client';

import Link from 'next/link';
import { useState } from 'react';

const jurusan = ['DPIB', 'TPM', 'TKR', 'TITL', 'TEI', 'DKV', 'ANS'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (menu: string) =>
    setOpenSub(openSub === menu ? null : menu);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .navbar-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: linear-gradient(135deg, #0f2d6b 0%, #1a4fa8 60%, #1e5bbf 100%);
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 2px 20px rgba(15, 45, 107, 0.4);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .navbar-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
        }

        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: white;
        }

        .logo-badge {
          width: 42px;
          height: 42px;
          background: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
        }

        .logo-badge::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30,91,191,0.08) 0%, transparent 60%);
        }

        .logo-badge span {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #1a4fa8;
          position: relative;
          z-index: 1;
        }

        .logo-text-main {
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: white;
        }

        .logo-text-sub {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.55);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Desktop nav */
        .nav-desktop {
          display: none;
          align-items: center;
          gap: 0.25rem;
        }

        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .nav-hamburger { display: none !important; }
        }

        .nav-link {
          padding: 0.4rem 0.9rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: all 0.18s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255,255,255,0.12);
        }

        /* Dropdown wrapper */
        .nav-dropdown {
          position: relative;
        }

        .nav-dropdown-btn {
          padding: 0.4rem 0.9rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.18s;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .nav-dropdown-btn:hover {
          color: white;
          background: rgba(255,255,255,0.12);
        }

        .chevron {
          font-size: 0.6rem;
          opacity: 0.7;
          transition: transform 0.2s;
        }

        .nav-dropdown:hover .chevron {
          transform: rotate(180deg);
        }

        .dropdown-panel {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          display: none;
          background: white;
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(15,45,107,0.18), 0 4px 16px rgba(0,0,0,0.08);
          padding: 8px;
          min-width: 200px;
          z-index: 100;
          border: 1px solid rgba(15,45,107,0.06);
          animation: dropIn 0.18s ease;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-dropdown:hover .dropdown-panel {
          display: block;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 9px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #1e3a6e;
          text-decoration: none;
          transition: all 0.15s;
        }

        .dropdown-item:hover {
          background: #eef4ff;
          color: #1a4fa8;
        }

        .dropdown-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1a4fa8;
          opacity: 0.3;
          flex-shrink: 0;
          transition: opacity 0.15s;
        }

        .dropdown-item:hover .dropdown-dot {
          opacity: 1;
        }

        /* Jurusan chips in dropdown */
        .jurusan-panel {
          min-width: 260px;
        }

        .jurusan-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          padding: 4px;
        }

        .jurusan-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 9px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #1e3a6e;
          text-decoration: none;
          transition: all 0.15s;
          background: #f8faff;
          letter-spacing: 0.03em;
          text-align: center;
        }

        .jurusan-chip:hover {
          background: #1a4fa8;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26,79,168,0.25);
        }

        /* Login button */
        .btn-login {
          margin-left: 0.5rem;
          padding: 0.45rem 1.1rem;
          background: white;
          color: #1a4fa8;
          border-radius: 9px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.18s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .btn-login:hover {
          background: #eef4ff;
          box-shadow: 0 4px 16px rgba(26,79,168,0.2);
          transform: translateY(-1px);
        }

        /* Hamburger */
        .nav-hamburger {
          padding: 8px;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          justify-content: center;
          align-items: center;
          transition: background 0.15s;
        }

        .nav-hamburger:hover { background: rgba(255,255,255,0.18); }

        .ham-line {
          width: 20px;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all 0.25s;
          transform-origin: center;
        }

        /* Mobile panel */
        .mobile-panel {
          background: #0f2d6b;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 16px 20px 20px;
        }

        .mobile-link {
          display: block;
          padding: 11px 14px;
          border-radius: 9px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: all 0.15s;
        }

        .mobile-link:hover {
          color: white;
          background: rgba(255,255,255,0.08);
        }

        .mobile-accordion-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          border-radius: 9px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
        }

        .mobile-accordion-btn:hover {
          color: white;
          background: rgba(255,255,255,0.08);
        }

        .mobile-sub {
          padding: 6px 0 6px 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mobile-sub-link {
          display: block;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: all 0.15s;
        }

        .mobile-sub-link:hover {
          color: white;
          background: rgba(255,255,255,0.06);
        }

        .mobile-jurusan-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          padding: 8px 14px;
        }

        .mobile-jurusan-chip {
          text-align: center;
          padding: 7px 4px;
          border-radius: 7px;
          font-size: 0.72rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.06);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: all 0.15s;
        }

        .mobile-jurusan-chip:hover {
          background: rgba(255,255,255,0.15);
          color: white;
        }

        .btn-login-mobile {
          display: block;
          margin-top: 10px;
          padding: 12px;
          background: white;
          color: #1a4fa8;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: all 0.15s;
        }

        .btn-login-mobile:hover {
          background: #eef4ff;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 6px 0;
        }
      `}</style>

      <nav className="navbar-root">
        <div className="nav-inner">
          <div className="nav-bar">

            {/* Logo */}
            <Link href="/home" className="nav-logo">
              <div className="logo-badge">
                <span>4</span>
              </div>
              <div>
                <p className="logo-text-main">SMKN 4 SEMARANG</p>
                <p className="logo-text-sub">Semarang · Jawa Tengah</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="nav-desktop">

              <Link href="/home" className="nav-link">Home</Link>

              {/* Dropdown Kurikulum */}
              <div className="nav-dropdown">
                <button className="nav-dropdown-btn">
                  Kurikulum <span className="chevron">▾</span>
                </button>
                <div className="dropdown-panel">
                  <Link href="/kurikulum/profil" className="dropdown-item">
                    <span className="dropdown-dot" />
                    Profil Kurikulum
                  </Link>
                  <Link href="/kurikulum/struktur" className="dropdown-item">
                    <span className="dropdown-dot" />
                    Struktur Kurikulum
                  </Link>
                </div>
              </div>

              {/* Dropdown Jurusan */}
              <div className="nav-dropdown">
                <button className="nav-dropdown-btn">
                  Jurusan <span className="chevron">▾</span>
                </button>
                <div className="dropdown-panel jurusan-panel">
                  <div className="jurusan-grid">
                    {jurusan.map((j) => (
                      <Link key={j} href={`/jurusan/${j.toLowerCase()}`} className="jurusan-chip">
                        {j}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/bahan-ajar" className="nav-link">Bahan Ajar</Link>
              <Link href="/evaluasi" className="nav-link">Evaluasi</Link>
              <Link href="/ict" className="nav-link">ICT</Link>

              <Link href="/login" className="btn-login">Login Admin</Link>
            </div>

            {/* Hamburger */}
            <button
              className="nav-hamburger md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="ham-line" style={isOpen ? { transform: 'rotate(45deg) translate(0, 6px)' } : {}} />
              <div className="ham-line" style={isOpen ? { opacity: 0 } : {}} />
              <div className="ham-line" style={isOpen ? { transform: 'rotate(-45deg) translate(0, -6px)' } : {}} />
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-panel">
            <Link href="/home" onClick={() => setIsOpen(false)} className="mobile-link">Home</Link>

            <div className="divider" />

            {/* Kurikulum mobile */}
            <div>
              <button onClick={() => toggleSub('kurikulum')} className="mobile-accordion-btn">
                Kurikulum
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{openSub === 'kurikulum' ? '▴' : '▾'}</span>
              </button>
              {openSub === 'kurikulum' && (
                <div className="mobile-sub">
                  <Link href="/kurikulum/profil" onClick={() => setIsOpen(false)} className="mobile-sub-link">
                    Profil Kurikulum
                  </Link>
                  <Link href="/kurikulum/struktur" onClick={() => setIsOpen(false)} className="mobile-sub-link">
                    Struktur Kurikulum
                  </Link>
                </div>
              )}
            </div>

            {/* Jurusan mobile */}
            <div>
              <button onClick={() => toggleSub('jurusan')} className="mobile-accordion-btn">
                Jurusan
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{openSub === 'jurusan' ? '▴' : '▾'}</span>
              </button>
              {openSub === 'jurusan' && (
                <div className="mobile-jurusan-grid">
                  {jurusan.map((j) => (
                    <Link
                      key={j}
                      href={`/jurusan/${j.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="mobile-jurusan-chip"
                    >
                      {j}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="divider" />

            <Link href="/bahan-ajar" onClick={() => setIsOpen(false)} className="mobile-link">Bahan Ajar</Link>
            <Link href="/evaluasi" onClick={() => setIsOpen(false)} className="mobile-link">Evaluasi</Link>
            <Link href="/ict" onClick={() => setIsOpen(false)} className="mobile-link">ICT</Link>

            <Link href="/login" onClick={() => setIsOpen(false)} className="btn-login-mobile">
              Login Admin
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}