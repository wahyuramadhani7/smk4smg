import './globals.css';
import Navbar from './components/Navbar';

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}