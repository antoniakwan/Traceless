import React, { useState } from 'react';
import "./about.css";
import rectangle from "../images/BackgroundRectangle.svg";


export const About: React.FC = () => {
  return <div className = "page">
    <div className="overlap-group">
      
      <img className="rectangle" alt="rectangle" src={rectangle} />

      <div className="text-wrapper-2"></div>
      <div className="text-wrapper-3">About Traceless.io.</div>
      <div className="text-wrapper-4">IEOJWOFEJOEIFJe.</div>


      

      <div className="about1" >
        Traceless.io is a website where you can upload pdfs or images in order
        to analyze the information that can be gleaned from it to be aware of
        what information is being shared to remove information you are
        uncomfortable sharing.
      </div>
      
      
      <div className="about2" />
  
      {/* <div className="text-wrapper-9">traceless.io</div> */}

      <div className="bgr" />
    </div>
  </div>
}
