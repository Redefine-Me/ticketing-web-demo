'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSocietyByToken } from '@/lib/society-tokens';

export function SocietyTokenGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'checking' | 'invalid' | 'redirecting'>('checking');

  useEffect(() => {
    // If society already selected, go straight to dashboard
    const saved = localStorage.getItem('rm_demo_society');
    if (saved) {
      router.replace(`/society/${saved}/dashboard`);
      return;
    }

    const token = searchParams.get('token');
    if (!token) {
      setStatus('invalid');
      return;
    }

    const society = getSocietyByToken(token);
    if (!society) {
      setStatus('invalid');
      return;
    }

    // Valid token — set society and redirect
    setStatus('redirecting');
    localStorage.setItem('rm_demo_society', society.dirName);
    router.replace(`/society/${society.dirName}/dashboard`);
  }, [router, searchParams]);

  if (status === 'checking' || status === 'redirecting') {
    return (
      <div className="text-center space-y-3">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-[#DC2626] border-t-transparent" />
        <p className="text-sm text-[var(--muted)]">Loading your demo...</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-red-50 text-[#DC2626]">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-[var(--text)]">
        Invalid Demo Link
      </h1>
      <p className="text-[var(--muted)] text-sm max-w-sm mx-auto">
        This demo link is invalid or has expired. Please check the link you were given or contact us for a new one.
      </p>
    </div>
  );
}
