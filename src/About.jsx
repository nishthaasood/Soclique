import React from "react";
import "./About.css";

function About() {
  return (
    
    <div className="about-container">
    <h1 className="about-title">Connect With The Team</h1>
      <div className="photo-grid">
        <div className="item orange">
          <img src="./src/assets/arshia.jpeg" alt="Fashion 1" />
        </div>
        <div className="item green">
          <img src="./src/assets/nishtha.jpeg" alt="Fashion 2" />
        </div>
        <div className="item yellow">
          <img src="./src/assets/mansi.jpeg" alt="Fashion 3" />
        </div>
        <div className="item blue">
          <img src="./src/assets/aadhya.jpeg" alt="Fashion 4" />
        </div>
        <div className="item red">
          <img src="./src/assets/janvi.jpeg" alt="Fashion 5" />
        </div>
        <div className="item teal">
          <img src="./src/assets/upasna.jpeg" alt="Fashion 6" />
        </div>
      </div>
    </div>
  );
}

export default About;
