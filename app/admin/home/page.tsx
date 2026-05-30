'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

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
  hero_bg_url: 'https://images.unsplash.com/photo-1594737625785-6c2e9d3b8f3e?q=80&w=2070&fit=crop',
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
  foto2_url: '',
  foto2_caption: '',
};

export default function AdminHome() {
  const [content, setContent] = useState<HomeContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [preview1, setPreview1] = useState('');
  const [preview2, setPreview2] = useState('');

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
      // Perbaikan null values
      const cleaned = {
        ...DEFAULT,
        ...data,
        hero_subtitle: data.hero_subtitle || '',
        sambutan_kutipan: data.sambutan_kutipan || '',
        sambutan_nama: data.sambutan_nama || '',
        sambutan_jabatan: data.sambutan_jabatan || '',
        visi: data.visi || '',
        foto1_caption: data.foto1_caption || '',
        foto2_url: data.foto2_url || '',
        foto2_caption: data.foto2_caption || '',
        misi: data.misi || [],
        stats: data.stats || [],
      } as HomeContent;

      setContent(cleaned);
      setPreview1(cleaned.foto1_url || '');
      setPreview2(cleaned.foto2_url || '');
    } else {
      await supabase.from('home_content').insert([DEFAULT]);
      setContent(DEFAULT);
      setPreview1(DEFAULT.foto1_url);
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

  // Upload Foto 1 - Kepala Sekolah
  const handlePhoto1Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading1(true);

    try {
      const fileName = `kepsek-${Date.now()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage
        .from('home-images')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage.from('home-images').getPublicUrl(fileName);
      const newUrl = urlData.publicUrl;

      updateField('foto1_url', newUrl);
      setPreview1(newUrl);
      setMessage('✅ Foto Kepala Sekolah berhasil diupload!');
    } catch (err: any) {
      setMessage('❌ Gagal upload foto 1: ' + err.message);
    } finally {
      setUploading1(false);
    }
  };

  // Upload Foto 2
  const handlePhoto2Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading2(true);

    try {
      const fileName = `foto2-${Date.now()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage
        .from('home-images')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage.from('home-images').getPublicUrl(fileName);
      const newUrl = urlData.publicUrl;

      updateField('foto2_url', newUrl);
      setPreview2(newUrl);
      setMessage('✅ Foto Tambahan berhasil diupload!');
    } catch (err: any) {
      setMessage('❌ Gagal upload foto 2: ' + err.message);
    } finally {
      setUploading2(false);
    }
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

  const addStat = () => {
    updateField('stats', [...content.stats, { value: '', label: '' }]);
  };

  const removeStat = (index: number) => {
    updateField('stats', content.stats.filter((_, i) => i !== index));
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Halaman Utama</h1>
            <p className="text-gray-600">Kelola semua konten yang tampil di beranda website</p>
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
            <div className="md:col-span-2">
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
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-3">Foto Kepala Sekolah</label>
              {preview1 && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border mb-4">
                  <Image src={preview1} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhoto1Upload} disabled={uploading1} className="w-full border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer" />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Caption Foto</label>
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
        </div>

        {/* Visi & Misi */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">🎯 Visi & Misi</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2">Visi</label>
              <textarea value={content.visi} onChange={(e) => updateField('visi', e.target.value)} className="w-full border rounded-lg px-4 py-3 h-40" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Misi</label>
              {content.misi.map((item, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateMisi(index, e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-3"
                  />
                  <button onClick={() => removeMisi(index)} className="px-4 text-red-600 hover:bg-red-50 rounded-lg">✕</button>
                </div>
              ))}
              <button onClick={addMisi} className="text-blue-600 hover:underline text-sm mt-2">+ Tambah Misi</button>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">📊 Statistik</h2>
          {content.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded-xl">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Value</label>
                <input type="text" value={stat.value} onChange={(e) => updateStat(index, 'value', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Label</label>
                <input type="text" value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} className="w-full border rounded-lg px-4 py-3" />
              </div>
              <button onClick={() => removeStat(index)} className="col-span-2 text-red-600 text-sm hover:underline">Hapus Statistik</button>
            </div>
          ))}
          <button onClick={addStat} className="text-blue-600 hover:underline text-sm">+ Tambah Statistik</button>
        </div>

        {/* Foto Tambahan 2 */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold mb-6">🖼️ Foto Tambahan (Foto 2)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {preview2 && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border mb-4">
                  <Image src={preview2} alt="Preview 2" fill className="object-cover" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhoto2Upload} disabled={uploading2} className="w-full border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Caption Foto 2</label>
              <input 
                type="text" 
                value={content.foto2_caption || ''} 
                onChange={(e) => updateField('foto2_caption', e.target.value)} 
                className="w-full border rounded-lg px-4 py-3" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}