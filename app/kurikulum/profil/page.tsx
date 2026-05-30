'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface KurikulumContent {
  profil_title: string;
  profil_description: string;
  tujuan_pembelajaran: string[];
  sistem_pembelajaran: string;
  dokumen_kurikulum_url: string;
}

const DEFAULT: KurikulumContent = {
  profil_title: 'Profil Kurikulum',
  profil_description: 'SMK 4 Semarang menerapkan Kurikulum Merdeka yang dirancang untuk menghasilkan lulusan yang kompeten sesuai kebutuhan industri saat ini.',
  tujuan_pembelajaran: [
    'Mengembangkan kompetensi teknis dan soft skills siswa',
    'Menyiapkan siswa siap kerja atau melanjutkan pendidikan tinggi',
    'Membangun karakter disiplin, kreatif, dan inovatif',
  ],
  sistem_pembelajaran: 'Berbasis Proyek Nyata (Project Based Learning) dengan pendekatan industri.',
  dokumen_kurikulum_url: '#',
};

export default function ProfilKurikulum() {
  const [content, setContent] = useState<KurikulumContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('kurikulum_content')
        .select('profil_title, profil_description, tujuan_pembelajaran, sistem_pembelajaran, dokumen_kurikulum_url')
        .limit(1)
        .single();

      if (data) {
        setContent({
          profil_title: data.profil_title || DEFAULT.profil_title,
          profil_description: data.profil_description || '',
          tujuan_pembelajaran: data.tujuan_pembelajaran || [],
          sistem_pembelajaran: data.sistem_pembelajaran || '',
          dokumen_kurikulum_url: data.dokumen_kurikulum_url || '#',
        });
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Memuat profil kurikulum...</div>;
  }

  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">{content.profil_title}</h1>
        
        <div className="prose max-w-none text-lg">
          <h2 className="text-2xl font-semibold mb-6">Kurikulum Merdeka di SMK 4 Semarang</h2>
          <p className="mb-8 text-gray-700 leading-relaxed">
            {content.profil_description}
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Tujuan Pembelajaran Vokasi</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            {content.tujuan_pembelajaran.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-10 mb-4">Sistem Pembelajaran</h3>
          <p className="text-gray-700 leading-relaxed">{content.sistem_pembelajaran}</p>

          <div className="mt-10 bg-gray-100 p-8 rounded-xl">
            <p className="font-medium mb-3">Link Dokumen Kurikulum:</p>
            <a 
              href={content.dokumen_kurikulum_url} 
              target="_blank"
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Download Kurikulum Merdeka SMK 4 Semarang (PDF)
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}