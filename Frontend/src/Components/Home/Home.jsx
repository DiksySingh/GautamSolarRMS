import React from 'react';
import GaloEnergy from '../../Assets/GaloEnergy.jpeg';
import './Home.css';
import Galo from '../../Assets/GaloEnergy.jpeg';

const Home = () => {
  return (
    <>
    <div className="Image-container">
        <img src={GaloEnergy} alt="Galo Energy Image" className="Galo-Energy-Image" />
      </div>

      </>

  );
};

export default Home;
