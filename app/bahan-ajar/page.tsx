export default function BahanAjar() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Bahan Ajar</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kumpulan dokumen pendukung pembelajaran SMK 4 Semarang
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Kalender Pendidikan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              📅 Kalender Pendidikan
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Jadwal resmi kegiatan sekolah, libur, ulangan, dan kegiatan ekstrakurikuler sepanjang tahun ajaran.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Kalender Pendidikan Tahun Ajaran 2025/2026</p>
                    <p className="text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Jadwal Pelajaran */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              ⏰ Jadwal Pelajaran
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Jadwal mengajar guru dan pembagian jam pelajaran per kelas dan jurusan.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Jadwal Pelajaran Guru</p>
                    <p className="text-gray-500">Semua Jurusan</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Jadwal Kelas X, XI, XII</p>
                    <p className="text-gray-500">Per Jurusan</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Daftar Hadir Siswa */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              📋 Daftar Hadir Siswa
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Format daftar hadir siswa yang siap digunakan oleh guru setiap pertemuan.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Daftar Hadir Kelas X</p>
                    <p className="text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Daftar Hadir Kelas XI</p>
                    <p className="text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Daftar Hadir Kelas XII</p>
                    <p className="text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Daftar Nilai Siswa */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              📊 Daftar Nilai Siswa
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Format rekapitulasi nilai siswa untuk penilaian harian, tengah semester, dan akhir semester.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Rekap Nilai Harian</p>
                    <p className="text-gray-500">Teori &amp; Praktik</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Rekap Nilai Semester</p>
                    <p className="text-gray-500">Semua Kelas &amp; Jurusan</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ATP */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              📋 ATP (Analisis Tujuan Pembelajaran)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Analisis tujuan pembelajaran sesuai Kurikulum Merdeka untuk setiap mata pelajaran.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">ATP Semester 1</p>
                    <p className="text-gray-500">Semua Mata Pelajaran</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">ATP Semester 2</p>
                    <p className="text-gray-500">Semua Mata Pelajaran</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* RPM */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              📝 RPM (Rencana Pelaksanaan Pembelajaran)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Rencana Pelaksanaan Pembelajaran (RPP/RPM) yang siap digunakan guru.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">RPM Semester 1</p>
                    <p className="text-gray-500">Semua Jurusan</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">RPM Semester 2</p>
                    <p className="text-gray-500">Semua Jurusan</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}