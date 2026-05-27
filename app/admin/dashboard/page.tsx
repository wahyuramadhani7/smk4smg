'use client';
import Navbar from '../../components/Navbar';

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
          <p className="text-xl">Selamat datang, Admin! Anda bisa mengelola konten website di sini.</p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">Tambah Materi</div>
            <div className="bg-white p-6 rounded-xl shadow">Edit Konten</div>
            <div className="bg-white p-6 rounded-xl shadow">Kelola User</div>
          </div>
        </div>
      </main>
    </>
  );
}