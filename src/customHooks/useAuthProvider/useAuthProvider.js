import { useMemo } from 'react';

// Minimal auth hook: checks for a token in localStorage
// Keep this lightweight so ProtectedRoute/PublicRoutes work.
export default function useAuthProvider() {
  const isAuth = useMemo(() => {
    try {
      const token = localStorage.getItem('token');
      return Boolean(token);
    } catch (e) {
      return false;
    }
  }, []);

  return { isAuth };
}
