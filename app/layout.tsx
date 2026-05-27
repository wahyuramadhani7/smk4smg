// app/layout.tsx
import './globals.css';
import LayoutClient from './components/LayoutClient';

export const metadata = {
  title: 'SMK 4 SMG | Sekolah Menengah Kejuruan Unggul',
  description: 'SMK 4 Semarang - Pendidikan Vokasi Berbasis Industri',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 font-sans">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}