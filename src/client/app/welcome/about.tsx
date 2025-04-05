import React, { useState } from 'react';
import "./about.css";
import union from "../images/Union.svg";
import rectangle from "../images/BackgroundRectangle.svg";

import { Page } from './landing'; // 🆕 Import the new page

export const About: React.FC = () => {
  const [showHome, setGoHome] = useState(false); // 🆕 Page toggle

  if (showHome) {
    return <Page />;
  }

  return <div className="page">
    <div className="overlap-group">
      
      <img className="rectangle" alt="rectangle" src={rectangle} />

      <div className="text-wrapper-2"></div>
      <div className="text-wrapper-3">About Traceless.io.</div>
      <div className="text-wrapper-4">IEOJWOFEJOEIFJe.</div>


      <div className="rectangle-2" />
      <div className="rectangle-3" />
      <div className="about1" >
        {/* <p className="text-wrapper"> */}
        Traceless.io is a website where you can upload pdfs or images in order
        to analyze the information that can be gleaned from it to be aware of
        what information is being shared to remove information you are
        uncomfortable sharing.
        {/* </p> */}
      </div>
      
      
      <div className="about2" />

      <button className="union" onClick={() => setGoHome(true)}><img src={union} alt="Union" /></button>
      <button className="text-wrapper-8" onClick={() => setGoHome(false)}>About</button>
  
      <div className="text-wrapper-9">traceless.io</div>
    </div>
  </div>
}
