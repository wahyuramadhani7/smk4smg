'use client';
import Navbar from '../../components/Navbar';

export default function GuruDashboard() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Dashboard Guru</h1>
          <p className="text-xl">Selamat datang! Anda hanya dapat melihat konten yang tersedia.</p>
        </div>
      </main>
    </>
  );
}