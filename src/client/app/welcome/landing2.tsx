import React, { useEffect, useState } from 'react';
import { ImageScrubber } from '~/scrubbers/ImageScrubber';
import "./style.css";
import tempimagewknoed1 from "/Users/antoniakwan/CougHacks25/src/client/app/Screenshot_2025-04-04_at_6.59.20_PM-removebg-preview.png";
import union from "/Users/antoniakwan/CougHacks25/src/client/app/Union.svg";
import vector from "/Users/antoniakwan/CougHacks25/src/client/app/Vector.svg";
import rectangle from "/Users/antoniakwan/CougHacks25/src/client/app/Rectangle 4936.svg";

export const Page: React.FC = () => {
    const [inputFile, setInputFile] = useState<File | null>(null);
  const [fixed, setFixed] = useState<boolean>(false);
  const [outputFile, setOutputFile] = useState<Blob | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    setInputFile(event.target.files ? event.target.files[0] : null)
    setFixed(false)
  }

  const handleDownload = () => {
    if (!inputFile) return
    if (!outputFile) return
  
    const url = URL.createObjectURL(outputFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = inputFile.name;
    a.click();
    URL.revokeObjectURL(url);
  }


  const handleUpload = () : void => {
    console.log("Upload button pressed.")
    setFixed(true)
  }

  useEffect(() => {
    if (!fixed) return
    if (!inputFile) return
    ImageScrubber.strip(inputFile).then(b => setOutputFile(b))
  }, [fixed, inputFile])

  return (
    <div className="page">
      <div className="overlap-group">
        <div className="div" />
        <img className="rectangle" alt="rectangle" src={rectangle} />
        <div className="text-wrapper">Clean Files. Clean Slate.</div>

        <div className="text-wrapper-2">Own your presence.</div>
        <div className="text-wrapper-3">Own your presence.</div>
        <div className="text-wrapper-4">Own your presence.</div>

        <div className="text-wrapper-5">Guard your privacy.</div>

        <p className="p">click here to upload files</p>

        <div className="text-wrapper-6">erase your trace.</div>

        <img className="vector" alt="Vector" src={vector} />

        <div className="rectangle-2" />
        <div className="rectangle-3" />
        <label htmlFor="inputbox" className="rectangle-empty" />
        <input
          id="inputbox"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <img className="union" alt="Union" src={union} />

        <div className="text-wrapper-7">FAQ</div>
        <div className="text-wrapper-8">About</div>
        <div className="text-wrapper-9">traceless.io</div>

        <img
          className="tempimagewknoed"
          alt="Tempimagewknoed"
          src={tempimagewknoed1}
        />
      </div>
    </div>
  );
};