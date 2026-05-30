'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Jurusan {
  nama_lengkap: string;
  subtitle: string;
  profil_description: string;
  kompetensi: string[];
  icon: string;
  color: string;
}

export default function JurusanDPIB() {
  const [jurusan, setJurusan] = useState<Jurusan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase
      .from('jurusan_content')
      .select('*')
      .eq('kode', 'DPIB')
      .single();

    if (data) setJurusan(data);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Memuat data...</div>;
  if (!jurusan) return <div className="min-h-screen flex items-center justify-center text-xl">Data jurusan tidak ditemukan</div>;

  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{jurusan.icon}</div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: jurusan.color }}>
            {jurusan.nama_lengkap}
          </h1>
          <p className="text-gray-600 text-lg">{jurusan.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Profil Jurusan</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              {jurusan.profil_description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Kompetensi Lulusan</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
              {jurusan.kompetensi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}