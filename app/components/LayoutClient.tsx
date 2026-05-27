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
      {children}
    </>
  );
}