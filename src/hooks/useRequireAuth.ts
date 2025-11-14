import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireAuth = (requiredRole?: 'admin' | 'master') => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    if (requiredRole === 'master' && (userRole !== 'master' || !userId)) {
      navigate('/login');
      return;
    }

    if (requiredRole === 'admin' && userRole !== 'admin') {
      navigate('/login');
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      navigate('/login');
    }
  }, [navigate, requiredRole]);
};
