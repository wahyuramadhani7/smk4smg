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
  foto1_url: string;
  foto1_caption: string;
  foto2_url: string;
  foto2_caption: string;
}

const DEFAULT: HomeContent = {
  hero_title: 'SMK 4 Semarang',
  hero_subtitle: 'Sekolah vokasi unggulan berbasis industri yang mencetak generasi kompeten dan berkarakter.',
  hero_bg_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&fit=crop',
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
  foto1_url: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800',
  foto1_caption: 'Kepala Sekolah SMK 4 Semarang',
  foto2_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
  foto2_caption: 'Suasana Pembelajaran',
};

export default function AdminHome() {
  const [content, setContent] = useState<HomeContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('home_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setContent(data as HomeContent);
    } else if (error?.code === 'PGRST116') {
      // Insert default jika belum ada data
      await supabase.from('home_content').insert([DEFAULT]);
      setContent(DEFAULT);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('home_content')
      .upsert(content, { onConflict: 'id' });

    if (error) {
      setMessage('❌ Gagal menyimpan: ' + error.message);
    } else {
      setMessage('✅ Berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const updateField = (field: keyof HomeContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateMisi = (index: number, value: string) => {
    const newMisi = [...content.misi];
    newMisi[index] = value;
    updateField('misi', newMisi);
  };

  const addMisi = () => updateField('misi', [...content.misi, '']);
  const removeMisi = (index: number) => {
    updateField('misi', content.misi.filter((_, i) => i !== index));
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateField('stats', newStats);
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Halaman Utama</h1>
            <p className="text-gray-600">Kelola konten yang tampil di beranda website</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-70"
          >
            {saving ? 'Menyimpan...' : '💾 Simpan Semua Perubahan'}
          </button>
        </div>

        {message && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">{message}</div>}

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">🌟 Hero Section</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <input type="text" value={content.hero_title} onChange={(e) => updateField('hero_title', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
              <textarea value={content.hero_subtitle} onChange={(e) => updateField('hero_subtitle', e.target.value)} className="w-full border rounded-lg px-4 py-3 h-24" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Hero Background URL</label>
              <input type="text" value={content.hero_bg_url} onChange={(e) => updateField('hero_bg_url', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
            </div>
          </div>
        </div>

        {/* Sambutan Kepala Sekolah */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">👨‍🏫 Sambutan Kepala Sekolah</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Foto Kepala Sekolah (foto1_url)</label>
              <input type="text" value={content.foto1_url} onChange={(e) => updateField('foto1_url', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Caption Foto Kepsek (foto1_caption)</label>
              <input type="text" value={content.foto1_caption} onChange={(e) => updateField('foto1_caption', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nama Kepala Sekolah</label>
              <input type="text" value={content.sambutan_nama} onChange={(e) => updateField('sambutan_nama', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jabatan</label>
              <input type="text" value={content.sambutan_jabatan} onChange={(e) => updateField('sambutan_jabatan', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Isi Sambutan</label>
              <textarea value={content.sambutan_kutipan} onChange={(e) => updateField('sambutan_kutipan', e.target.value)} className="w-full border rounded-lg px-4 py-3 h-32" />
            </div>
          </div>
        </div>

        {/* Visi */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">🎯 Visi</h2>
          <textarea value={content.visi} onChange={(e) => updateField('visi', e.target.value)} className="w-full border rounded-lg px-4 py-3 h-28" />
        </div>

        {/* Misi */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">📋 Misi</h2>
            <button onClick={addMisi} className="text-blue-600 text-sm hover:underline">+ Tambah Misi</button>
          </div>
          {content.misi.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input 
                type="text" 
                value={item} 
                onChange={(e) => updateMisi(index, e.target.value)} 
                className="flex-1 border rounded-lg px-4 py-3" 
              />
              <button onClick={() => removeMisi(index)} className="px-5 text-red-500 hover:bg-red-50 rounded-lg">✕</button>
            </div>
          ))}
        </div>

        {/* Statistik */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold mb-6">📊 Statistik</h2>
          {content.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-6 p-4 border rounded-xl">
              <div>
                <label className="block text-sm mb-1">Value</label>
                <input type="text" value={stat.value} onChange={(e) => updateStat(index, 'value', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm mb-1">Label</label>
                <input type="text" value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}