'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface HomeContent {
  hero_title: string;
  hero_subtitle: string;
  hero_bg_url: string;
  sambutan_kutipan: string;
  sambutan_nama: string;
  sambutan_jabatan: string;
  visi: string;
  misi: string[];
  stats: { value: string; label: string }[];
  kepsek_photo_url: string;
  kepsek_photo_caption: string;
}

const DEFAULT: HomeContent = {
  hero_title: 'SMK 4 Semarang',
  hero_subtitle: 'Sekolah vokasi unggulan berbasis industri yang mencetak generasi kompeten dan berkarakter.',
  
  // Banner utama (diambil dari tema SMKN 4 Semarang)
  hero_bg_url: 'https://images.unsplash.com/photo-1594737625785-6c2e9d3b8f3e?q=80&w=2070&fit=crop',
  
  sambutan_kutipan: 'Kami berkomitmen untuk mencetak generasi muda yang kompeten, kreatif, dan siap memasuki dunia industri melalui pendidikan vokasi yang berkualitas.',
  sambutan_nama: 'Drs. Ahmad Santoso, M.Pd.',
  sambutan_jabatan: 'Kepala Sekolah SMK 4 Semarang',
  visi: 'Menjadi sekolah menengah kejuruan yang unggul dalam menghasilkan lulusan kompeten, berakhlak mulia, dan siap bersaing di era industri 4.0.',
  misi: [
    'Menyelenggarakan pendidikan vokasi yang relevan dengan kebutuhan industri',
    'Mengembangkan potensi siswa melalui pembelajaran berbasis proyek',
    'Membangun kerjasama yang kuat dengan dunia usaha dan industri',
    'Menanamkan nilai-nilai karakter dan etos kerja yang tinggi',
  ],
  stats: [
    { value: '1.250+', label: 'Siswa Aktif' },
    { value: '92', label: 'Guru & Tendik' },
    { value: '7', label: 'Program Keahlian' },
    { value: '52', label: 'Mitra Industri' },
  ],
  kepsek_photo_url: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800',
  kepsek_photo_caption: 'Kepala Sekolah SMK 4 Semarang',
};

export default function Home() {
  const [c, setC] = useState<HomeContent>(DEFAULT);

  useEffect(() => {
    supabase
      .from('home_content')
      .select('*')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setC(data as HomeContent);
      });
  }, []);

  return (
    <main className="min-h-screen font-sans">
      {/* ── Hero Section ── */}
      <section
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('${c.hero_bg_url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-blue-300 mb-4 font-medium">
            SMK NEGERI 4 SEMARANG
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-none mb-6 tracking-tighter">
            UKIR PRESTASI<br />
            <span className="text-blue-400">TIADA HENTI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {c.hero_subtitle}
          </p>

          <a
            href="#sambutan"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 transition-all px-8 py-4 rounded-full font-semibold text-base tracking-wide shadow-lg"
          >
            Kenali Kami Lebih Dekat ↓
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── Sambutan Kepala Sekolah (Foto + Kutipan Menyatu) ── */}
      <section id="sambutan" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* Foto Kepala Sekolah */}
            <div className="md:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={c.kepsek_photo_url}
                  alt={c.kepsek_photo_caption}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3" />
              </div>
            </div>

            {/* Sambutan */}
            <div className="md:col-span-7">
              <p className="text-xs tracking-[0.3em] uppercase text-blue-500 font-semibold mb-3">
                Sambutan Kepala Sekolah
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Assalamu'alaikum Wr. Wb.
              </h2>
              
              <blockquote className="text-lg md:text-xl text-gray-600 leading-relaxed italic">
                "{c.sambutan_kutipan}"
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {c.sambutan_nama.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{c.sambutan_nama}</p>
                  <p className="text-sm text-gray-500">{c.sambutan_jabatan}</p>
                </div>
              </div>

              <p className="mt-8 text-gray-500 text-sm">
                Wassalamu'alaikum Wr. Wb.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-blue-500 font-semibold mb-3 text-center">
            Arah Sekolah
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">
            Visi &amp; Misi
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-600 text-white rounded-2xl p-8">
              <h3 className="text-xs tracking-[0.25em] uppercase font-semibold text-blue-200 mb-4">
                Visi
              </h3>
              <p className="text-lg leading-relaxed font-medium">{c.visi}</p>
            </div>
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
              <h3 className="text-xs tracking-[0.25em] uppercase font-semibold text-blue-500 mb-4">
                Misi
              </h3>
              <ul className="space-y-3">
                {c.misi.map((m, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                    <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-blue-50 text-blue-600 text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statistik ── */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-blue-400 font-semibold mb-3">
            Fakta &amp; Angka
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">Sekolah Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl py-8 px-4">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}