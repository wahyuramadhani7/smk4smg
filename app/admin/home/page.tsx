'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface HomeContent {
  id?: string;
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
  hero_bg_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070',
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
  foto1_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800',
  foto1_caption: 'Kegiatan Praktik Siswa',
  foto2_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
  foto2_caption: 'Suasana Pembelajaran',
};

type ToastType = 'success' | 'error' | 'info';
function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: '#22c55e', error: '#ef4444', info: '#3b82f6' };
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      background: '#1e293b', color: '#f8fafc',
      padding: '0.85rem 1.4rem', borderRadius: 10,
      borderLeft: `4px solid ${colors[type]}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      zIndex: 9999, fontFamily: "'DM Sans',sans-serif", fontSize: '0.9rem', maxWidth: 340,
      animation: 'slideIn 0.25s ease',
    }}>{message}</div>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={S.card}>
      <h2 style={S.cardTitle}><span style={S.dot} />{title}</h2>
      {children}
    </section>
  );
}

// ── Image upload box ────────────────────────────────────────────────────────
function ImageUpload({
  label, url, caption, bucket, prefix,
  onUrlChange, onCaptionChange,
}: {
  label: string; url: string; caption: string;
  bucket: string; prefix: string;
  onUrlChange: (v: string) => void;
  onCaptionChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setToast({ message: 'Hanya file gambar.', type: 'error' }); return; }
    if (file.size > 5 * 1024 * 1024) { setToast({ message: 'Maks 5 MB.', type: 'error' }); return; }

    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${prefix}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
    if (error) { setToast({ message: 'Upload gagal: ' + error.message, type: 'error' }); setUploading(false); return; }
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    onUrlChange(data.publicUrl);
    setUploading(false);
    setToast({ message: 'Foto berhasil diupload!', type: 'success' });
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <label style={S.label}>{label}</label>

      {/* Preview */}
      {url && (
        <div style={{ position: 'relative', marginBottom: '0.75rem', borderRadius: 10, overflow: 'hidden', height: 180 }}>
          <img src={url} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
            padding: '0.75rem',
          }}>
            <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>{caption || '(tanpa caption)'}</span>
          </div>
        </div>
      )}

      {/* Upload */}
      <input ref={ref} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
      <button
        onClick={() => ref.current?.click()}
        disabled={uploading}
        style={uploading ? S.btnDisabled : S.btnOutline}
      >
        {uploading ? 'Mengupload…' : url ? '🔄 Ganti Foto' : '⬆ Upload Foto'}
      </button>

      {/* Or paste URL */}
      <input
        style={{ ...S.input, marginTop: '0.6rem', fontSize: '0.8rem' }}
        value={url}
        onChange={e => onUrlChange(e.target.value)}
        placeholder="Atau tempel URL gambar…"
      />

      {/* Caption */}
      <label style={{ ...S.label, marginTop: '0.5rem' }}>Caption</label>
      <input
        style={S.input}
        value={caption}
        onChange={e => onCaptionChange(e.target.value)}
        placeholder="Caption foto…"
      />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AdminHome() {
  const [content, setContent] = useState<HomeContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [newMisi, setNewMisi] = useState('');

  const showToast = (message: string, type: ToastType = 'success') => setToast({ message, type });

  useEffect(() => {
    supabase.from('home_content').select('*').limit(1).single().then(({ data, error }) => {
      if (error && error.code !== 'PGRST116') showToast('Gagal memuat data.', 'error');
      else if (data) setContent(data as HomeContent);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    const payload = { ...content, updated_at: new Date().toISOString() };
    let error;
    if (content.id) {
      ({ error } = await supabase.from('home_content').update(payload).eq('id', content.id));
    } else {
      const { data, error: ie } = await supabase.from('home_content').insert(payload).select().single();
      if (data) setContent(data as HomeContent);
      error = ie;
    }
    setSaving(false);
    if (error) showToast('Gagal: ' + error.message, 'error');
    else showToast('Berhasil disimpan!', 'success');
  }

  function set<K extends keyof HomeContent>(key: K, value: HomeContent[K]) {
    setContent(prev => ({ ...prev, [key]: value }));
  }

  function updateStat(i: number, field: 'value' | 'label', val: string) {
    const updated = [...content.stats];
    updated[i] = { ...updated[i], [field]: val };
    set('stats', updated);
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", color: '#64748b' }}>
      Memuat data…
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus, input:focus { outline: 2px solid #6366f1; outline-offset: -1px; }
        .misi-row:hover .rm-btn { opacity: 1 !important; }
        @keyframes slideIn { from { transform: translateY(12px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>

      <div style={S.page}>
        {/* ── Sidebar ── */}
        <aside style={S.sidebar}>
          <div style={S.sidebarInner}>
            <span style={S.sidebarBadge}>ADMIN</span>
            <span style={S.sidebarTitle}>Edit Home</span>
            <div style={S.divider} />
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[
                ['hero', 'Hero Section'],
                ['foto', 'Foto Galeri'],
                ['sambutan', 'Sambutan'],
                ['visi-misi', 'Visi & Misi'],
                ['statistik', 'Statistik'],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} style={S.navLink}>{label}</a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main ── */}
        <main style={S.main}>
          <header style={S.header}>
            <div>
              <h1 style={S.pageTitle}>Edit Halaman Utama</h1>
              <p style={S.pageSub}>Semua perubahan akan langsung terlihat di halaman publik.</p>
            </div>
            <button onClick={handleSave} disabled={saving} style={saving ? S.btnDisabled : S.btn}>
              {saving ? 'Menyimpan…' : '💾 Simpan Semua'}
            </button>
          </header>

          {/* ── HERO ── */}
          <Section id="hero" title="Hero Section">
            <label style={S.label}>Judul Utama</label>
            <input style={S.input} value={content.hero_title} onChange={e => set('hero_title', e.target.value)} />

            <label style={S.label}>Subjudul / Tagline</label>
            <textarea style={{ ...S.input, ...S.ta }} value={content.hero_subtitle} onChange={e => set('hero_subtitle', e.target.value)} />

            <label style={S.label}>URL Foto Background Hero</label>
            <input style={S.input} value={content.hero_bg_url} onChange={e => set('hero_bg_url', e.target.value)} placeholder="https://..." />
            {content.hero_bg_url && (
              <img src={content.hero_bg_url} alt="preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: '1rem' }} />
            )}
          </Section>

          {/* ── FOTO GALERI ── */}
          <Section id="foto" title="Foto Galeri (2 Foto)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <ImageUpload
                label="Foto 1"
                url={content.foto1_url}
                caption={content.foto1_caption}
                bucket="home-images"
                prefix="foto1"
                onUrlChange={v => set('foto1_url', v)}
                onCaptionChange={v => set('foto1_caption', v)}
              />
              <ImageUpload
                label="Foto 2"
                url={content.foto2_url}
                caption={content.foto2_caption}
                bucket="home-images"
                prefix="foto2"
                onUrlChange={v => set('foto2_url', v)}
                onCaptionChange={v => set('foto2_caption', v)}
              />
            </div>
          </Section>

          {/* ── SAMBUTAN ── */}
          <Section id="sambutan" title="Sambutan Kepala Sekolah">
            <label style={S.label}>Kutipan Sambutan</label>
            <textarea style={{ ...S.input, ...S.ta, minHeight: 100 }} value={content.sambutan_kutipan} onChange={e => set('sambutan_kutipan', e.target.value)} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={S.label}>Nama Kepala Sekolah</label>
                <input style={S.input} value={content.sambutan_nama} onChange={e => set('sambutan_nama', e.target.value)} />
              </div>
              <div>
                <label style={S.label}>Jabatan</label>
                <input style={S.input} value={content.sambutan_jabatan} onChange={e => set('sambutan_jabatan', e.target.value)} />
              </div>
            </div>
          </Section>

          {/* ── VISI ── */}
          <Section id="visi-misi" title="Visi & Misi">
            <label style={S.label}>Visi Sekolah</label>
            <textarea style={{ ...S.input, ...S.ta }} value={content.visi} onChange={e => set('visi', e.target.value)} />

            <label style={{ ...S.label, marginTop: '0.5rem' }}>Misi Sekolah</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {content.misi.map((m, i) => (
                <div key={i} className="misi-row" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={S.numBadge}>{i + 1}</span>
                  <input
                    style={{ ...S.input, marginBottom: 0, flex: 1 }}
                    value={m}
                    onChange={e => {
                      const updated = [...content.misi];
                      updated[i] = e.target.value;
                      set('misi', updated);
                    }}
                  />
                  <button
                    className="rm-btn"
                    onClick={() => set('misi', content.misi.filter((_, idx) => idx !== i))}
                    style={{ ...S.rmBtn, opacity: 0, transition: 'opacity 0.15s' }}
                  >✕</button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <input
                style={{ ...S.input, marginBottom: 0, flex: 1 }}
                value={newMisi}
                onChange={e => setNewMisi(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && newMisi.trim()) { set('misi', [...content.misi, newMisi.trim()]); setNewMisi(''); } }}
                placeholder="Tambah misi baru… (Enter)"
              />
              <button
                onClick={() => { if (newMisi.trim()) { set('misi', [...content.misi, newMisi.trim()]); setNewMisi(''); } }}
                style={S.addBtn}
              >+ Tambah</button>
            </div>
          </Section>

          {/* ── STATISTIK ── */}
          <Section id="statistik" title="Statistik / Fakta & Angka">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {content.stats.map((s, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '1rem' }}>
                  <label style={S.label}>Angka / Nilai</label>
                  <input style={S.input} value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="contoh: 1.250+" />
                  <label style={S.label}>Label</label>
                  <input style={{ ...S.input, marginBottom: 0 }} value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="contoh: Siswa Aktif" />
                </div>
              ))}
            </div>
          </Section>

          {/* ── Footer save ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
            <button onClick={handleSave} disabled={saving} style={saving ? S.btnDisabled : S.btn}>
              {saving ? 'Menyimpan…' : '💾 Simpan Semua Perubahan'}
            </button>
          </div>
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page: { display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'DM Sans',sans-serif" },
  sidebar: { width: 210, background: '#0f172a', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
  sidebarInner: { padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  sidebarBadge: { fontSize: '0.65rem', letterSpacing: '0.15em', color: '#6366f1', fontWeight: 700 },
  sidebarTitle: { fontSize: '1.1rem', fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#f8fafc' },
  divider: { height: 1, background: '#1e293b', margin: '1rem 0' },
  navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '0.83rem', padding: '0.38rem 0.6rem', borderRadius: 6 },
  main: { flex: 1, padding: '2.5rem 2.5rem 4rem', maxWidth: 900 },
  header: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  pageTitle: { fontSize: '1.7rem', fontFamily: "'Sora',sans-serif", fontWeight: 700, color: '#0f172a' },
  pageSub: { fontSize: '0.875rem', color: '#64748b', marginTop: '0.3rem' },
  card: { background: '#fff', borderRadius: 14, padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' },
  cardTitle: { display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '1rem', fontFamily: "'Sora',sans-serif", fontWeight: 600, color: '#0f172a', marginBottom: '1.25rem' },
  dot: { width: 8, height: 8, borderRadius: '50%', background: '#6366f1', display: 'inline-block', flexShrink: 0 },
  label: { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { display: 'block', width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', color: '#1e293b', background: '#f8fafc', marginBottom: '1rem', fontFamily: "'DM Sans',sans-serif" },
  ta: { resize: 'vertical', minHeight: 80 },
  numBadge: { width: 24, height: 24, borderRadius: '50%', background: '#6366f1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 },
  rmBtn: { padding: '0.35rem 0.6rem', background: 'transparent', border: '1.5px solid #fca5a5', borderRadius: 6, color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 },
  addBtn: { padding: '0.65rem 1.1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', fontFamily: "'DM Sans',sans-serif" },
  btn: { padding: '0.7rem 1.6rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 9, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 2px 8px rgba(99,102,241,0.3)' },
  btnOutline: { padding: '0.65rem 1.2rem', background: 'transparent', color: '#6366f1', border: '1.5px solid #6366f1', borderRadius: 9, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" },
  btnDisabled: { padding: '0.7rem 1.6rem', background: '#cbd5e1', color: '#94a3b8', border: 'none', borderRadius: 9, fontWeight: 600, fontSize: '0.9rem', cursor: 'not-allowed', fontFamily: "'DM Sans',sans-serif" },
};