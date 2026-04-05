import { createAuthServerClient } from '@/supabase_lib/auth/server';
import { isAdmin } from '@/supabase_lib/users';
import { getSocieties } from '@/supabase_lib/societies';
import { redirect } from 'next/navigation';
import UserRolesPageClient from './UserRolesPageClient';

export default async function UserRolesPage() {
  const supabase = await createAuthServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !(await isAdmin(supabase, user.id))) {
    redirect('/auth?error=unauthorized');
  }

  const societies = await getSocieties();
  return <UserRolesPageClient societies={societies} />;
}
