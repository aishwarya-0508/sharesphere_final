import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};
