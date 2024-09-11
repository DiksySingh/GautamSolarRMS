import React, { useState } from 'react';
import Home from '../Home/Home';
import AddDevice from '../AddDevice/AddDevice';
import History from '../History/History';
import './Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('home'); 

  
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'add-device':
        return <AddDevice />;
      case 'history':
        return <History />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <ul className="navbar-menu">
          <li
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            Home
          </li>
          <li
            className={activeTab === 'add-device' ? 'active' : ''}
            onClick={() => setActiveTab('add-device')}
          >
            Add Device
          </li>
          <li
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            History
          </li>
        </ul>
      </nav>

     
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
