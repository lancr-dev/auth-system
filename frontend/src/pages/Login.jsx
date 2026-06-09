import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import api from '../services/api';
import useAuth from '../hooks/useAuth';

import '../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await api.post('/auth/login', formData);

      login(response.data.data); // <-- IMPORTANT FIX

      toast.success(response.data.message);

      // wait one tick so React commits state
      setTimeout(() => {
        navigate('/dashboard');
      }, 0);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1 className='auth-title'>Welcome Back</h1>

        <form onSubmit={handleSubmit}>
          <div className='auth-group'>
            <label>Email</label>

            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='auth-group'>
            <label>Password</label>

            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className='auth-button' type='submit' disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='auth-footer'>
          Don't have an account? <Link to='/register'>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
