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
  
  // ATS Section
  ats_title: string;
  ats_description: string;
  ats_schedule: string;
  
  // AS Section
  as_title: string;
  
  // Mapel (Mata Pelajaran)
  mapel_title: string;
  mapel_items: { name: string; subtitle: string }[];
  
  // Kejuruan
  kejuruan_title: string;
  kejuruan_items: { name: string; subtitle: string }[];
  
  footer_text: string;
}

const DEFAULT: EvaluasiContent = {
  main_title: "Evaluasi & Assesmen",
  main_subtitle: "Rencana Kegiatan Asesmen SMK 4 Semarang Tahun Ajaran 2025/2026",
  
  ats_title: "📍 ATS - Assessment Tengah Semester",
  ats_description: "Penilaian tengah semester untuk memantau perkembangan siswa secara berkala.",
  ats_schedule: "September & November 2025 (Semester 1)\nMaret & Mei 2026 (Semester 2)",
  
  as_title: "📊 AS - Assessment Sumatif",
  
  mapel_title: "Mata Pelajaran (Mapel)",
  mapel_items: [
    { name: "ASAS - Assessment Sumatif Akhir Semester", subtitle: "Akhir Semester 1 & 2" },
    { name: "ASAT - Assessment Sumatif Akhir Tahun", subtitle: "Juni 2026" },
    { name: "ASAJ - Assessment Sumatif Akhir Jenjang", subtitle: "Kelas XII" },
  ],
  
  kejuruan_title: "Kejuruan / Kompetensi Keahlian",
  kejuruan_items: [
    { name: "Presentasi Proyek Akhir", subtitle: "Semester 2" },
    { name: "TKA - Tes Kompetensi Akademik", subtitle: "Semester 1 & 2" },
    { name: "UKK - Ujian Kompetensi Keahlian", subtitle: "Kelas XII" },
    { name: "ANBK - Assessment Nasional Berbasis Komputer", subtitle: "Sesuai jadwal nasional" },
  ],
  
  footer_text: "Jadwal pelaksanaan asesmen dapat berubah sesuai kebijakan sekolah dan pemerintah.\nUntuk dokumen lengkap dan jadwal detail, silakan hubungi Tim Kurikulum atau Wakil Kepala Sekolah Bidang Kurikulum.",
};

export default function AdminEvaluasi() {
  const [content, setContent] = useState<EvaluasiContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'ats' | 'as'>('general');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('evaluasi_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setContent(data as EvaluasiContent);
    } else if (error?.code === 'PGRST116') {
      await supabase.from('evaluasi_content').insert([DEFAULT]);
      setContent(DEFAULT);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('evaluasi_content')
      .upsert(content, { onConflict: 'id' });

    if (error) {
      setMessage('❌ Gagal menyimpan: ' + error.message);
    } else {
      setMessage('✅ Berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const updateField = (field: keyof EvaluasiContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateListItem = (
    listType: 'mapel' | 'kejuruan', 
    index: number, 
    field: 'name' | 'subtitle', 
    value: string
  ) => {
    const key = listType === 'mapel' ? 'mapel_items' : 'kejuruan_items';
    const newItems = [...(content[key] as any[])];
    newItems[index] = { ...newItems[index], [field]: value };
    updateField(key, newItems);
  };

  const addListItem = (listType: 'mapel' | 'kejuruan') => {
    const key = listType === 'mapel' ? 'mapel_items' : 'kejuruan_items';
    const newItems = [...(content[key] as any[]), { name: '', subtitle: '' }];
    updateField(key, newItems);
  };

  const removeListItem = (listType: 'mapel' | 'kejuruan', index: number) => {
    const key = listType === 'mapel' ? 'mapel_items' : 'kejuruan_items';
    const newItems = (content[key] as any[]).filter((_, i) => i !== index);
    updateField(key, newItems);
  };

  if (loading) return <div className="p-10 text-center text-lg">Memuat data Evaluasi...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Evaluasi & Asesmen</h1>
            <p className="text-gray-600">Edit konten halaman Evaluasi</p>
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

        {/* Tab Navigation */}
        <div className="flex border-b mb-8 bg-white rounded-t-2xl">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-4 font-medium ${activeTab === 'general' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            Judul & Umum
          </button>
          <button
            onClick={() => setActiveTab('ats')}
            className={`px-6 py-4 font-medium ${activeTab === 'ats' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            ATS - Tengah Semester
          </button>
          <button
            onClick={() => setActiveTab('as')}
            className={`px-6 py-4 font-medium ${activeTab === 'as' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            AS - Assessment Sumatif
          </button>
        </div>

        {/* ==================== TAB GENERAL ==================== */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl shadow p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Informasi Utama Halaman</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Judul Halaman</label>
              <input
                type="text"
                value={content.main_title}
                onChange={(e) => updateField('main_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sub Judul</label>
              <input
                type="text"
                value={content.main_subtitle}
                onChange={(e) => updateField('main_subtitle', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Teks Footer</label>
              <textarea
                value={content.footer_text}
                onChange={(e) => updateField('footer_text', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-32"
                placeholder="Catatan di bagian bawah halaman..."
              />
            </div>
          </div>
        )}

        {/* ==================== TAB ATS ==================== */}
        {activeTab === 'ats' && (
          <div className="bg-white rounded-2xl shadow p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">ATS - Assessment Tengah Semester</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Judul ATS</label>
              <input
                type="text"
                value={content.ats_title}
                onChange={(e) => updateField('ats_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi ATS</label>
              <textarea
                value={content.ats_description}
                onChange={(e) => updateField('ats_description', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jadwal Pelaksanaan ATS</label>
              <textarea
                value={content.ats_schedule}
                onChange={(e) => updateField('ats_schedule', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-32"
                placeholder="September & November 2025 (Semester 1)&#10;Maret & Mei 2026 (Semester 2)"
              />
            </div>
          </div>
        )}

        {/* ==================== TAB AS ==================== */}
        {activeTab === 'as' && (
          <div className="bg-white rounded-2xl shadow p-8 space-y-10">
            <h2 className="text-xl font-semibold">AS - Assessment Sumatif</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Judul AS</label>
              <input
                type="text"
                value={content.as_title}
                onChange={(e) => updateField('as_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Mapel Section */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-lg">{content.mapel_title}</h3>
                <button onClick={() => addListItem('mapel')} className="text-blue-600 text-sm">+ Tambah</button>
              </div>
              {content.mapel_items.map((item, index) => (
                <div key={index} className="flex gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateListItem('mapel', index, 'name', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3 mb-2"
                      placeholder="Nama Asesmen"
                    />
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => updateListItem('mapel', index, 'subtitle', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3"
                      placeholder="Keterangan"
                    />
                  </div>
                  <button onClick={() => removeListItem('mapel', index)} className="text-red-500">✕</button>
                </div>
              ))}
            </div>

            {/* Kejuruan Section */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-lg">{content.kejuruan_title}</h3>
                <button onClick={() => addListItem('kejuruan')} className="text-blue-600 text-sm">+ Tambah</button>
              </div>
              {content.kejuruan_items.map((item, index) => (
                <div key={index} className="flex gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateListItem('kejuruan', index, 'name', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3 mb-2"
                      placeholder="Nama Asesmen"
                    />
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => updateListItem('kejuruan', index, 'subtitle', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3"
                      placeholder="Keterangan"
                    />
                  </div>
                  <button onClick={() => removeListItem('kejuruan', index)} className="text-red-500">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}