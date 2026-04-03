'use client';

import { useRouter } from 'next/navigation';

function clearSocietyCookies() {
  document.cookie = 'rm_demo_society_id=; path=/; max-age=0';
  document.cookie = 'rm_demo_society=; path=/; max-age=0';
}

export default function SocietySignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        clearSocietyCookies();
        if (typeof window !== 'undefined') {
          localStorage.removeItem('rm_shared_dashboard_events_v2');
        }
        router.push('/society');
      }}
      className="text-sm text-[var(--muted)] hover:text-[#DC2626] transition-colors"
    >
      Sign out
    </button>
  );
}
