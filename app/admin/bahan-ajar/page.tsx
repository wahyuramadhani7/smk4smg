'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DocumentItem {
  name: string;
  subtitle: string;
  drive_link?: string; // ← BARU: link Google Drive
}

interface BahanAjarItem {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
  documents: DocumentItem[];
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
        { name: "Kalender Pendidikan Tahun Ajaran 2025/2026", subtitle: "Semester 1 & 2", drive_link: "" }
      ]
    },
    {
      id: 2,
      title: "Jadwal Pelajaran",
      icon: "⏰",
      description: "Jadwal mengajar guru dan pembagian jam pelajaran per kelas dan jurusan.",
      color: "#10b981",
      documents: [
        { name: "Jadwal Pelajaran Guru", subtitle: "Semua Jurusan", drive_link: "" },
        { name: "Jadwal Kelas X, XI, XII", subtitle: "Per Jurusan", drive_link: "" }
      ]
    },
    {
      id: 3,
      title: "Daftar Hadir Siswa",
      icon: "📋",
      description: "Format daftar hadir siswa yang siap digunakan oleh guru setiap pertemuan.",
      color: "#10b981",
      documents: [
        { name: "Daftar Hadir Kelas X", subtitle: "Semester 1 & 2", drive_link: "" },
        { name: "Daftar Hadir Kelas XI", subtitle: "Semester 1 & 2", drive_link: "" },
        { name: "Daftar Hadir Kelas XII", subtitle: "Semester 1 & 2", drive_link: "" }
      ]
    },
    {
      id: 4,
      title: "Daftar Nilai Siswa",
      icon: "📊",
      description: "Format rekapitulasi nilai siswa untuk penilaian harian, tengah semester, dan akhir semester.",
      color: "#3b82f6",
      documents: [
        { name: "Rekap Nilai Harian", subtitle: "Teori & Praktik", drive_link: "" },
        { name: "Rekap Nilai Semester", subtitle: "Semua Kelas & Jurusan", drive_link: "" }
      ]
    },
    {
      id: 5,
      title: "ATP (Analisis Tujuan Pembelajaran)",
      icon: "📋",
      description: "Analisis tujuan pembelajaran sesuai Kurikulum Merdeka untuk setiap mata pelajaran.",
      color: "#8b5cf6",
      documents: [
        { name: "ATP Semester 1", subtitle: "Semua Mata Pelajaran", drive_link: "" },
        { name: "ATP Semester 2", subtitle: "Semua Mata Pelajaran", drive_link: "" }
      ]
    },
    {
      id: 6,
      title: "RPM (Rencana Pelaksanaan Pembelajaran)",
      icon: "📝",
      description: "Rencana Pelaksanaan Pembelajaran (RPP/RPM) yang siap digunakan guru.",
      color: "#8b5cf6",
      documents: [
        { name: "RPM Semester 1", subtitle: "Semua Jurusan", drive_link: "" },
        { name: "RPM Semester 2", subtitle: "Semua Jurusan", drive_link: "" }
      ]
    }
  ]
};

// Helper: validasi apakah URL terlihat seperti Google Drive link
const isDriveLink = (url: string) =>
  url.startsWith('https://drive.google.com') || url.startsWith('https://docs.google.com');

export default function AdminBahanAjar() {
  const [content, setContent] = useState<BahanAjarContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

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

    if (data) {
      // Pastikan setiap dokumen punya field drive_link (backward compat)
      const normalized: BahanAjarContent = {
        ...data,
        items: (data as BahanAjarContent).items.map(item => ({
          ...item,
          documents: item.documents.map(doc => ({
            drive_link: '',
            ...doc,
          }))
        }))
      };
      setContent(normalized);
    } else if (error?.code === 'PGRST116') {
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

  const updateDocument = (
    itemId: number,
    docIndex: number,
    field: keyof DocumentItem,
    value: string
  ) => {
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
          ? { ...item, documents: [...item.documents, { name: '', subtitle: '', drive_link: '' }] }
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

  const toggleCard = (id: number) => {
    setExpandedCards(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedCards(content.items.map(i => i.id));
  const collapseAll = () => setExpandedCards([]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Memuat data Bahan Ajar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Bahan Ajar</h1>
            <p className="text-gray-500 mt-1">Edit konten & link Google Drive untuk setiap dokumen</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-60 shadow-md"
          >
            {saving
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
              : '💾 Simpan Semua Perubahan'
            }
          </button>
        </div>

        {/* Notification */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl font-medium text-sm ${message.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        {/* Main Title & Subtitle */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full inline-block" />
            Judul Halaman
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Utama</label>
              <input
                type="text"
                value={content.main_title}
                onChange={(e) => updateMain('main_title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub Judul</label>
              <input
                type="text"
                value={content.main_subtitle}
                onChange={(e) => updateMain('main_subtitle', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </div>

        {/* Expand / Collapse All */}
        <div className="flex justify-end gap-3 mb-4">
          <button onClick={expandAll} className="text-sm text-blue-600 hover:underline">
            Buka Semua ↓
          </button>
          <span className="text-gray-300">|</span>
          <button onClick={collapseAll} className="text-sm text-gray-500 hover:underline">
            Tutup Semua ↑
          </button>
        </div>

        {/* Cards */}
        {content.items.map((item, index) => {
          const isExpanded = expandedCards.includes(item.id);
          const docCount = item.documents.length;
          const linkedCount = item.documents.filter(d => d.drive_link && isDriveLink(d.drive_link)).length;

          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">

              {/* Card Header — klik untuk collapse/expand */}
              <button
                onClick={() => toggleCard(item.id)}
                className="w-full flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <span className="font-semibold text-gray-900">Card {index + 1}: {item.title}</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{docCount} dokumen</span>
                      {linkedCount > 0 && (
                        <span className="text-xs bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                          {linkedCount} link aktif
                        </span>
                      )}
                      {linkedCount === 0 && docCount > 0 && (
                        <span className="text-xs bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-0.5 rounded-full font-medium">
                          Belum ada link
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Card Body */}
              {isExpanded && (
                <div className="px-8 pb-8 border-t border-gray-100">
                  <div className="pt-6 grid md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Judul Card</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emoji / Icon</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => updateItem(item.id, 'icon', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Dokumen List */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-semibold text-gray-700">
                        Daftar Dokumen & Link Drive
                      </label>
                      <button
                        onClick={() => addDocument(item.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                      >
                        + Tambah Dokumen
                      </button>
                    </div>

                    <div className="space-y-4">
                      {item.documents.map((doc, docIndex) => {
                        const hasLink = !!doc.drive_link;
                        const isValidDriveLink = hasLink && isDriveLink(doc.drive_link!);
                        const isInvalidLink = hasLink && !isValidDriveLink;

                        return (
                          <div
                            key={docIndex}
                            className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative"
                          >
                            {/* Badge urutan */}
                            <span className="absolute top-4 left-4 text-xs font-bold text-gray-400">
                              #{docIndex + 1}
                            </span>

                            <div className="pl-6">
                              <div className="grid md:grid-cols-2 gap-3 mb-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Nama Dokumen</label>
                                  <input
                                    type="text"
                                    placeholder="Contoh: ATP Semester 1"
                                    value={doc.name}
                                    onChange={(e) => updateDocument(item.id, docIndex, 'name', e.target.value)}
                                    className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Keterangan / Subtitle</label>
                                  <input
                                    type="text"
                                    placeholder="Contoh: Semua Mata Pelajaran"
                                    value={doc.subtitle}
                                    onChange={(e) => updateDocument(item.id, docIndex, 'subtitle', e.target.value)}
                                    className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                  />
                                </div>
                              </div>

                              {/* Google Drive Link */}
                              <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                                  🔗 Link Google Drive
                                </label>
                                <div className="flex gap-2 items-center">
                                  <div className="relative flex-1">
                                    <input
                                      type="url"
                                      placeholder="https://drive.google.com/..."
                                      value={doc.drive_link ?? ''}
                                      onChange={(e) => updateDocument(item.id, docIndex, 'drive_link', e.target.value)}
                                      className={`w-full border rounded-lg px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 transition bg-white ${
                                        isValidDriveLink
                                          ? 'border-green-300 focus:ring-green-400'
                                          : isInvalidLink
                                          ? 'border-yellow-300 focus:ring-yellow-400'
                                          : 'border-gray-200 focus:ring-blue-500'
                                      }`}
                                    />
                                    {/* Status icon dalam input */}
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                                      {isValidDriveLink && '✅'}
                                      {isInvalidLink && '⚠️'}
                                    </span>
                                  </div>

                                  {/* Tombol Buka Link */}
                                  {isValidDriveLink && (
                                    <a
                                      href={doc.drive_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="shrink-0 text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-2.5 rounded-lg transition flex items-center gap-1.5 font-medium"
                                    >
                                      Buka ↗
                                    </a>
                                  )}
                                </div>

                                {/* Pesan validasi */}
                                {isInvalidLink && (
                                  <p className="text-xs text-yellow-600 mt-1.5">
                                    ⚠️ Link harus diawali dengan https://drive.google.com atau https://docs.google.com
                                  </p>
                                )}
                                {isValidDriveLink && (
                                  <p className="text-xs text-green-600 mt-1.5">
                                    ✅ Link Google Drive valid
                                  </p>
                                )}
                                {!hasLink && (
                                  <p className="text-xs text-gray-400 mt-1.5">
                                    Kosongkan jika belum ada link. Tombol unduh tidak akan muncul.
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Tombol Hapus Dokumen */}
                            <button
                              onClick={() => removeDocument(item.id, docIndex)}
                              title="Hapus dokumen ini"
                              className="absolute top-3 right-3 text-gray-300 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition text-lg"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}

                      {item.documents.length === 0 && (
                        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl text-sm">
                          Belum ada dokumen. Klik "+ Tambah Dokumen" untuk menambahkan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom Save */}
        <div className="flex justify-end mt-6 pb-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-60 shadow-lg"
          >
            {saving
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
              : '💾 Simpan Semua Perubahan'
            }
          </button>
        </div>
      </div>
    </div>
  );
}