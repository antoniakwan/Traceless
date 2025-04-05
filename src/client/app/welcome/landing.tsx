import React, { useEffect, useState } from 'react';
import { strip } from '~/scrubbers/ImageScrubber';
import { scrubPDF } from '~/scrubbers/PdfScrubber'; 
// Define a proper interface for the styles


// const scrub = (file : File) : File => {
//   return ImageScrubber.strip(file)
// }

export const Landing: React.FC = () => {
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

    const fileType : string | undefined = inputFile.name.split(".").pop();
    if (!fileType) return;
    if (fileType === "pdf"){
      scrubPDF(inputFile).then(setOutputFile);
    } else if (['jpg', 'jpeg'].includes(fileType)) {
      strip(inputFile).then(setOutputFile)
    }
  }, [fixed, inputFile])

  return (
    <div style={Styles.container}>
      <div style={Styles.card}>
        <h2>Upload and Download Files</h2>
        <label htmlFor="inputbox">{inputFile ? "" : "No file selected"}</label>
    
        <input
          id="inputbox"
          type="file"
          onChange={handleFileChange}
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
      </div>
    </div>
  );
};


namespace Styles {
  export const container : React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
  }

  export const card : React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    color: 'black',
  }

  export const input : React.CSSProperties = {
    marginBottom: '20px',
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: 'black',
    display : '',
  }

  export const buttons : React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
  }

  export const button : React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
  }
}