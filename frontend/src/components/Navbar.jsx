import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import api from '../services/api';
import useAuth from '../hooks/useAuth';

import '../styles/components.css';

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');

      logout(); // clear context state

      toast.success('Logged out successfully');

      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>Auth System</div>

      <div className='navbar-links'>
        <Link to='/dashboard'>Dashboard</Link>

        <Link to='/profile'>Profile</Link>

        <Link to='/change-password'>Change Password</Link>

        {user?.role === 'admin' && <Link to='/admin'>Admin</Link>}

        <button className='logout-button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
