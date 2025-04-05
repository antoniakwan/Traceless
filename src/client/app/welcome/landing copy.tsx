import React, { useEffect, useState } from 'react';
import { strip, edit } from '~/scrubbers/ImageScrubber';
import { scrubPDF } from '~/scrubbers/PdfScrubber'; 
import { useNavigate } from 'react-router';
import { Styles } from 'app/Style';
import axios from 'axios';
import "./style.css";
// import tempimagewknoed1 from "/Users/antoniakwan/CougHacks25/src/client/app/Screenshot_2025-04-04_at_6.59.20_PM-removebg-preview.png";
// import union from "/Users/antoniakwan/CougHacks25/src/client/app/Union.svg";
// import vector from "/Users/antoniakwan/CougHacks25/src/client/app/Vector.svg";
// import rectangle from "/Users/antoniakwan/CougHacks25/src/client/app/Rectangle 4936.svg";
// import { PoopButtFart } from './poopbuttfart'; // 🆕 Import the new page


const About : React.FC = () => {
  return <>About</>
}

const JPGEditor : React.FC = () => {
  return <>JPGEditor</>
}

const PDFEditor : React.FC = () => {
  return <>PDFEditor</>
}

const Home : React.FC = () => {
  return <>Home</>
}

type PageState = 'About' | 'Home' | 'JPGEditor' | 'PDFEditor'

const Navbar : React.FC<{setPage : ((a : PageState) => void)}> = ({setPage}) => {
  return <div className="Navbar">
    <button onClick={() => setPage('Home')}>
      Home
    </button>
    <button onClick={() => setPage('About')}>
      About
    </button>
  </div>
}

export const App : React.FC = () => {
  const [page, setPage] = useState<PageState>('Home')
  const toRender = {
    About : <About/>,
    Home : <Home/>,
    JPGEditor : <JPGEditor/>,
    PDFEditor : <PDFEditor/>
  }
  return <>
    <Navbar setPage={setPage}/>
    {toRender[page]}
  </>
}

// export const Home: React.FC = () => {  
//   const [inputFile, setInputFile] = useState<File | null>(null);
//   const [fixed, setFixed] = useState<boolean>(false);
//   const [outputFile, setOutputFile] = useState<Blob | null>(null);
//   const [showHome, setGoHome] = useState(false); // 🆕 Page toggle
//   const [showPoopButtFart, setGoPoopButtFart] = useState(false); // 🆕 Page toggle
//   const [transmit, setTransmit] = useState<boolean>(false)

//   const goPoopButtFart = () => {
//     setGoPoopButtFart(true);
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     setInputFile(event.target.files ? event.target.files[0] : null);
//     setFixed(false);
//   };

//   const goHome = () => {
//     console.log("Pressed")
//     setGoHome(true);
//   };

//   const handleDownload = () => {
//     if (!inputFile || !outputFile) return;
//     const url = URL.createObjectURL(outputFile);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = inputFile.name;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleUpload = (): void => {
//     console.log("Upload button pressed.");
//     setFixed(true);
//   };    

//   useEffect(() => {
//     if (!fixed) return
//     if (!inputFile) return

//     const fileType : string | undefined = inputFile.name.split(".").pop();
//     if (!fileType) return;
//     if (fileType === "pdf"){
//       console.log("Navigating appropriately.")
//       navigate('/editor', { state: { type: "PDF", file: inputFile } });
//       // scrubPDF(inputFile).then(setOutputFile);
//     } else if (['jpg', 'jpeg'].includes(fileType)) {
//       navigate('/ImageEditor', { state: { type: "Image", file: inputFile } });
//       edit(inputFile, "Mark Pock", "Canon", "Hello World", 0, 100, new Date(Date.now()), -7).then(setOutputFile)
//       // strip(inputFile).then(setOutputFile)
//     }
//   }, [fixed, inputFile])

//   useEffect(() => {
//     console.log("transmit was " + transmit)
//     if (!transmit) return
//     if (!inputFile) return
//     const formData = new FormData();
//     formData.append('file', inputFile); // 'file' is the name of the field you want to send

//     axios.post('http://127.0.0.1:5000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Tell the server that the body contains a file
//       },
//     })
//     // axios.post('http://127.0.0.1:5000/upload', {file : inputFile})
//     .then(() => console.log("Good.")).catch(e => console.error(e))
//   }, [transmit, inputFile])

//   const transmitImage = () => {
//     console.log("Button clicked.")
//     if (!inputFile) return
//     setTransmit(true)
//   }

//   useEffect(() => {
//     console.log("transmit was " + transmit)
//     if (!transmit) return
//     if (!inputFile) return
//     const formData = new FormData();
//     formData.append('file', inputFile); // 'file' is the name of the field you want to send

//     axios.post('http://127.0.0.1:5000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Tell the server that the body contains a file
//       },
//     }).then(() => console.log("Good."))
//       .catch(e => console.error(e))
//   }, [transmit, inputFile])

//   // 🧠 Show the alternate page if toggled
//   if (!showHome) {
//     return <PoopButtFart />;
//   }

//   return (
    
//     <div className="page">
//       <div className="overlap-group">
//         <div className="div" />
//         <img className="rectangle" alt="rectangle" src={rectangle} />
//         <div className="text-wrapper">Clean Files. Clean Slate.</div>


//         <button className="union" onClick={goHome}>
//           Hello.
//           <img src={union} alt="Union" style={{ width: '100%', height: '100%' }} />
//         </button>
//         <button className="text-wrapper-8" onClick={goPoopButtFart}>About</button>
        
//         <input
//           id="inputbox"
//           type="file"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />

//         <div className="text-wrapper-9">traceless.io</div>


//         <div className="text-wrapper-2">Own your presence.</div>
//         <div className="text-wrapper-3">Own your presence.</div>
//         <div className="text-wrapper-4">Own your presence.</div>

//         <div className="text-wrapper-5">Guard your privacy.</div>

//         <p className="p">click here to upload files</p>

//         <div className="text-wrapper-6">erase your trace.</div>

//         <img className="vector" alt="Vector" src={vector} />

//         <div className="rectangle-2" />
//         <div className="rectangle-3" />
//         <label htmlFor="inputbox" className="rectangle-empty" />
    
//       </div>
//     </div>
//   );
// };


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