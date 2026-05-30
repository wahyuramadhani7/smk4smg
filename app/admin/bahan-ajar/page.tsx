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
  color: string;           // Untuk warna accent (emerald, blue, violet, dll)
  documents: {
    name: string;
    subtitle: string;
  }[];
}

interface BahanAjarContent {
  main_title: string;
  main_subtitle: string;
  items: BahanAjarItem[];
}

const DEFAULT: BahanAjarContent = {
  main_title: "Bahan Ajar",
  main_subtitle: "Kumpulan dokumen pendukung pembelajaran SMK 4 Semarang",
  items: [
    {
      id: 1,
      title: "Kalender Pendidikan",
      icon: "📅",
      description: "Jadwal resmi kegiatan sekolah, libur, ulangan, dan kegiatan ekstrakurikuler sepanjang tahun ajaran.",
      color: "#10b981",
      documents: [
        { name: "Kalender Pendidikan Tahun Ajaran 2025/2026", subtitle: "Semester 1 & 2" }
      ]
    },
    {
      id: 2,
      title: "Jadwal Pelajaran",
      icon: "⏰",
      description: "Jadwal mengajar guru dan pembagian jam pelajaran per kelas dan jurusan.",
      color: "#10b981",
      documents: [
        { name: "Jadwal Pelajaran Guru", subtitle: "Semua Jurusan" },
        { name: "Jadwal Kelas X, XI, XII", subtitle: "Per Jurusan" }
      ]
    },
    {
      id: 3,
      title: "Daftar Hadir Siswa",
      icon: "📋",
      description: "Format daftar hadir siswa yang siap digunakan oleh guru setiap pertemuan.",
      color: "#10b981",
      documents: [
        { name: "Daftar Hadir Kelas X", subtitle: "Semester 1 & 2" },
        { name: "Daftar Hadir Kelas XI", subtitle: "Semester 1 & 2" },
        { name: "Daftar Hadir Kelas XII", subtitle: "Semester 1 & 2" }
      ]
    },
    {
      id: 4,
      title: "Daftar Nilai Siswa",
      icon: "📊",
      description: "Format rekapitulasi nilai siswa untuk penilaian harian, tengah semester, dan akhir semester.",
      color: "#3b82f6",
      documents: [
        { name: "Rekap Nilai Harian", subtitle: "Teori & Praktik" },
        { name: "Rekap Nilai Semester", subtitle: "Semua Kelas & Jurusan" }
      ]
    },
    {
      id: 5,
      title: "ATP (Analisis Tujuan Pembelajaran)",
      icon: "📋",
      description: "Analisis tujuan pembelajaran sesuai Kurikulum Merdeka untuk setiap mata pelajaran.",
      color: "#8b5cf6",
      documents: [
        { name: "ATP Semester 1", subtitle: "Semua Mata Pelajaran" },
        { name: "ATP Semester 2", subtitle: "Semua Mata Pelajaran" }
      ]
    },
    {
      id: 6,
      title: "RPM (Rencana Pelaksanaan Pembelajaran)",
      icon: "📝",
      description: "Rencana Pelaksanaan Pembelajaran (RPP/RPM) yang siap digunakan guru.",
      color: "#8b5cf6",
      documents: [
        { name: "RPM Semester 1", subtitle: "Semua Jurusan" },
        { name: "RPM Semester 2", subtitle: "Semua Jurusan" }
      ]
    }
  ]
};

export default function AdminBahanAjar() {
  const [content, setContent] = useState<BahanAjarContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bahan_ajar_content')
      .select('*')
      .limit(1)
      .single();

    if (data) setContent(data as BahanAjarContent);
    else if (error?.code === 'PGRST116') {
      await supabase.from('bahan_ajar_content').insert([DEFAULT]);
      setContent(DEFAULT);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('bahan_ajar_content')
      .upsert(content, { onConflict: 'id' });

    if (error) {
      setMessage('❌ Gagal menyimpan: ' + error.message);
    } else {
      setMessage('✅ Berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const updateMain = (field: 'main_title' | 'main_subtitle', value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (id: number, field: keyof BahanAjarItem, value: any) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateDocument = (itemId: number, docIndex: number, field: 'name' | 'subtitle', value: string) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const newDocs = [...item.documents];
          newDocs[docIndex] = { ...newDocs[docIndex], [field]: value };
          return { ...item, documents: newDocs };
        }
        return item;
      })
    }));
  };

  const addDocument = (itemId: number) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, documents: [...item.documents, { name: '', subtitle: '' }] }
          : item
      )
    }));
  };

  const removeDocument = (itemId: number, docIndex: number) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? { ...item, documents: item.documents.filter((_, i) => i !== docIndex) }
          : item
      )
    }));
  };

  if (loading) return <div className="p-10 text-center">Memuat data Bahan Ajar...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Bahan Ajar</h1>
            <p className="text-gray-600">Edit semua konten yang tampil di halaman Bahan Ajar</p>
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

        {/* Main Title & Subtitle */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Judul Halaman</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Judul Utama</label>
              <input
                type="text"
                value={content.main_title}
                onChange={(e) => updateMain('main_title', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sub Judul</label>
              <input
                type="text"
                value={content.main_subtitle}
                onChange={(e) => updateMain('main_subtitle', e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        </div>

        {/* Edit Each Card */}
        {content.items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-2xl shadow p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Card {index + 1}: {item.title}</h2>
              <span className="text-2xl">{item.icon}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Judul Card</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Emoji/Icon</label>
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => updateItem(item.id, 'icon', e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Deskripsi</label>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="w-full border rounded-lg px-4 py-3 h-24"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium">Daftar Dokumen</label>
                <button
                  onClick={() => addDocument(item.id)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Tambah Dokumen
                </button>
              </div>

              {item.documents.map((doc, docIndex) => (
                <div key={docIndex} className="flex gap-3 mb-4 p-4 border rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nama Dokumen"
                      value={doc.name}
                      onChange={(e) => updateDocument(item.id, docIndex, 'name', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Keterangan / Subtitle"
                      value={doc.subtitle}
                      onChange={(e) => updateDocument(item.id, docIndex, 'subtitle', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>
                  <button
                    onClick={() => removeDocument(item.id, docIndex)}
                    className="text-red-500 hover:bg-red-50 px-4 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}