'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Jurusan {
  id: number;
  kode: string;
  nama_lengkap: string;
  nama_singkat: string;
  subtitle: string;
  profil_description: string;
  kompetensi: string[];
  icon: string;
  color: string;
}

const JURUSAN_LIST = [
  { kode: 'DPIB', nama: 'Desain Pemodelan dan Informasi Bangunan' },
  { kode: 'DKV', nama: 'Desain Komunikasi Visual' },
  { kode: 'ANS', nama: 'Akuntansi dan Keuangan Lembaga' },
  { kode: 'TEI', nama: 'Teknik Elektronika Industri' },
  { kode: 'TITL', nama: 'Teknik Instalasi Tenaga Listrik' },
  { kode: 'TKR', nama: 'Teknik Kendaraan Roda' },
  { kode: 'TPM', nama: 'Teknik Pemesinan' },
];

const DEFAULT_JURUSAN: Jurusan = {
  id: 0,
  kode: 'DPIB',
  nama_lengkap: 'Desain Pemodelan dan Informasi Bangunan (DPIB)',
  nama_singkat: 'DPIB',
  subtitle: 'Program Keahlian Desain dan Pemodelan Bangunan',
  profil_description: 'Jurusan DPIB mempelajari desain, pemodelan, dan pembangunan gedung menggunakan software seperti AutoCAD, Revit, SketchUp, dan teknologi BIM.',
  kompetensi: [
    'Ahli Desain dan Gambar Teknik Bangunan',
    'Operator Software CAD dan BIM',
    'Perencana dan Estimator Proyek Bangunan',
    'Siap bekerja di perusahaan konstruksi dan arsitektur',
  ],
  icon: '🏗️',
  color: '#3b82f6',
};

export default function AdminJurusan() {
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [selected, setSelected] = useState<Jurusan>(DEFAULT_JURUSAN);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJurusan();
  }, []);

  const fetchJurusan = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('jurusan_content')
      .select('*')
      .order('kode');

    if (data && data.length > 0) {
      setJurusanList(data as Jurusan[]);
      setSelected(data[0] as Jurusan);
    } else {
      const defaults = JURUSAN_LIST.map((j, i) => ({
        ...DEFAULT_JURUSAN,
        id: i + 1,
        kode: j.kode,
        nama_lengkap: j.nama,
        nama_singkat: j.kode,
      }));
      await supabase.from('jurusan_content').insert(defaults);
      setJurusanList(defaults);
      setSelected(defaults[0]);
    }
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('jurusan_content')
      .upsert(selected, { onConflict: 'id' });

    if (error) {
      setMessage('❌ Gagal menyimpan');
    } else {
      setMessage('✅ Tersimpan');
      setTimeout(() => setMessage(''), 2500);
      fetchJurusan();
    }
    setSaving(false);
  };

  const update = (field: keyof Jurusan, value: any) => {
    setSelected(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <div className="p-12 text-center">Memuat data jurusan...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Kelola Jurusan</h1>
          <button
            onClick={save}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-70"
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>

        {message && <div className="mb-6 p-4 bg-green-100 rounded-xl text-green-700">{message}</div>}

        <div className="grid grid-cols-12 gap-8">
          {/* Daftar Jurusan */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white p-5 rounded-2xl shadow sticky top-6">
              <h3 className="font-semibold mb-4">Pilih Jurusan</h3>
              {JURUSAN_LIST.map(j => (
                <button
                  key={j.kode}
                  onClick={() => {
                    const found = jurusanList.find(item => item.kode === j.kode);
                    if (found) setSelected(found);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition-all ${
                    selected.kode === j.kode ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {j.kode} - {j.nama}
                </button>
              ))}
            </div>
          </div>

          {/* Form Edit */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white p-8 rounded-2xl shadow">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{selected.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selected.nama_lengkap}</h2>
                  <p className="text-gray-500">Kode: {selected.kode}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 font-medium">Sub Judul</label>
                  <input
                    type="text"
                    value={selected.subtitle}
                    onChange={(e) => update('subtitle', e.target.value)}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium">Profil Jurusan</label>
                  <textarea
                    value={selected.profil_description}
                    onChange={(e) => update('profil_description', e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 h-40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2 font-medium">Icon</label>
                    <input
                      type="text"
                      value={selected.icon}
                      onChange={(e) => update('icon', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 font-medium">Warna</label>
                    <input
                      type="text"
                      value={selected.color}
                      onChange={(e) => update('color', e.target.value)}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <label className="font-medium">Kompetensi Lulusan</label>
                    <button onClick={() => update('kompetensi', [...selected.kompetensi, ''])} className="text-blue-600 text-sm">+ Tambah</button>
                  </div>
                  {selected.kompetensi.map((k, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                      <input
                        type="text"
                        value={k}
                        onChange={(e) => {
                          const newList = [...selected.kompetensi];
                          newList[i] = e.target.value;
                          update('kompetensi', newList);
                        }}
                        className="flex-1 border rounded-lg px-4 py-3"
                      />
                      <button onClick={() => {
                        const newList = selected.kompetensi.filter((_, idx) => idx !== i);
                        update('kompetensi', newList);
                      }} className="text-red-500 px-4">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}