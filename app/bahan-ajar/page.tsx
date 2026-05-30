'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BahanAjarItem {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
  documents: { name: string; subtitle: string }[];
}

interface BahanAjarContent {
  main_title: string;
  main_subtitle: string;
  items: BahanAjarItem[];
}

export default function BahanAjar() {
  const [content, setContent] = useState<BahanAjarContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('bahan_ajar_content')
        .select('*')
        .limit(1)
        .single();

      if (data) {
        setContent(data as BahanAjarContent);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) return <div className="py-20 text-center">Memuat bahan ajar...</div>;
  if (!content) return <div className="py-20 text-center">Data tidak ditemukan</div>;

  return (
    <main className="pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4">{content.main_title}</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {content.main_subtitle}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                {item.icon} {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                <h3 className="font-medium text-lg mb-4">Dokumen Tersedia:</h3>
                <ul className="space-y-3 text-sm">
                  {item.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-600 mt-1">•</span>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-gray-500">{doc.subtitle}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}