'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface StrukturContent {
  struktur_kelas_x: string;
  struktur_kelas_xi: string;
  struktur_kelas_xii: string;
}

const DEFAULT: StrukturContent = {
  struktur_kelas_x: 'Dasar-dasar kejuruan + mata pelajaran umum + proyek sederhana.',
  struktur_kelas_xi: 'Pembelajaran inti jurusan + praktik di workshop + magang industri tahap awal.',
  struktur_kelas_xii: 'Spesialisasi keahlian + magang industri intensif + persiapan kerja.',
};

export default function StrukturKurikulum() {
  const [content, setContent] = useState<StrukturContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('kurikulum_content')
        .select('struktur_kelas_x, struktur_kelas_xi, struktur_kelas_xii')
        .limit(1)
        .single();

      if (data) {
        setContent({
          struktur_kelas_x: data.struktur_kelas_x || DEFAULT.struktur_kelas_x,
          struktur_kelas_xi: data.struktur_kelas_xi || DEFAULT.struktur_kelas_xi,
          struktur_kelas_xii: data.struktur_kelas_xii || DEFAULT.struktur_kelas_xii,
        });
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Memuat struktur kurikulum...</div>;
  }

  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">Struktur Kurikulum</h1>

        <div className="space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Kelas X (Semester 1-2)</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.struktur_kelas_x}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Kelas XI (Semester 3-4)</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.struktur_kelas_xi}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Kelas XII (Semester 5-6)</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.struktur_kelas_xii}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}