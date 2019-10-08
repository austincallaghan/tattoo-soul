import React from 'react';
import './about.css';
import about_feature_banner from '../../assets/about_feature_banner.jpg';

const About = () => {
  return (
    <div className="about--container">
      <div className="about--text-section">
        <h1>About</h1>

        <p>
          Tattoo Ink is the world's premiere destination for tattoo
          culture and lifestyle and the Global Booking Platform for
          reputable shops
          <br />
          <br />
          Co-founded by renowned artist and media personality Daria
          Koks, and supported by some of the most respected names in
          the industry, it is our mission to collect and share our
          appreciation for tattoo art. From curated galleries of
          inspiration, to educational articles on the craft, and
          artist recommendations -- Tattoo Ink facilitates the first
          steps in a users tattoo journey by providing the most
          important information in one place.
          <br />
          <br />
          But it doesn't stop there.
          <br />
          <br />
          Now, with the support of an impressive team of
          industryleaders and more than 30 million users across our
          network -- Tattoo Ink is bringing the industry into the
          digital age. We offer the exclusivefeature of being able to
          easily book consultations with reputable tattoo studios
          around the world, with the click of a button. This kind of
          accessability, we feel. will not only revolutionize the
          tattoo space, but help us give back to the tattoo community
          by aiding in its progress
        </p>
      </div>
      <div className="about--feature-banner">
        <img src={about_feature_banner} />
      </div>
      <div className="about--red-center">
        <div></div>
      </div>
    </div>
  );
};

export default About;
