'use client';

import { useRouter } from 'next/navigation';

export default function SocietySignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        localStorage.removeItem('rm_demo_society');
        localStorage.removeItem('rm_shared_dashboard_events_v2');
        router.push('/society');
      }}
      className="text-sm text-[var(--muted)] hover:text-[#DC2626] transition-colors"
    >
      Sign out
    </button>
  );
}
