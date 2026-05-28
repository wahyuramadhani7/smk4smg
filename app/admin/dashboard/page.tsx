'use client';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Edit Halaman Utama',
    description: 'Edit hero, sambutan, visi misi, statistik, dan upload 2 foto galeri.',
    href: '/admin/home',
    icon: '🏠',
    color: '#14b8a6',
    badge: 'Home',
  },
  {
    title: 'Profil Kurikulum',
    description: 'Edit teks, tujuan pembelajaran, dan upload dokumen PDF kurikulum.',
    href: '/admin/kurikulum',
    icon: '📘',
    color: '#6366f1',
    badge: 'Konten',
  },
  {
    title: 'Tambah Materi',
    description: 'Upload dan kelola materi pembelajaran untuk siswa.',
    href: '/admin/materi',
    icon: '📂',
    color: '#0ea5e9',
    badge: 'Materi',
  },
  {
    title: 'Edit Konten',
    description: 'Ubah teks, gambar, dan info yang tampil di halaman publik.',
    href: '/admin/konten',
    icon: '✏️',
    color: '#10b981',
    badge: 'Halaman',
  },
  {
    title: 'Kelola User',
    description: 'Tambah, edit, atau nonaktifkan akun pengguna & admin.',
    href: '/admin/users',
    icon: '👥',
    color: '#f59e0b',
    badge: 'Akun',
  },
  {
    title: 'Pengumuman',
    description: 'Buat dan publikasikan pengumuman untuk seluruh siswa.',
    href: '/admin/pengumuman',
    icon: '📣',
    color: '#ec4899',
    badge: 'Info',
  },
  {
    title: 'Laporan & Statistik',
    description: 'Pantau aktivitas dan unduh laporan penggunaan website.',
    href: '/admin/laporan',
    icon: '📊',
    color: '#8b5cf6',
    badge: 'Data',
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Sora:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .admin-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
        }
        .admin-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--card-color);
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .admin-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.09);
          border-color: var(--card-color);
        }
        .admin-card:hover::before { opacity: 1; }
        .admin-card:hover .card-arrow { transform: translateX(3px); opacity: 1; }
        .card-arrow {
          opacity: 0.4;
          transition: transform 0.18s ease, opacity 0.18s ease;
          margin-left: auto;
          color: var(--card-color);
          font-size: 1.1rem;
        }
        .card-edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border: 1.5px solid var(--card-color);
          color: var(--card-color);
          background: transparent;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          margin-top: auto;
        }
        .card-edit-btn:hover {
          background: var(--card-color);
          color: #fff;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .admin-card { animation: fadeUp 0.35s ease both; }
        .admin-card:nth-child(1) { animation-delay: 0.05s }
        .admin-card:nth-child(2) { animation-delay: 0.10s }
        .admin-card:nth-child(3) { animation-delay: 0.15s }
        .admin-card:nth-child(4) { animation-delay: 0.20s }
        .admin-card:nth-child(5) { animation-delay: 0.25s }
        .admin-card:nth-child(6) { animation-delay: 0.30s }
      `}</style>

      <Navbar />

      <main style={{
        fontFamily: "'DM Sans', sans-serif",
        background: '#f8fafc',
        minHeight: '100vh',
        paddingBottom: '4rem',
      }}>
        {/* ── Header banner ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: '3rem 2rem 2.5rem',
          borderBottom: '1px solid #1e293b',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: '#6366f1',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              SMK 4 Semarang
            </span>
            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: '#f8fafc',
              marginTop: '0.35rem',
              marginBottom: '0.5rem',
            }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Selamat datang, Admin. Pilih menu di bawah untuk mengelola konten website.
            </p>

            {/* Quick stats */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1.75rem',
              flexWrap: 'wrap',
            }}>
              {[
                { label: 'Halaman Aktif', value: '12' },
                { label: 'Materi Upload', value: '38' },
                { label: 'Total User', value: '214' },
              ].map((s) => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '0.6rem 1.1rem',
                }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', fontFamily: "'Sora', sans-serif" }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 1 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid menu ── */}
        <div style={{ maxWidth: 1100, margin: '2.5rem auto', padding: '0 1.5rem' }}>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            color: '#475569',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Menu Pengelolaan
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.1rem',
          }}>
            {menuItems.map((item) => (
              <div
                key={item.href}
                className="admin-card"
                style={{ '--card-color': item.color } as React.CSSProperties}
                onClick={() => router.push(item.href)}
              >
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: item.color + '18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#0f172a',
                      }}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: 99,
                          background: item.color + '18',
                          color: item.color,
                          letterSpacing: '0.04em',
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginTop: '0.25rem',
                      lineHeight: 1.5,
                    }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="card-arrow">→</span>
                </div>

                {/* Edit button */}
                <button
                  className="card-edit-btn"
                  onClick={(e) => { e.stopPropagation(); router.push(item.href); }}
                >
                  ✏️ Edit Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}