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
    <nav className="bg-blue-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-xl">
              4
            </div>

            <div>
              <p className="font-bold text-lg leading-tight">SMK 4 SMG</p>
              <p className="text-xs text-blue-200">Semarang</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">

            <Link
              href="/home"
              className="hover:text-blue-200 transition-colors"
            >
              Home
            </Link>

            {/* Dropdown Kurikulum */}
            <div className="relative group">
              <button className="hover:text-blue-200 transition-colors flex items-center gap-1">
                Kurikulum <span className="text-xs">▾</span>
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-xl rounded-lg mt-2 py-2 w-52 z-50">
                <Link
                  href="/kurikulum/profil"
                  className="block px-5 py-2.5 text-sm hover:bg-gray-50"
                >
                  Profil Kurikulum
                </Link>

                <Link
                  href="/kurikulum/struktur"
                  className="block px-5 py-2.5 text-sm hover:bg-gray-50"
                >
                  Struktur Kurikulum
                </Link>
              </div>
            </div>

            {/* Dropdown Jurusan */}
            <div className="relative group">
              <button className="hover:text-blue-200 transition-colors flex items-center gap-1">
                Jurusan <span className="text-xs">▾</span>
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block bg-white text-gray-800 shadow-xl rounded-lg mt-2 py-2 w-40 z-50">
                {jurusan.map((j) => (
                  <Link
                    key={j}
                    href={`/jurusan/${j.toLowerCase()}`}
                    className="block px-5 py-2.5 text-sm hover:bg-gray-50"
                  >
                    {j}
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Baru: Bahan Ajar */}
            <Link
              href="/bahan-ajar"
              className="hover:text-blue-200 transition-colors"
            >
              Bahan Ajar
            </Link>

            <Link
              href="/evaluasi"
              className="hover:text-blue-200 transition-colors"
            >
              Evaluasi
            </Link>

            {/* Menu Baru: ICT */}
            <Link
              href="/ict"
              className="hover:text-blue-200 transition-colors"
            >
              ICT
            </Link>

            <Link
              href="/login"
              className="bg-white text-blue-800 px-5 py-2 rounded-md font-semibold hover:bg-blue-100 transition-colors"
            >
              Login Admin
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div
              className="w-5 h-0.5 bg-white mb-1 transition-all"
              style={
                isOpen
                  ? { transform: 'rotate(45deg) translate(3px,6px)' }
                  : {}
              }
            />

            <div
              className="w-5 h-0.5 bg-white mb-1 transition-all"
              style={isOpen ? { opacity: 0 } : {}}
            />

            <div
              className="w-5 h-0.5 bg-white transition-all"
              style={
                isOpen
                  ? { transform: 'rotate(-45deg) translate(3px,-6px)' }
                  : {}
              }
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-700 px-6 py-4 space-y-1">

          <Link
            href="/home"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-sm hover:text-blue-200"
          >
            Home
          </Link>

          {/* Kurikulum mobile */}
          <div>
            <button
              onClick={() => toggleSub('kurikulum')}
              className="flex items-center justify-between w-full py-2.5 text-sm hover:text-blue-200"
            >
              Kurikulum
              <span>{openSub === 'kurikulum' ? '▴' : '▾'}</span>
            </button>

            {openSub === 'kurikulum' && (
              <div className="pl-4 space-y-1 mt-1">
                <Link
                  href="/kurikulum/profil"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm text-blue-200 hover:text-white"
                >
                  Profil Kurikulum
                </Link>

                <Link
                  href="/kurikulum/struktur"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm text-blue-200 hover:text-white"
                >
                  Struktur Kurikulum
                </Link>
              </div>
            )}
          </div>

          {/* Jurusan mobile */}
          <div>
            <button
              onClick={() => toggleSub('jurusan')}
              className="flex items-center justify-between w-full py-2.5 text-sm hover:text-blue-200"
            >
              Jurusan
              <span>{openSub === 'jurusan' ? '▴' : '▾'}</span>
            </button>

            {openSub === 'jurusan' && (
              <div className="pl-4 space-y-1 mt-1">
                {jurusan.map((j) => (
                  <Link
                    key={j}
                    href={`/jurusan/${j.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm text-blue-200 hover:text-white"
                  >
                    {j}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bahan Ajar Mobile */}
          <Link
            href="/bahan-ajar"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-sm hover:text-blue-200"
          >
            Bahan Ajar
          </Link>

          <Link
            href="/evaluasi"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-sm hover:text-blue-200"
          >
            Evaluasi
          </Link>

          {/* ICT Mobile */}
          <Link
            href="/ict"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 text-sm hover:text-blue-200"
          >
            ICT
          </Link>

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block mt-3 bg-white text-blue-800 text-center px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-blue-100"
          >
            Login Admin
          </Link>
        </div>
      )}
    </nav>
  );
}