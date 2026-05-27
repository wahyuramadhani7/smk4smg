const stats = [
  { value: "1.250+", label: "Siswa Aktif" },
  { value: "92", label: "Guru & Tendik" },
  { value: "7", label: "Program Keahlian" },
  { value: "52", label: "Mitra Industri" },
]

const misi = [
  "Menyelenggarakan pendidikan vokasi yang relevan dengan kebutuhan industri",
  "Mengembangkan potensi siswa melalui pembelajaran berbasis proyek",
  "Membangun kerjasama yang kuat dengan dunia usaha dan industri",
  "Menanamkan nilai-nilai karakter dan etos kerja yang tinggi",
]

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-blue-300 mb-4 font-medium">Semarang, Jawa Tengah</span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight">
            SMK 4 <span className="text-blue-400">Semarang</span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
            Sekolah vokasi unggulan berbasis industri yang mencetak generasi kompeten dan berkarakter.
          </p>
          <a href="#sambutan" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors px-7 py-3 rounded-full font-semibold text-sm tracking-wide">
            Pelajari Lebih Lanjut ↓
          </a>
        </div>
      </section>

      {/* Sambutan */}
      <section id="sambutan" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-blue-500 font-semibold mb-3">Sambutan</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Kepala Sekolah</h2>
          <blockquote className="text-lg md:text-xl text-gray-600 leading-relaxed italic border-l-4 border-blue-400 pl-6 text-left">
            "Kami berkomitmen untuk mencetak generasi muda yang kompeten, kreatif, dan siap memasuki dunia industri melalui pendidikan vokasi yang berkualitas."
          </blockquote>
          <div className="mt-8 flex items-center gap-3 justify-start pl-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">AS</div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 text-sm">Drs. Ahmad Santoso, M.Pd.</p>
              <p className="text-xs text-gray-400">Kepala Sekolah SMK 4 Semarang</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-blue-500 font-semibold mb-3 text-center">Arah Sekolah</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">Visi &amp; Misi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-600 text-white rounded-2xl p-8">
              <h3 className="text-xs tracking-[0.25em] uppercase font-semibold text-blue-200 mb-4">Visi</h3>
              <p className="text-lg leading-relaxed font-medium">
                Menjadi sekolah menengah kejuruan yang unggul dalam menghasilkan lulusan kompeten, berakhlak mulia, dan siap bersaing di era industri 4.0.
              </p>
            </div>
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
              <h3 className="text-xs tracking-[0.25em] uppercase font-semibold text-blue-500 mb-4">Misi</h3>
              <ul className="space-y-3">
                {misi.map((m, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-blue-400 font-semibold mb-3">Fakta &amp; Angka</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">Sekolah Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl py-8 px-4">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2">{s.value}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}