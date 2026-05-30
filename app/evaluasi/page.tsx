export default function Evaluasi() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Evaluasi & Assesmen
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Rencana Kegiatan Asesmen SMK 4 Semarang Tahun Ajaran 2025/2026
        </p>

        <div className="bg-white shadow-lg rounded-3xl p-10 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            Rencana Kegiatan Assesmen
          </h2>

          {/* ATS */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold flex items-center gap-3 mb-6">
              📍 ATS - Assessment Tengah Semester
            </h3>
            <p className="text-gray-600 mb-6">
              Penilaian tengah semester untuk memantau perkembangan siswa secara berkala.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <p className="font-medium text-blue-700">Dilaksanakan pada:</p>
              <p className="text-gray-700">September & November 2025 (Semester 1)</p>
              <p className="text-gray-700">Maret & Mei 2026 (Semester 2)</p>
            </div>
          </div>

          {/* AS - Assessment Sumatif */}
          <div>
            <h3 className="text-2xl font-semibold flex items-center gap-3 mb-8">
              📊 AS - Assessment Sumatif
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mapel */}
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h4 className="font-semibold text-xl mb-5 text-indigo-700">Mata Pelajaran (Mapel)</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">ASAS - Assessment Sumatif Akhir Semester</p>
                      <p className="text-sm text-gray-500">Akhir Semester 1 & 2</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">ASAT - Assessment Sumatif Akhir Tahun</p>
                      <p className="text-sm text-gray-500">Juni 2026</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-indigo-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">ASAJ - Assessment Sumatif Akhir Jenjang</p>
                      <p className="text-sm text-gray-500">Kelas XII</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Kejuruan */}
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h4 className="font-semibold text-xl mb-5 text-emerald-700">Kejuruan / Kompetensi Keahlian</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">Presentasi Proyek Akhir</p>
                      <p className="text-sm text-gray-500">Semester 2</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">TKA - Tes Kompetensi Akademik</p>
                      <p className="text-sm text-gray-500">Semester 1 & 2</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">UKK - Ujian Kompetensi Keahlian</p>
                      <p className="text-sm text-gray-500">Kelas XII</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-600 mt-1.5">•</span>
                    <div>
                      <p className="font-medium">ANBK - Assessment Nasional Berbasis Komputer</p>
                      <p className="text-sm text-gray-500">Sesuai jadwal nasional</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Jadwal pelaksanaan asesmen dapat berubah sesuai kebijakan sekolah dan pemerintah.</p>
          <p className="mt-2">Untuk dokumen lengkap dan jadwal detail, silakan hubungi Tim Kurikulum atau Wakil Kepala Sekolah Bidang Kurikulum.</p>
        </div>
      </div>
    </main>
  );
}