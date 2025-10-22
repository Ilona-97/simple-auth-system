'use client';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false, callbackUrl: '/' });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={loading}>
      {loading ? 'Logout...' : 'Logout'}
    </button>
  );
}
