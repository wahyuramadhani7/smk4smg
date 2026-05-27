'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-xl">4</div>
            <div>
              <h1 className="font-bold text-lg">SMK 4 SMG</h1>
              <p className="text-xs -mt-1 text-blue-200">Semarang</p>
            </div>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-200 transition-colors">Beranda</Link>
            
            <div className="relative group">
              <button className="hover:text-blue-200 transition-colors">Kurikulum</button>
              <div className="absolute hidden group-hover:block bg-white text-black shadow-xl rounded-md mt-2 py-3 w-60">
                <Link href="/kurikulum/profil" className="block px-6 py-2.5 hover:bg-gray-100">Profil Kurikulum</Link>
                <Link href="/kurikulum/struktur" className="block px-6 py-2.5 hover:bg-gray-100">Struktur Kurikulum</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-blue-200 transition-colors">Jurusan</button>
              <div className="absolute hidden group-hover:block bg-white text-black shadow-xl rounded-md mt-2 py-3 w-60">
                <Link href="/jurusan/dpib" className="block px-6 py-2.5 hover:bg-gray-100">DPIB</Link>
                <Link href="/jurusan/tpm" className="block px-6 py-2.5 hover:bg-gray-100">TPM</Link>
                <Link href="/jurusan/tkr" className="block px-6 py-2.5 hover:bg-gray-100">TKR</Link>
                <Link href="/jurusan/titl" className="block px-6 py-2.5 hover:bg-gray-100">TITL</Link>
                <Link href="/jurusan/tei" className="block px-6 py-2.5 hover:bg-gray-100">TEI</Link>
                <Link href="/jurusan/dkv" className="block px-6 py-2.5 hover:bg-gray-100">DKV</Link>
                <Link href="/jurusan/ans" className="block px-6 py-2.5 hover:bg-gray-100">ANS</Link>
              </div>
            </div>

            <Link href="/evaluasi" className="hover:text-blue-200 transition-colors">Evaluasi</Link>
            <Link href="/login" className="bg-white text-blue-800 px-6 py-2 rounded-md font-semibold hover:bg-blue-100 transition-colors">Login Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl" 
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}