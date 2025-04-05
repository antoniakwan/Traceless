import React, { useState } from 'react';
import "./about.css";
import union from "../images/Union.svg";
import rectangle from "../images/Rectangle.svg";

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
      <div className="text-wrapper-3">About Traceless.io</div>
      
      <div className="rectangle-3" />
      <div className="about1">
        <p style={{ marginLeft: '10px', marginTop: "20px", fontSize: '25px' }}>Traceless.io is a platform where you can upload PDFs or 
        images to analyze the information they contain. This helps you understand what data is being shared, so you can identify and remove 
        any details you're uncomfortable disclosing.</p>
      </div>
      
      <div className="about2">
        <p style={{ marginLeft: '10px', marginTop: "20px", fontSize: '25px' }}>Traceless.io is a website where you can upload <br /> PDFs or 
          images in order to analyze the information <br /> that can be gleaned 
          from it to be aware of what information is being shared and remove information you are uncomfortable sharing.</p>
      </div>

      <button className="union" onClick={() => setGoHome(true)}><img src={union}/></button>
      <button className="text-wrapper-8" onClick={() => setGoHome(false)}>About</button>
  
      <div className="text-wrapper-9">traceless.io</div>
    </div>
  </div>
}
