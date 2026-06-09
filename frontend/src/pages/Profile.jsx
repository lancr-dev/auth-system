import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

import '../styles/profile.css';

const Profile = () => {
  const { user, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put('/users/profile', formData);

      refreshUser(response.data.data);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className='profile-container'>
        <div className='profile-card'>
          <h1>My Profile</h1>

          <form onSubmit={handleSubmit}>
            <div className='profile-group'>
              <label>Name</label>

              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className='profile-group'>
              <label>Email</label>

              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <button className='profile-button' type='submit'>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
