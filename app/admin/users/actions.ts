'use server';

import { createClient } from '@/lib/supabase/server';

export async function createUser(data: {
  email: string;
  full_name: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: adminCheck } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single();

  if (adminCheck?.role !== 'admin') {
    return { success: false, error: 'Unauthorized: Admin only' };
  }

  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  });

  if (createError) return { success: false, error: createError.message };

  const { error: profileError } = await supabase.from('profiles').insert({
    id: newUser.user.id,
    full_name: data.full_name,
    role: data.role,
    is_active: true,
  });

  if (profileError) return { success: false, error: profileError.message };

  return { success: true };
}

export async function updateUserStatus(userId: string, isActive: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('profiles')
    .update({ is_active: isActive })
    .eq('id', userId);
  
  return { success: !error };
}

export async function deleteUser(userId: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  return { success: !error };
}