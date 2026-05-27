import Navbar from '../../components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Banner Sekolah */}
      <section 
        className="h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            SELAMAT DATANG DI<br />SMK 4 SMG
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Sekolah Menengah Kejuruan Unggul Berbasis Industri di Semarang
          </p>
          <a 
            href="#sambutan" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg inline-block transition"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section id="sambutan" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10 text-gray-800">Sambutan Kepala Sekolah</h2>
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              Selamat datang di SMK 4 Semarang. Kami berkomitmen untuk mencetak generasi muda yang kompeten, 
              kreatif, dan siap memasuki dunia industri melalui pendidikan vokasi yang berkualitas.
            </p>
            <p className="font-semibold text-xl text-blue-800">Drs. Ahmad Santoso, M.Pd.<br />
              <span className="text-sm font-normal text-gray-500">Kepala Sekolah SMK 4 SMG</span>
            </p>
          </div>
        </div>
      </section>

      {/* Visi dan Misi */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Visi &amp; Misi</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-blue-800">Visi</h3>
              <p className="text-lg leading-relaxed">
                Menjadi sekolah menengah kejuruan yang unggul dalam menghasilkan lulusan yang kompeten, 
                berakhlak mulia, dan siap bersaing di era industri 4.0.
              </p>
            </div>

            <div className="bg-gray-50 p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Misi</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  Menyelenggarakan pendidikan vokasi yang relevan dengan kebutuhan industri
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  Mengembangkan potensi siswa melalui pembelajaran berbasis proyek
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  Membangun kerjasama yang kuat dengan dunia usaha dan industri
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  Menanamkan nilai-nilai karakter dan etos kerja yang tinggi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik Sekolah */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Sekolah Kami Dalam Angka</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold mb-2">1.250+</div>
              <div className="text-blue-200">Siswa Aktif</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">92</div>
              <div className="text-blue-200">Guru &amp; Tenaga Kependidikan</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">7</div>
              <div className="text-blue-200">Program Keahlian</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">52</div>
              <div className="text-blue-200">Mitra Industri</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}