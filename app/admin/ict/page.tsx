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
  
  // LMS Card
  lms_title: string;
  lms_description: string;
  lms_icon: string;
  lms_url: string;
  
  // E-Raport Card
  eraport_title: string;
  eraport_description: string;
  eraport_icon: string;
  eraport_url: string;
  
  // Footer Note
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

export default function AdminICT() {
  const [content, setContent] = useState<ICTContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ict_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setContent(data as ICTContent);
    } else if (error?.code === 'PGRST116') {
      await supabase.from('ict_content').insert([DEFAULT]);
      setContent(DEFAULT);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('ict_content')
      .upsert(content, { onConflict: 'id' });

    if (error) {
      setMessage('❌ Gagal menyimpan: ' + error.message);
    } else {
      setMessage('✅ Berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const updateField = (field: keyof ICTContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-10 text-center text-lg">Memuat data ICT...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Halaman ICT</h1>
            <p className="text-gray-600">Edit konten LMS, E-Raport, dan informasi tambahan</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-70"
          >
            {saving ? 'Menyimpan...' : '💾 Simpan Semua Perubahan'}
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700 border border-green-300">
            {message}
          </div>
        )}

        {/* Judul Halaman */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Judul Halaman</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Judul Utama</label>
              <input
                type="text"
                value={content.main_title}
                onChange={(e) => updateField('main_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sub Judul</label>
              <textarea
                value={content.main_subtitle}
                onChange={(e) => updateField('main_subtitle', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-20"
                placeholder="Information and Communication Technology&#10;SMK Negeri 4 Semarang"
              />
            </div>
          </div>
        </div>

        {/* LMS Card */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            🚀 LMS Card
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Icon Emoji</label>
              <input
                type="text"
                value={content.lms_icon}
                onChange={(e) => updateField('lms_icon', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Judul LMS</label>
              <input
                type="text"
                value={content.lms_title}
                onChange={(e) => updateField('lms_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Deskripsi LMS</label>
            <textarea
              value={content.lms_description}
              onChange={(e) => updateField('lms_description', e.target.value)}
              className="w-full border rounded-lg px-4 py-3 h-28"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">URL LMS</label>
            <input
              type="text"
              value={content.lms_url}
              onChange={(e) => updateField('lms_url', e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* E-Raport Card */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
            📊 E-Raport Card
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Icon Emoji</label>
              <input
                type="text"
                value={content.eraport_icon}
                onChange={(e) => updateField('eraport_icon', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Judul E-Raport</label>
              <input
                type="text"
                value={content.eraport_title}
                onChange={(e) => updateField('eraport_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Deskripsi E-Raport</label>
            <textarea
              value={content.eraport_description}
              onChange={(e) => updateField('eraport_description', e.target.value)}
              className="w-full border rounded-lg px-4 py-3 h-28"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">URL E-Raport</label>
            <input
              type="text"
              value={content.eraport_url}
              onChange={(e) => updateField('eraport_url', e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold mb-6">Catatan Bawah Halaman</h2>
          <textarea
            value={content.footer_note}
            onChange={(e) => updateField('footer_note', e.target.value)}
            className="w-full border rounded-lg px-4 py-3 h-32"
            placeholder="Butuh bantuan login..."
          />
        </div>
      </div>
    </div>
  );
}