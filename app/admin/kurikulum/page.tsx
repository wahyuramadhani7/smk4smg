'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface KurikulumContent {
  id?: string;
  judul: string;
  subjudul: string;
  deskripsi: string;
  sistem_pembelajaran: string;
  tujuan: string[];
  file_url: string;
  file_name: string;
}

const defaultContent: KurikulumContent = {
  judul: 'Profil Kurikulum',
  subjudul: 'Kurikulum Merdeka di SMK 4 SMG',
  deskripsi:
    'SMK 4 Semarang menerapkan Kurikulum Merdeka yang dirancang untuk menghasilkan lulusan yang kompeten sesuai kebutuhan industri saat ini.',
  sistem_pembelajaran: 'Berbasis Proyek Nyata (Project Based Learning) dengan pendekatan industri.',
  tujuan: [
    'Mengembangkan kompetensi teknis dan soft skills siswa',
    'Menyiapkan siswa siap kerja atau melanjutkan pendidikan tinggi',
    'Membangun karakter disiplin, kreatif, dan inovatif',
  ],
  file_url: '',
  file_name: '',
};

type ToastType = 'success' | 'error' | 'info';

function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors: Record<ToastType, string> = {
    success: '#22c55e',
    error: '#ef4444',
    info: '#3b82f6',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#1e293b',
        color: '#f8fafc',
        padding: '0.85rem 1.4rem',
        borderRadius: '10px',
        borderLeft: `4px solid ${colors[type]}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        zIndex: 9999,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.9rem',
        maxWidth: '340px',
        animation: 'slideIn 0.25s ease',
      }}
    >
      {message}
    </div>
  );
}

export default function AdminKurikulum() {
  const [content, setContent] = useState<KurikulumContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [newTujuan, setNewTujuan] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  // ── Fetch existing content ──────────────────────────────────────────
  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase
        .from('kurikulum_content')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        showToast('Gagal memuat data konten.', 'error');
      } else if (data) {
        setContent(data as KurikulumContent);
      }
      setLoading(false);
    }
    fetchContent();
  }, []);

  // ── Save / upsert content ───────────────────────────────────────────
  async function handleSave() {
    setSaving(true);
    const payload = { ...content, updated_at: new Date().toISOString() };

    let error;
    if (content.id) {
      ({ error } = await supabase.from('kurikulum_content').update(payload).eq('id', content.id));
    } else {
      const { data, error: insertError } = await supabase
        .from('kurikulum_content')
        .insert(payload)
        .select()
        .single();
      if (data) setContent(data as KurikulumContent);
      error = insertError;
    }

    setSaving(false);
    if (error) {
      showToast('Gagal menyimpan: ' + error.message, 'error');
    } else {
      showToast('Konten berhasil disimpan!', 'success');
    }
  }

  // ── Upload PDF ──────────────────────────────────────────────────────
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast('Hanya file PDF yang diizinkan.', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('Ukuran file maksimal 10 MB.', 'error');
      return;
    }

    setUploadingFile(true);
    const fileName = `kurikulum_${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from('kurikulum-files')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      showToast('Upload gagal: ' + uploadError.message, 'error');
      setUploadingFile(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('kurikulum-files').getPublicUrl(fileName);
    setContent((prev) => ({ ...prev, file_url: urlData.publicUrl, file_name: file.name }));
    setUploadingFile(false);
    showToast('File berhasil diupload!', 'success');
  }

  // ── Tujuan helpers ──────────────────────────────────────────────────
  function addTujuan() {
    const trimmed = newTujuan.trim();
    if (!trimmed) return;
    setContent((prev) => ({ ...prev, tujuan: [...prev.tujuan, trimmed] }));
    setNewTujuan('');
  }

  function removeTujuan(idx: number) {
    setContent((prev) => ({ ...prev, tujuan: prev.tujuan.filter((_, i) => i !== idx) }));
  }

  function updateTujuan(idx: number, value: string) {
    setContent((prev) => {
      const updated = [...prev.tujuan];
      updated[idx] = value;
      return { ...prev, tujuan: updated };
    });
  }

  // ── Render ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.spinner} />
        <p style={{ color: '#64748b', marginTop: '1rem', fontFamily: "'DM Sans', sans-serif" }}>
          Memuat data…
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@600;700&display=swap');
        @keyframes slideIn { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus, input:focus { outline: 2px solid #6366f1; outline-offset: -1px; }
        .tujuan-row:hover .remove-btn { opacity: 1 !important; }
      `}</style>

      <div style={styles.page}>
        {/* ── Sidebar label ── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarInner}>
            <span style={styles.sidebarLabel}>ADMIN</span>
            <span style={styles.sidebarTitle}>Kurikulum</span>
            <div style={styles.sidebarDivider} />
            <nav style={styles.sidebarNav}>
              {['Teks Utama', 'Tujuan Pembelajaran', 'Sistem Belajar', 'File PDF'].map((item) => (
                <a key={item} href={`#${item.replace(/\s/g, '-').toLowerCase()}`} style={styles.sidebarLink}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main style={styles.main}>
          <header style={styles.header}>
            <div>
              <h1 style={styles.headerTitle}>Edit Profil Kurikulum</h1>
              <p style={styles.headerSub}>Perubahan akan langsung tampil di halaman publik setelah disimpan.</p>
            </div>
            <button onClick={handleSave} disabled={saving} style={saving ? styles.btnDisabled : styles.btn}>
              {saving ? 'Menyimpan…' : 'Simpan Semua'}
            </button>
          </header>

          {/* ── Teks Utama ── */}
          <section id="teks-utama" style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardDot} />
              Teks Utama
            </h2>

            <label style={styles.label}>Judul Halaman</label>
            <input
              style={styles.input}
              value={content.judul}
              onChange={(e) => setContent((p) => ({ ...p, judul: e.target.value }))}
              placeholder="Profil Kurikulum"
            />

            <label style={styles.label}>Subjudul</label>
            <input
              style={styles.input}
              value={content.subjudul}
              onChange={(e) => setContent((p) => ({ ...p, subjudul: e.target.value }))}
              placeholder="Kurikulum Merdeka di SMK 4 SMG"
            />

            <label style={styles.label}>Deskripsi</label>
            <textarea
              style={{ ...styles.input, ...styles.textarea }}
              value={content.deskripsi}
              onChange={(e) => setContent((p) => ({ ...p, deskripsi: e.target.value }))}
              placeholder="Deskripsi singkat kurikulum…"
            />
          </section>

          {/* ── Tujuan Pembelajaran ── */}
          <section id="tujuan-pembelajaran" style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardDot} />
              Tujuan Pembelajaran
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
              {content.tujuan.map((item, idx) => (
                <div key={idx} className="tujuan-row" style={styles.tujuanRow}>
                  <span style={styles.tujuanNum}>{idx + 1}</span>
                  <input
                    style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                    value={item}
                    onChange={(e) => updateTujuan(idx, e.target.value)}
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeTujuan(idx)}
                    style={{ ...styles.removeBtn, opacity: 0, transition: 'opacity 0.15s' }}
                    title="Hapus"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div style={styles.tujuanRow}>
              <input
                style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                value={newTujuan}
                onChange={(e) => setNewTujuan(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTujuan()}
                placeholder="Tambah tujuan baru… (Enter)"
              />
              <button onClick={addTujuan} style={styles.addBtn}>
                + Tambah
              </button>
            </div>
          </section>

          {/* ── Sistem Pembelajaran ── */}
          <section id="sistem-belajar" style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardDot} />
              Sistem Pembelajaran
            </h2>
            <textarea
              style={{ ...styles.input, ...styles.textarea }}
              value={content.sistem_pembelajaran}
              onChange={(e) => setContent((p) => ({ ...p, sistem_pembelajaran: e.target.value }))}
              placeholder="Deskripsi sistem pembelajaran…"
            />
          </section>

          {/* ── File PDF ── */}
          <section id="file-pdf" style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardDot} />
              File PDF Kurikulum
            </h2>

            {content.file_url && (
              <div style={styles.filePreview}>
                <span style={styles.fileIcon}>📄</span>
                <div>
                  <p style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>{content.file_name}</p>
                  <a href={content.file_url} target="_blank" rel="noopener noreferrer" style={styles.fileLink}>
                    Lihat / Download
                  </a>
                </div>
                <button
                  onClick={() => setContent((p) => ({ ...p, file_url: '', file_name: '' }))}
                  style={{ ...styles.removeBtn, marginLeft: 'auto' }}
                >
                  Hapus
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingFile}
              style={uploadingFile ? styles.btnDisabled : styles.btnOutline}
            >
              {uploadingFile ? 'Mengupload…' : '⬆ Upload PDF Baru'}
            </button>
            <p style={styles.hint}>Format: PDF · Maks. 10 MB</p>
          </section>

          {/* ── Save footer ── */}
          <div style={styles.footer}>
            <button onClick={handleSave} disabled={saving} style={saving ? styles.btnDisabled : styles.btn}>
              {saving ? 'Menyimpan…' : 'Simpan Semua Perubahan'}
            </button>
          </div>
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f1f5f9',
    fontFamily: "'DM Sans', sans-serif",
  },
  loadingWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  spinner: {
    width: 36,
    height: 36,
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
  sidebar: {
    width: 220,
    background: '#0f172a',
    flexShrink: 0,
    position: 'sticky' as const,
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  },
  sidebarInner: {
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  sidebarLabel: {
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: '#6366f1',
    fontWeight: 700,
  },
  sidebarTitle: {
    fontSize: '1.15rem',
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    color: '#f8fafc',
  },
  sidebarDivider: {
    height: 1,
    background: '#1e293b',
    margin: '1rem 0',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  sidebarLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.85rem',
    padding: '0.4rem 0.6rem',
    borderRadius: 6,
    transition: 'background 0.15s, color 0.15s',
  },
  main: {
    flex: 1,
    padding: '2.5rem 2.5rem 4rem',
    maxWidth: 860,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  headerTitle: {
    fontSize: '1.75rem',
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    color: '#0f172a',
  },
  headerSub: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: '0.3rem',
  },
  card: {
    background: '#ffffff',
    borderRadius: 14,
    padding: '1.75rem',
    marginBottom: '1.5rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
    fontSize: '1rem',
    fontFamily: "'Sora', sans-serif",
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: '1.25rem',
  },
  cardDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#6366f1',
    display: 'inline-block',
    flexShrink: 0,
  },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '0.35rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.65rem 0.9rem',
    border: '1.5px solid #e2e8f0',
    borderRadius: 8,
    fontSize: '0.9rem',
    color: '#1e293b',
    background: '#f8fafc',
    marginBottom: '1rem',
    transition: 'border-color 0.15s',
    fontFamily: "'DM Sans', sans-serif",
  },
  textarea: {
    resize: 'vertical' as const,
    minHeight: 100,
  },
  tujuanRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  tujuanNum: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: '#6366f1',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 700,
    flexShrink: 0,
  },
  removeBtn: {
    padding: '0.35rem 0.6rem',
    background: 'transparent',
    border: '1.5px solid #fca5a5',
    borderRadius: 6,
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  addBtn: {
    padding: '0.65rem 1.1rem',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.85rem',
    whiteSpace: 'nowrap' as const,
    fontFamily: "'DM Sans', sans-serif",
  },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    padding: '0.9rem 1.1rem',
    marginBottom: '1rem',
  },
  fileIcon: {
    fontSize: '1.6rem',
  },
  fileLink: {
    fontSize: '0.8rem',
    color: '#6366f1',
    textDecoration: 'underline',
  },
  btn: {
    padding: '0.7rem 1.6rem',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: 9,
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
  },
  btnOutline: {
    padding: '0.65rem 1.3rem',
    background: 'transparent',
    color: '#6366f1',
    border: '1.5px solid #6366f1',
    borderRadius: 9,
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif",
  },
  btnDisabled: {
    padding: '0.7rem 1.6rem',
    background: '#cbd5e1',
    color: '#94a3b8',
    border: 'none',
    borderRadius: 9,
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'not-allowed',
    fontFamily: "'DM Sans', sans-serif",
  },
  hint: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    marginTop: '0.5rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '1rem',
  },
};