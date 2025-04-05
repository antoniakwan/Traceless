import React, { useState } from 'react';
import "./home.css";
import union from "../images/Union.svg";
import vector from "../images/Vector.svg";
import rectangle from "../images/Rectangle.svg";
import { About } from './about';
import fingerprint from '../images/Fingerprint.png'

import { type PageState } from './types'

export const Home : React.FC<{setPage : (p : PageState) => void, setInputFile : (f : File | null) => void}> = ({setPage, setInputFile}) => {

  
  return (
    <div className="page">
      <div className="overlap-group">
        <div className="div" />
        <img className="rectangle" alt="rectangle" src={rectangle} />
        <div className="text-wrapper">Clean Files. Clean Slate.</div>

        <input
          id="inputbox"
          type="file"
          onChange={e => setInputFile(e.target.files ? e.target.files[0] : null)}
          style={{ display: 'none' }}
        />

        <div className="text-wrapper-3">Own your presence.</div>

        <div className="text-wrapper-5">Guard your privacy.</div>

        <p className="p">click here to upload files</p>

        <div className="text-wrapper-6">erase your trace.</div>

        <img className="vector" src={vector} />

        <img className="fingerprint" src={fingerprint} />

        <button className="union" onClick={() => setPage('Home')}><img src={union} alt="Union" /></button>
        <button className="text-wrapper-8" onClick={() => setPage('About')}>About</button>
    
        <div className="text-wrapper-9">traceless.io</div>
        <div className="rectangle-3" />
        <label htmlFor="inputbox" className="rectangle-empty" />
    
      </div>
    </div>
  );
};



/*

 setInputFile(e.target.files ? e.target.files[0] : null)}
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
    if (!fixed) return
    if (!inputFile) return

    const fileType : string | undefined = inputFile.name.split(".").pop();
    if (!fileType) return;
    if (fileType === "pdf"){
      console.log("Navigating appropriately.")
      navigate('/editor', { state: { type: "PDF", file: inputFile } });
      // scrubPDF(inputFile).then(setOutputFile);
    } else if (['jpg', 'jpeg'].includes(fileType)) {
      navigate('/ImageEditor', { state: { type: "Image", file: inputFile } });
      edit(inputFile, "Mark Pock", "Canon", "Hello World", 0, 100, -7).then(setOutputFile)
      // strip(inputFile).then(setOutputFile)
    }
  }, [fixed, inputFile]
  )

  useEffect(() => {
    console.log("transmit was " + transmit)
    if (!transmit) return
    if (!inputFile) return
    const formData = new FormData();
    formData.append('file', inputFile); // 'file' is the name of the field you want to send

    axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Tell the server that the body contains a file
      },
    })
    .then(() => console.log("Good.")).catch(e => console.error(e))
  }, [transmit, inputFile])

  const transmitImage = () => {
    console.log("Button clicked.")
    if (!inputFile) return
    setTransmit(true)
  }

  useEffect(() => {
    console.log("transmit was " + transmit)
    if (!transmit) return
    if (!inputFile) return
    const formData = new FormData();
    formData.append('file', inputFile); // 'file' is the name of the field you want to send

    axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Tell the server that the body contains a file
      },
    }).then(() => console.log("Good."))
      .catch(e => console.error(e))
  }, [transmit, inputFile])

*/
