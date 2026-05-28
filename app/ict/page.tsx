export default function ICT() {
  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">ICT</h1>
        <p className="text-center text-gray-600 mb-12">
          Information and Communication Technology - SMK 4 Semarang
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LMS Siswa */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">🚀 LMS Siswa</h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                Akses materi pembelajaran, tugas, kuis, dan nilai secara online.
                Platform Learning Management System untuk seluruh siswa SMK 4 Semarang.
              </p>
            </div>

            <a
              href="https://lms.smk4semarang.sch.id" 
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-blue-700 text-center font-semibold py-3.5 px-6 rounded-2xl hover:bg-blue-50 transition-all text-lg mt-4"
            >
              Masuk ke LMS Siswa →
            </a>
          </div>

          {/* Informasi Lainnya */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Fasilitas ICT</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-medium text-lg">Laboratorium Komputer</h3>
                <p className="text-gray-600 mt-1">
                  Tersedia 3 lab komputer dengan total 90 unit PC dan 1 lab multimedia.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-medium text-lg">Jaringan & Internet</h3>
                <p className="text-gray-600 mt-1">
                  Akses internet fiber optic untuk mendukung pembelajaran daring.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-medium text-lg">Program Unggulan</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Web Development</li>
                  <li>Networking & Cybersecurity</li>
                  <li>Digital Content Creation</li>
                  <li>Programming (Python, JavaScript)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Tambahan */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Butuh bantuan akses LMS? Hubungi Tim ICT SMK 4 Semarang
          </p>
        </div>
      </div>
    </main>
  );
}