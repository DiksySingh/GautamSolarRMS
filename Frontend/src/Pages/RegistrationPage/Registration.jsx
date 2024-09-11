import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import GaloEnergy from '../../Assets/GaloEnergy.jpeg';
import axios from 'axios';

export const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (formData.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('Data submitted successfully:', response.data);

      
      localStorage.setItem('userRegistered', 'true');

      alert('Registration Successful! Redirecting to login page.');
      navigate('/login');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }
};


  return (
    <div className="registration-page">
      <div className="Image-container">
      <img src={GaloEnergy} alt="Galo Energy Image" className="Galo-Energy-Image" />
      </div>
      <div className="registration-card">
        <div>
          <h2>RMS Registration</h2>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="form-controller-data">
          <label htmlFor='email'>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              onChange={handleChange}
              value={formData.email}
              disabled={loading}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-controller-data">
          <label htmlFor='username'>Username</label>
          <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          disabled={loading}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          
          <div className="form-controller-data">
          <label htmlFor='password'>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              disabled={loading}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button className="submit" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Registration;
