import { useState } from 'react';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import api from '../services/api';

import '../styles/profile.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.put('/users/change-password', formData);

      toast.success(response.data.message);

      setFormData({
        currentPassword: '',
        newPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className='profile-container'>
        <div className='profile-card'>
          <h1>Change Password</h1>

          <form onSubmit={handleSubmit}>
            <div className='profile-group'>
              <label>Current Password</label>
              <input
                type='password'
                name='currentPassword'
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className='profile-group'>
              <label>New Password</label>
              <input
                type='password'
                name='newPassword'
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className='profile-button' type='submit' disabled={loading}>
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
