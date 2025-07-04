'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(WrappedComponent: React.ComponentType) {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check for the auth token in localStorage
      const token = localStorage.getItem('authToken');

      // If no token is found, redirect to the login page
      if (!token) {
        router.replace('/login');
      } else {
        // If token exists, stop loading
        setIsLoading(false);
      }
    }, [router]);

    // While checking for the token, show a loading state or nothing
    if (isLoading) {
      return null;
    }

    // If token exists, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}
