import React, { useEffect, useState } from 'react';
import { ImageScrubber } from '~/scrubbers/ImageScrubber';
import "./about.css";
import tempimagewknoed1 from "/Users/antoniakwan/CougHacks25/src/client/app/Screenshot_2025-04-04_at_6.59.20_PM-removebg-preview.png";
import union from "/Users/antoniakwan/CougHacks25/src/client/app/Union.svg";
import vector from "/Users/antoniakwan/CougHacks25/src/client/app/Vector.svg";
import rectangle from "/Users/antoniakwan/CougHacks25/src/client/app/Rectangle 4936.svg";

import { Page } from './landing'; // 🆕 Import the new page

export const PoopButtFart: React.FC = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [fixed, setFixed] = useState<boolean>(false);
  const [outputFile, setOutputFile] = useState<Blob | null>(null);
  const [showHome, setGoHome] = useState(false); // 🆕 Page toggle
  const [showPoopButtFart, setGoPoopButtFart] = useState(false); // 🆕 Page toggle

  const goPoopButtFart = () => {
    setGoPoopButtFart(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputFile(event.target.files ? event.target.files[0] : null);
    setFixed(false);
  };

  const goHome = () => {
    setGoHome(true);
  };

  const handleDownload = () => {
    if (!inputFile || !outputFile) return;
    const url = URL.createObjectURL(outputFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = inputFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (): void => {
    console.log("Upload button pressed.");
    setFixed(true);
  };

  useEffect(() => {
    if (!fixed || !inputFile) return;
    ImageScrubber.strip(inputFile).then((b) => setOutputFile(b));
  }, [fixed, inputFile]);

  // 🧠 Show the alternate page if toggled
  if (showPoopButtFart) {
    return <PoopButtFart />;
  }

  if (showHome) {
    return <Page />;
  }

  return (
    <div className="page">
      <div className="overlap-group">
        
        <img className="rectangle" alt="rectangle" src={rectangle} />

        <div className="text-wrapper-2">OEHOWFHOIEFJ.</div>
        <div className="text-wrapper-3">About Traceless.io.</div>
        <div className="text-wrapper-4">IEOJWOFEJOEIFJe.</div>


        <div className="rectangle-2" />
        <div className="rectangle-3" />
        <label htmlFor="inputbox" className="about1" />      
        <p className="text-wrapper">
        Traceless.io is a website where you can upload pdfs or images in order
        to analyze the information that can be gleaned from it to be aware of
        what information is being shared to remove information you are
        uncomfortable sharing
      </p>
        
        <label htmlFor="inputbox" className="about2" />

        


        {/* 👇 when clicked, flips to PoopButtFart page */}
        <button className="union" onClick={goHome}><img src={union} alt="Union" /></button>
        <button className="text-wrapper-8" onClick={goPoopButtFart}>About</button>

    
        <div className="text-wrapper-9">traceless.io</div>

      </div>
    </div>
  );
};
