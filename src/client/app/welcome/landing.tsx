import React, { useEffect, useState } from 'react';
import { strip } from '~/scrubbers/ImageScrubber';
import { scrubPDF } from '~/scrubbers/PdfScrubber'; 
import { useNavigate } from 'react-router';
import { Styles } from 'app/Style';
// Define a proper interface for the styles


// const scrub = (file : File) : File => {
//   return ImageScrubber.strip(file)
// }

export const Landing: React.FC = () => {
    const navigate = useNavigate();     
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
        navigate('/editor', { state: { type: "PDF", file: inputFile } });
        scrubPDF(inputFile).then(setOutputFile);
    } else if (['jpg', 'jpeg'].includes(fileType)) {
        navigate('/editor', { state: { type: "Image", file: inputFile } });
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
