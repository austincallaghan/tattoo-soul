import React from 'react';

import './landing.css';

import landing_banner from '../../assets/landing_banner.jpg';

const Landing = () => (
  <div className="landing--container">
    <div className="landing--black"></div>
    <div className="landing--banner">
      <img src={landing_banner} />
    </div>

    <div className="landing--center-form">
      <h1>Find Your Tattoo Artist</h1>
      <div className="landing--interactives">
        <input
          type="text"
          placeholder="Search for tattoos, cities, studios & artists"
        ></input>
        <div>
          <span>Search --></span>
        </div>
      </div>
      <div>Near to: Unimplimented</div>
    </div>
  </div>
);

export default Landing;
