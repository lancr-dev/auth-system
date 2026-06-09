import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../services/api';

import '../styles/auth.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', formData);

      toast.success(response.data.message);

      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1 className='auth-title'>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div className='auth-group'>
            <label>Name</label>

            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <button className='auth-button' type='submit'>
            Register
          </button>
        </form>

        <div className='auth-footer'>
          Already have an account? <Link to='/'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
