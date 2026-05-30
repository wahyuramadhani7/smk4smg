export default function ICT() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">ICT</h1>
        <p className="text-center text-gray-600 mb-16">
          Information and Communication Technology<br />
          SMK Negeri 4 Semarang
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* LMS SMKN 4 Semarang */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-8 shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                🚀
              </div>
              <h2 className="text-2xl font-semibold mb-3">LMS SMKN 4 Semarang</h2>
              <p className="text-blue-100 leading-relaxed">
                Platform pembelajaran daring untuk mengakses materi pelajaran, 
                tugas, kuis, dan diskusi antar siswa dan guru.
              </p>
            </div>
            
            <a
              href="https://lms.smk4semarang.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block bg-white text-blue-700 font-semibold text-center py-4 px-6 rounded-2xl hover:bg-blue-50 transition-all text-lg"
            >
              Akses LMS Siswa →
            </a>
          </div>

          {/* E-Raport */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-8 shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                📊
              </div>
              <h2 className="text-2xl font-semibold mb-3">E-Raport SMKN 4 Semarang</h2>
              <p className="text-emerald-100 leading-relaxed">
                Sistem rapor elektronik untuk melihat nilai, rapor semester, 
                dan rekapitulasi prestasi siswa secara online.
              </p>
            </div>
            
            <a
              href="https://erapor.smk4semarang.sch.id" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block bg-white text-emerald-700 font-semibold text-center py-4 px-6 rounded-2xl hover:bg-emerald-50 transition-all text-lg"
            >
              Akses E-Raport →
            </a>
          </div>

        </div>

        {/* Informasi Tambahan */}
        <div className="mt-16 text-center max-w-md mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-600 text-sm">
              Butuh bantuan login atau mengalami kendala teknis?<br />
              Silakan hubungi <span className="font-medium text-gray-800">Tim ICT SMK 4 Semarang</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}