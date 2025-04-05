import React, { useEffect, useState } from 'react';
import { strip, edit } from '~/scrubbers/ImageScrubber';
import { scrubPDF } from '~/scrubbers/PdfScrubber'; 
import { useNavigate } from 'react-router';
import { Styles } from 'app/Style';
import axios from 'axios';
import "./style.css";
import tempimagewknoed1 from "../Screenshot_2025-04-04_at_6.59.20_PM-removebg-preview.png";
import union from "../Union.svg";
import vector from "../Vector.svg";
import rectangle from "../Rectangle 4936.svg";
import { PoopButtFart } from './poopbuttfart'; // 🆕 Import the new page

// export const Landing: React.FC = () => {
//   const navigate = useNavigate();     
//   const [inputFile, setInputFile] = useState<File | null>(null);
//   const [fixed, setFixed] = useState<boolean>(false);
//   const [outputFile, setOutputFile] = useState<Blob | null>(null);
//   const [transmit, setTransmit] = useState<boolean>(false)

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
//     setInputFile(event.target.files ? event.target.files[0] : null)
//     setFixed(false)
//     setTransmit(false)
//   }

// }


export const Page: React.FC = () => {
  const navigate = useNavigate();  
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [fixed, setFixed] = useState<boolean>(false);
  const [outputFile, setOutputFile] = useState<Blob | null>(null);
  const [showHome, setGoHome] = useState(false); // 🆕 Page toggle
  const [showPoopButtFart, setGoPoopButtFart] = useState(false); // 🆕 Page toggle
  const [transmit, setTransmit] = useState<boolean>(false)

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
      edit(inputFile, "Mark Pock", "Canon", "Hello World", 0, 100, new Date(Date.now()), -7).then(setOutputFile)
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
    // axios.post('http://127.0.0.1:5000/upload', {file : inputFile})
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

  if (showHome) {
    return <Page />;
  }

  if (showPoopButtFart) {
    return <PoopButtFart />;
  }

  return (
    <div className="page">
      <div className="overlap-group">
        <div className="div" />
        <img className="rectangle" alt="rectangle" src={rectangle} />
        <div className="text-wrapper">Clean Files. Clean Slate.</div>

        <input
          id="inputbox"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className="text-wrapper-2">Own your presence.</div>
        <div className="text-wrapper-3">Own your presence.</div>
        <div className="text-wrapper-4">Own your presence.</div>

        <div className="text-wrapper-5">Guard your privacy.</div>

        <p className="p">click here to upload files</p>

        <div className="text-wrapper-6">erase your trace.</div>

        <img className="vector" alt="Vector" src={vector} />

        <button className="union" onClick={goHome}><img src={union} alt="Union" /></button>
        <button className="text-wrapper-8" onClick={goPoopButtFart}>About</button>
    
        <div className="text-wrapper-9">traceless.io</div>

        <div className="rectangle-2" />
        <div className="rectangle-3" />
        <label htmlFor="inputbox" className="rectangle-empty" />
    
      </div>
    </div>
  );
};


/*

<div style={Styles.container}>
      <div style={Styles.card}>
        <h2>Upload and Download Files</h2>
        <label htmlFor="inputbox">{inputFile ? "" : "No file selected"}</label>
    



        <img
          className="tempimagewknoed"
          alt="Tempimagewknoed"
          src={tempimagewknoed1}
        />
          style={Styles.input}

        />
        <div style={Styles.buttons}>
          <button onClick={handleDownload} style={Styles.button} disabled={!inputFile}>
            Download File
          </button>
          <button disabled={!inputFile} style={Styles.button} onClick={handleUpload}>
            Upload File
          </button>
        </div>

        <button onClick={transmitImage}> Sell your soul to AI </button>
  
*/