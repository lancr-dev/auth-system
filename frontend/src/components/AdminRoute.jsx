import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
};

export default AdminRoute;
