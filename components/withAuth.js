// components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../utils/auth';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn()) {
        router.replace('/login');
      }
    }, []);

    return isLoggedIn() ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
