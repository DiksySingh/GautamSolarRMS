import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Registration from './Pages/RegistrationPage/Registration';
import Dashboard from './Components/Dashboard/Dashboard'


const App = () => {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
