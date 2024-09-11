import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import GaloEnergy from '../../Assets/GaloEnergy.jpeg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    Emailid: '',
    Password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    if (formData.Emailid.trim() === '' || !/\S+@\S+\.\S+/.test(formData.Emailid)) {
      newErrors.Emailid = 'Valid email is required';
      isValid = false;
    }
  
    if (formData.Password.trim() === '') {
      newErrors.Password = 'Password is required';
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  const authenticatedUser = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.Emailid === formData.Emailid && storedUser.Password === formData.Password) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const isAuthenticated = await authenticatedUser();

      if (isAuthenticated) {
        alert('Login Successful!');
        navigate('/dashboard');
      } else {
        alert('Login Failed: Invalid email or password');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="Image-container">
        <img src={GaloEnergy} alt="Galo Energy Image" className="Galo-Energy-Image" />
      </div>
      <div className="login-card">
        <h2>RMS Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-controller">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"  
              name="Emailid"
              placeholder="Email"
              onChange={handleChange}
              value={formData.Emailid}
            />
            {errors.Emailid && <p className="error">{errors.Emailid}</p>}
          </div>
          <div className="form-controller">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"  
              name="Password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.Password}
            />
            {errors.Password && <p className="error">{errors.Password}</p>}
          </div>
          <button className="datasubmit" type="submit">
            Login
          </button>
          <div className="para">
            <p>
              Not a member? <Link to="/register">Register Now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
