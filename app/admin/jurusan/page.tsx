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
  { kode: 'Animasi', nama: 'Animasi' },
  { kode: 'TEI', nama: 'Teknik Elektronika Industri' },
  { kode: 'TITL', nama: 'Teknik Instalasi Tenaga Listrik' },
  { kode: 'TKR', nama: 'Teknik Kendaraan Ringan' },
  { kode: 'TPM', nama: 'Teknik Pemesinan' },
  { kode: 'TSM', nama: 'Teknik Sepeda Motor' },
];

// Pengelompokan untuk tampilan sidebar saja (tidak memengaruhi data/struktur tabel).
// TKR & TSM dikelompokkan di bawah "Teknik Otomotif" karena ditampilkan bersama
// pada halaman publik /jurusan/teknik-otomotif (lihat jurusan-to.tsx).
const BIDANG_GROUPS: { bidang: string; kodes: string[] }[] = [
  { bidang: 'Teknik Otomotif', kodes: ['TKR', 'TSM'] },
  { bidang: 'Lainnya', kodes: ['DPIB', 'DKV', 'Animasi', 'TEI', 'TITL', 'TPM'] },
];

const DEFAULT_JURUSAN: Omit<Jurusan, 'id' | 'kode' | 'nama_lengkap' | 'nama_singkat'> = {
  subtitle: 'Program Keahlian',
  profil_description: 'Deskripsi jurusan akan diisi di sini...',
  kompetensi: ['Kompetensi 1', 'Kompetensi 2', 'Kompetensi 3'],
  icon: '🎓',
  color: '#3b82f6',
};

export default function AdminJurusan() {
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [selected, setSelected] = useState<Jurusan>({} as Jurusan);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJurusan();
  }, []);

  const fetchJurusan = async () => {
    setLoading(true);

    let { data } = await supabase
      .from('jurusan_content')
      .select('*')
      .order('kode');

    // Pastikan semua jurusan ada di database
    const existingKode = new Set(data?.map(j => j.kode) || []);
    const toInsert = JURUSAN_LIST.filter(j => !existingKode.has(j.kode)).map((j) => ({
      ...DEFAULT_JURUSAN,
      kode: j.kode,
      nama_lengkap: j.nama,
      nama_singkat: j.kode,
    }));

    if (toInsert.length > 0) {
      const { data: inserted } = await supabase
        .from('jurusan_content')
        .insert(toInsert)
        .select();

      if (inserted) {
        data = [...(data || []), ...inserted];
      }
    }

    setJurusanList(data || []);

    // Set default selected ke yang pertama
    if (data && data.length > 0) {
      setSelected(data[0]);
    }

    setLoading(false);
  };

  const save = async () => {
    if (!selected?.id) return;

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

        {message && (
          <div className="mb-6 p-4 bg-green-100 rounded-xl text-green-700 font-medium">
            {message}
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* Daftar Jurusan */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white p-5 rounded-2xl shadow sticky top-6">
              <h3 className="font-semibold mb-4">Pilih Jurusan</h3>

              {BIDANG_GROUPS.map((group) => {
                // Ambil item JURUSAN_LIST sesuai urutan & kode pada grup ini
                const itemsInGroup = JURUSAN_LIST.filter(j => group.kodes.includes(j.kode));
                if (itemsInGroup.length === 0) return null;

                return (
                  <div key={group.bidang} className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1 mb-2">
                      {group.bidang}
                    </p>
                    {itemsInGroup.map(j => {
                      const jurusanData = jurusanList.find(item => item.kode === j.kode);
                      return (
                        <button
                          key={j.kode}
                          onClick={() => {
                            if (jurusanData) setSelected(jurusanData);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition-all ${
                            selected.kode === j.kode
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {j.kode} - {j.nama}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Edit */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white p-8 rounded-2xl shadow">
              {selected && (
                <>
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
                        value={selected.subtitle || ''}
                        onChange={(e) => update('subtitle', e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2 font-medium">Profil Jurusan</label>
                      <textarea
                        value={selected.profil_description || ''}
                        onChange={(e) => update('profil_description', e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 h-40"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm mb-2 font-medium">Icon</label>
                        <input
                          type="text"
                          value={selected.icon || ''}
                          onChange={(e) => update('icon', e.target.value)}
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 font-medium">Warna</label>
                        <input
                          type="text"
                          value={selected.color || ''}
                          onChange={(e) => update('color', e.target.value)}
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <label className="font-medium">Kompetensi Lulusan</label>
                        <button
                          onClick={() => update('kompetensi', [...(selected.kompetensi || []), ''])}
                          className="text-blue-600 text-sm hover:underline"
                        >
                          + Tambah
                        </button>
                      </div>
                      {(selected.kompetensi || []).map((k, i) => (
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
                          <button
                            onClick={() => {
                              const newList = selected.kompetensi.filter((_, idx) => idx !== i);
                              update('kompetensi', newList);
                            }}
                            className="text-red-500 px-4 hover:bg-red-50 rounded-lg"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}