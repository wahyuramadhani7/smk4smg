'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === '/' ||
    pathname === '/login' ||
    pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ paddingBottom: hideNavbar ? 0 : '52px' }}>
        {children}
      </div>
      {!hideNavbar && (
        <footer style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'linear-gradient(110deg, #0a1f5c 0%, #1140a0 55%, #1a55c8 100%)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          textAlign: 'center' as const,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.03em',
          }}>
            Handmade with{' '}
            <span style={{ color: '#f87171', fontSize: '0.9rem' }}>♥</span>
            {' '}by{' '}
            {['Lathifa', 'Keysya', 'Nabilla', 'Ikfina'].map((name, i, arr) => (
              <span key={name}>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
                  {name}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.35)', margin: '0 4px' }}>·</span>
                )}
              </span>
            ))}
          </p>
        </footer>
      )}
    </>
  );
}