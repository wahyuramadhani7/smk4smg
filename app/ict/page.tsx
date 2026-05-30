'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ICTContent {
  main_title: string;
  main_subtitle: string;
  lms_title: string;
  lms_description: string;
  lms_icon: string;
  lms_url: string;
  eraport_title: string;
  eraport_description: string;
  eraport_icon: string;
  eraport_url: string;
  footer_note: string;
}

const DEFAULT: ICTContent = {
  main_title: "ICT",
  main_subtitle: "Information and Communication Technology\nSMK Negeri 4 Semarang",
  lms_title: "LMS SMKN 4 Semarang",
  lms_description: "Platform pembelajaran daring untuk mengakses materi pelajaran, tugas, kuis, dan diskusi antar siswa dan guru.",
  lms_icon: "🚀",
  lms_url: "https://lms.smk4semarang.sch.id",
  eraport_title: "E-Raport SMKN 4 Semarang",
  eraport_description: "Sistem rapor elektronik untuk melihat nilai, rapor semester, dan rekapitulasi prestasi siswa secara online.",
  eraport_icon: "📊",
  eraport_url: "https://erapor.smk4semarang.sch.id",
  footer_note: "Butuh bantuan login atau mengalami kendala teknis?\nSilakan hubungi Tim ICT SMK 4 Semarang",
};

export default function ICT() {
  const [content, setContent] = useState<ICTContent>(DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('ict_content')
        .select('*')
        .limit(1)
        .single();

      if (data) {
        setContent({
          main_title: data.main_title || DEFAULT.main_title,
          main_subtitle: data.main_subtitle || DEFAULT.main_subtitle,
          lms_title: data.lms_title || DEFAULT.lms_title,
          lms_description: data.lms_description || DEFAULT.lms_description,
          lms_icon: data.lms_icon || DEFAULT.lms_icon,
          lms_url: data.lms_url || DEFAULT.lms_url,
          eraport_title: data.eraport_title || DEFAULT.eraport_title,
          eraport_description: data.eraport_description || DEFAULT.eraport_description,
          eraport_icon: data.eraport_icon || DEFAULT.eraport_icon,
          eraport_url: data.eraport_url || DEFAULT.eraport_url,
          footer_note: data.footer_note || DEFAULT.footer_note,
        });
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="py-20 text-center">Memuat halaman ICT...</div>;
  }

  return (
    <main className="pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">{content.main_title}</h1>
        <p className="text-center text-gray-600 mb-16 whitespace-pre-line">
          {content.main_subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* LMS Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl p-8 shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-4xl">
                {content.lms_icon}
              </div>
              <h2 className="text-2xl font-semibold mb-3">{content.lms_title}</h2>
              <p className="text-blue-100 leading-relaxed">
                {content.lms_description}
              </p>
            </div>
            
            <a
              href={content.lms_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block bg-white text-blue-700 font-semibold text-center py-4 px-6 rounded-2xl hover:bg-blue-50 transition-all text-lg"
            >
              Akses LMS Siswa →
            </a>
          </div>

          {/* E-Raport Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-8 shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-4xl">
                {content.eraport_icon}
              </div>
              <h2 className="text-2xl font-semibold mb-3">{content.eraport_title}</h2>
              <p className="text-emerald-100 leading-relaxed">
                {content.eraport_description}
              </p>
            </div>
            
            <a
              href={content.eraport_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block bg-white text-emerald-700 font-semibold text-center py-4 px-6 rounded-2xl hover:bg-emerald-50 transition-all text-lg"
            >
              Akses E-Raport →
            </a>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center max-w-md mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-600 text-sm whitespace-pre-line">
              {content.footer_note}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}