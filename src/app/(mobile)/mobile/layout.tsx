import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { MobileProviders } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'RedefineMe — Discover University Events',
  description: 'Discover, like, and attend society events at your university.',
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} mobile-root antialiased bg-white dark:bg-[#1A1A1C]`}
    >
      <MobileProviders>{children}</MobileProviders>
    </div>
  );
}
