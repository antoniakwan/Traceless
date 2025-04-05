import React, { useEffect, useState } from 'react';
import { ImageScrubber } from '~/scrubbers/ImageScrubber';
import {scrubPDF} from '~/scrubbers/PdfScrubber'; 
// Define a proper interface for the styles
interface Styles {
  container: React.CSSProperties;
  card: React.CSSProperties;
  input: React.CSSProperties;
  buttons: React.CSSProperties;
  button: React.CSSProperties;
}

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
    const fileType: string | undefined = inputFile.name.split(".").pop();
    if(!fileType) return;
    else if(fileType === "pdf"){
        scrubPDF(inputFile).then(b => setOutputFile(b));
    }
    else if(['jpg', 'jpeg'].includes(fileType)){
        ImageScrubber.strip(inputFile).then(b => setOutputFile(b))
    }
  }, [fixed, inputFile])

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Upload and Download Files</h2>
        <label htmlFor="inputbox">{inputFile ? "" : "No file selected"}</label>
    
        <input
          id="inputbox"
          type="file"
          onChange={handleFileChange}
          style={styles.input}

        />
        <div style={styles.buttons}>
          <button onClick={handleDownload} style={styles.button} disabled={!inputFile}>
            Download File
          </button>
          <button disabled={!inputFile} style={styles.button} onClick={handleUpload}>
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
  },
  card: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    color: 'black',
  },
  input: {
    marginBottom: '20px',
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: 'black',
    display : '',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
  },
};

