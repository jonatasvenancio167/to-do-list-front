import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

const Auth = () => {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath === '/') {
      navigate('login');
    }
  }, [currentPath, navigate]);

  return (
    <Outlet />
  );
};
export { Auth };
