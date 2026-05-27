'use client'

export const dynamic = 'force-dynamic'
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log("=== LOGIN ATTEMPT ===");
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Key length:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Supabase Error:", error);
        setError(error.message);
      } else {
        console.log("✅ Login Berhasil!", data);
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      console.error("❌ Catch Error:", err);
      setError("Gagal koneksi ke Supabase. Lihat console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Login Guru</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
          </div>

          {error && <p className="text-red-600 text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}