import Navbar from '../components/Navbar';

export default function Evaluasi() {
  return (
    <>
      <Navbar />
      <main className="pt-10 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-12">Evaluasi & Kalender Akademik</h1>

          <div className="bg-white shadow-lg rounded-2xl p-10">
            <h2 className="text-2xl font-semibold mb-8">Kalender Akademik Tahun 2025/2026</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-semibold text-lg">Semester 1 (Ganjil)</h3>
                <p className="text-gray-600">Juli 2025 - Desember 2025</p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-semibold text-lg">Ujian Tengah Semester</h3>
                <p className="text-gray-600">September & November 2025</p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-semibold text-lg">Semester 2 (Genap)</h3>
                <p className="text-gray-600">Januari 2026 - Juni 2026</p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-semibold text-lg">Magang Industri</h3>
                <p className="text-gray-600">Maret - Mei 2026</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500">Untuk detail kalender akademik lengkap, silakan hubungi bagian Kurikulum.</p>
          </div>
        </div>
      </main>
    </>
  );
}