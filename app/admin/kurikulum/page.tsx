'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface KurikulumContent {
  // Profil Kurikulum
  profil_title: string;
  profil_description: string;
  tujuan_pembelajaran: string[];
  sistem_pembelajaran: string;
  dokumen_kurikulum_url: string;

  // Struktur Kurikulum
  struktur_kelas_x: string;
  struktur_kelas_xi: string;
  struktur_kelas_xii: string;
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

  struktur_kelas_x: 'Dasar-dasar kejuruan + mata pelajaran umum + proyek sederhana.',
  struktur_kelas_xi: 'Pembelajaran inti jurusan + praktik di workshop + magang industri tahap awal.',
  struktur_kelas_xii: 'Spesialisasi keahlian + magang industri intensif + persiapan kerja.',
};

export default function AdminKurikulum() {
  const [content, setContent] = useState<KurikulumContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profil' | 'struktur'>('profil');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('kurikulum_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setContent(data as KurikulumContent);
    } else if (error && error.code === 'PGRST116') {
      await supabase.from('kurikulum_content').insert([DEFAULT]);
      setContent(DEFAULT);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('kurikulum_content')
      .upsert(content, { onConflict: 'id' });

    if (error) {
      setMessage('❌ Gagal menyimpan: ' + error.message);
    } else {
      setMessage('✅ Perubahan berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const updateField = (field: keyof KurikulumContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateTujuan = (index: number, value: string) => {
    const newTujuan = [...content.tujuan_pembelajaran];
    newTujuan[index] = value;
    updateField('tujuan_pembelajaran', newTujuan);
  };

  const addTujuan = () => {
    updateField('tujuan_pembelajaran', [...content.tujuan_pembelajaran, '']);
  };

  const removeTujuan = (index: number) => {
    const newTujuan = content.tujuan_pembelajaran.filter((_, i) => i !== index);
    updateField('tujuan_pembelajaran', newTujuan);
  };

  if (loading) return <div className="p-10 text-center text-lg">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Kurikulum</h1>
            <p className="text-gray-600">Edit Profil Kurikulum dan Struktur Kurikulum</p>
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
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab('profil')}
            className={`px-6 py-3 font-medium text-lg border-b-2 transition-all ${
              activeTab === 'profil' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Profil Kurikulum
          </button>
          <button
            onClick={() => setActiveTab('struktur')}
            className={`px-6 py-3 font-medium text-lg border-b-2 transition-all ${
              activeTab === 'struktur' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Struktur Kurikulum
          </button>
        </div>

        {/* ==================== TAB PROFIL KURIKULUM ==================== */}
        {activeTab === 'profil' && (
          <div className="bg-white rounded-2xl shadow p-8 space-y-8">
            <h2 className="text-2xl font-semibold">Profil Kurikulum</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Judul Halaman</label>
              <input
                type="text"
                value={content.profil_title}
                onChange={(e) => updateField('profil_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi Utama</label>
              <textarea
                value={content.profil_description}
                onChange={(e) => updateField('profil_description', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-32"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium">Tujuan Pembelajaran</label>
                <button onClick={addTujuan} className="text-blue-600 text-sm hover:underline">
                  + Tambah Tujuan
                </button>
              </div>
              {content.tujuan_pembelajaran.map((item, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateTujuan(index, e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-3"
                  />
                  <button
                    onClick={() => removeTujuan(index)}
                    className="px-5 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sistem Pembelajaran</label>
              <textarea
                value={content.sistem_pembelajaran}
                onChange={(e) => updateField('sistem_pembelajaran', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Link Dokumen Kurikulum (PDF)</label>
              <input
                type="text"
                value={content.dokumen_kurikulum_url}
                onChange={(e) => updateField('dokumen_kurikulum_url', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                placeholder="https://..."
              />
            </div>
          </div>
        )}

        {/* ==================== TAB STRUKTUR KURIKULUM ==================== */}
        {activeTab === 'struktur' && (
          <div className="bg-white rounded-2xl shadow p-8 space-y-10">
            <h2 className="text-2xl font-semibold">Struktur Kurikulum</h2>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Kelas X (Semester 1-2)</h3>
              <textarea
                value={content.struktur_kelas_x}
                onChange={(e) => updateField('struktur_kelas_x', e.target.value)}
                className="w-full border rounded-lg px-4 py-4 h-28"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Kelas XI (Semester 3-4)</h3>
              <textarea
                value={content.struktur_kelas_xi}
                onChange={(e) => updateField('struktur_kelas_xi', e.target.value)}
                className="w-full border rounded-lg px-4 py-4 h-28"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-700">Kelas XII (Semester 5-6)</h3>
              <textarea
                value={content.struktur_kelas_xii}
                onChange={(e) => updateField('struktur_kelas_xii', e.target.value)}
                className="w-full border rounded-lg px-4 py-4 h-28"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}