'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function createUser(data: {
  email: string;
  full_name: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}) {
  try {
    const adminClient = createAdminClient();

    // Langsung buat user (tanpa cek session)
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,   // langsung confirmed
    });

    if (createError) {
      console.error("Create user error:", createError);
      return { success: false, error: createError.message };
    }

    // Insert ke tabel profiles
    const { error: profileError } = await adminClient.from('profiles').insert({
      id: newUser.user.id,
      full_name: data.full_name,
      role: data.role,
      is_active: true,
    });

    if (profileError) {
      console.error("Profile error:", profileError);
      return { success: false, error: profileError.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return { success: false, error: 'Terjadi kesalahan saat membuat user' };
  }
}

export async function updateUserStatus(userId: string, isActive: boolean) {
  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from('profiles')
    .update({ is_active: isActive })
    .eq('id', userId);
  return { success: !error, error: error?.message };
}

export async function deleteUser(userId: string) {
  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(userId);
  return { success: !error, error: error?.message };
}