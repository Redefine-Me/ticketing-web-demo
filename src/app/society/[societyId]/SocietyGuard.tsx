'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SocietyGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rm_demo_society');
    if (!saved) {
      localStorage.clear();
      router.replace('/society');
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  return <>{children}</>;
}
