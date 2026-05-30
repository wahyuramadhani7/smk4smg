'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EvaluasiContent {
  main_title: string;
  main_subtitle: string;
  ats_title: string;
  ats_description: string;
  ats_schedule: string;
  as_title: string;
  mapel_title: string;
  mapel_items: { name: string; subtitle: string }[];
  kejuruan_title: string;
  kejuruan_items: { name: string; subtitle: string }[];
  footer_text: string;
}

export default function Evaluasi() {
  const [content, setContent] = useState<EvaluasiContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('evaluasi_content')
        .select('*')
        .limit(1)
        .single();

      if (data) setContent(data as EvaluasiContent);
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) return <div className="py-20 text-center">Memuat halaman evaluasi...</div>;
  if (!content) return <div className="py-20 text-center">Data tidak ditemukan</div>;

  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">{content.main_title}</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {content.main_subtitle}
        </p>

        <div className="bg-white shadow-lg rounded-3xl p-10 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            Rencana Kegiatan Assesmen
          </h2>

          {/* ATS */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold flex items-center gap-3 mb-6">
              {content.ats_title}
            </h3>
            <p className="text-gray-600 mb-6">{content.ats_description}</p>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 whitespace-pre-line">
              <p className="font-medium text-blue-700">Dilaksanakan pada:</p>
              <p className="text-gray-700">{content.ats_schedule}</p>
            </div>
          </div>

          {/* AS - Assessment Sumatif */}
          <div>
            <h3 className="text-2xl font-semibold flex items-center gap-3 mb-8">
              {content.as_title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mapel */}
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h4 className="font-semibold text-xl mb-5 text-indigo-700">{content.mapel_title}</h4>
                <ul className="space-y-4">
                  {content.mapel_items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-indigo-600 mt-1.5">•</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kejuruan */}
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h4 className="font-semibold text-xl mb-5 text-emerald-700">{content.kejuruan_title}</h4>
                <ul className="space-y-4">
                  {content.kejuruan_items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-600 mt-1.5">•</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm whitespace-pre-line">
          {content.footer_text}
        </div>
      </div>
    </main>
  );
}