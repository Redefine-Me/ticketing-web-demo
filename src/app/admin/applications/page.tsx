import { createAuthServerClient } from '@/supabase_lib/auth/server';
import { isAdmin, getSocietyUserDetails } from '@/supabase_lib/users';
import { getPendingSocietyAccounts, getApprovalStatuses } from '@/supabase_lib/societies';
import { fixStorageUrl } from '@/lib/utils';
import { redirect } from 'next/navigation';
import ApplicationsPageClient from './ApplicationsPageClient';

export default async function ApplicationsPage() {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !(await isAdmin(supabase, user.id))) {
    redirect('/auth?error=unauthorized');
  }

  const [pendingAccounts, approvalStatuses] = await Promise.all([
    getPendingSocietyAccounts(supabase),
    getApprovalStatuses(supabase),
  ]);

  // Fetch user details for each unique applicant
  const uniqueUserIds = Array.from(new Set(pendingAccounts.map((acc) => acc.auth_user_id)));
  const userDetailsEntries = await Promise.all(
    uniqueUserIds.map(async (userId) => {
      const details = await getSocietyUserDetails(supabase, userId);
      return [userId, details] as const;
    })
  );
  const userDetailsMap = new Map(userDetailsEntries);

  // Transform to the shape the client component expects
  const applications = pendingAccounts.map((acc) => {
    const details = userDetailsMap.get(acc.auth_user_id);
    return {
      id: acc.id,
      authUserId: acc.auth_user_id,
      societyId: acc.society_id,
      societyName: acc.societies?.name ?? 'Unknown Society',
      societyImageUrl: fixStorageUrl(acc.societies?.image_url),
      universityName: acc.societies?.universities?.name ?? null,
      instagramHandle: acc.societies?.instagram_handle ?? null,
      appliedAt: acc.created_at,
      userName: details?.name ?? null,
      userEmail: details?.email ?? null,
    };
  });

  const statuses = approvalStatuses.map((s) => ({
    id: s.id,
    name: s.name,
  }));

  return (
    <ApplicationsPageClient
      initialApplications={applications}
      approvalStatuses={statuses}
    />
  );
}
