export default function StrukturKurikulum() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Struktur Kurikulum</h1>

        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Kelas X (Semester 1-2)</h2>
            <p className="text-lg">Dasar-dasar kejuruan + mata pelajaran umum + proyek sederhana.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Kelas XI (Semester 3-4)</h2>
            <p className="text-lg">Pembelajaran inti jurusan + praktik di workshop + magang industri tahap awal.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Kelas XII (Semester 5-6)</h2>
            <p className="text-lg">Spesialisasi keahlian + magang industri intensif + persiapan kerja.</p>
          </div>
        </div>
      </div>
    </main>
  );
}