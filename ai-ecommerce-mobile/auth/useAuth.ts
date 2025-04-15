import { useState, useEffect } from 'react';
import { getToken } from './auth';

export function useAuth() {
  const [isAuthenticated, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken();
    setAuth(!!token);
  }, []);

  return { isAuthenticated };
}
