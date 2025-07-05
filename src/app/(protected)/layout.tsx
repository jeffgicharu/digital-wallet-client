'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Wait until the auth state is determined
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // While checking auth, show nothing to prevent flashes of content
  if (isLoading || !isAuthenticated) {
    return null;
  }

  // If authenticated, show the header and page content
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}