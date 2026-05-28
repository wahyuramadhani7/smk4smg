export default function BahanAjar() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Bahan Ajar</h1>
        <p className="text-center text-gray-600 mb-12">
          Kumpulan dokumen pendukung pembelajaran SMK 4 Semarang
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Daftar Hadir */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              📋 Daftar Hadir
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Dokumen daftar hadir siswa untuk setiap mata pelajaran dan kelas. 
              Memudahkan guru dalam mencatat kehadiran secara rutin.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Daftar Hadir Kelas X</p>
                    <p className="text-sm text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Daftar Hadir Kelas XI</p>
                    <p className="text-sm text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Daftar Hadir Kelas XII</p>
                    <p className="text-sm text-gray-500">Semester 1 &amp; 2</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Lembar Penilaian */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              📊 Lembar Penilaian
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Kumpulan lembar penilaian, rubrik, dan format penilaian harian, 
              tengah semester, serta akhir semester.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Lembar Penilaian Harian</p>
                    <p className="text-sm text-gray-500">Teori &amp; Praktik</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Rubrik Penilaian Proyek</p>
                    <p className="text-sm text-gray-500">Jurusan Teknik &amp; Desain</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Format Penilaian Sikap</p>
                    <p className="text-sm text-gray-500">Afektif dan Psikomotorik</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <div>
                    <p className="font-medium">Rekap Nilai Semester</p>
                    <p className="text-sm text-gray-500">Semua Jurusan</p>
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