import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white overflow-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
