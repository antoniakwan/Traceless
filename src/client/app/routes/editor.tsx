import React, { useState } from 'react';
import './editor.css'
import { useLocation } from 'react-router';
import { scrubPDF } from '../scrubbers/PdfScrubber';

const PDFComponent = () => {
  const [privacyLevel, setPrivacyLevel] = useState('standard');
  const [formData, setFormData] = useState({
    fileName: '',
    author: '',
    subject: '',
    keywords: '',
    producer: '',
    creator: '',
    createDate: '',
    modDate: ''
  });
  const location = useLocation();
  const { file } = location.state || {};
  const baseName = (file instanceof File)? (file.name.split(".").reverse()) : "NOTHING";

  const handleToggle = (level: string) => {
    setPrivacyLevel(level);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContinue = () => {    
    if(file === null) {
        throw "cannot have empty file";
    }

    if (privacyLevel === 'editor') {
        const cleanedPdf = scrubPDF(
            file,
            formData.fileName,
            formData.author,
            formData.subject,
            formData.subject.split(" "),
            formData.producer,
            formData.creator,
            new Date(formData.createDate),
            new Date(formData.modDate),
        )
        cleanedPdf.then(blob => {
            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);
            
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `cleaned_${baseName}.pdf`; // Set your desired filename
            
            // Append to body, click, and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Release the blob URL to free memory
            URL.revokeObjectURL(blobUrl);
          }).catch(error => {
            console.error("Error downloading file:", error);
          });
    }
    else{
        const cleanedPdf = scrubPDF(file);
        cleanedPdf.then(blob => {
            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);
            
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `cleaned_${baseName}.pdf`; // Set your desired filename
            
            // Append to body, click, and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Release the blob URL to free memory
            URL.revokeObjectURL(blobUrl);
          }).catch(error => {
            console.error("Error downloading file:", error);
          });
    }
  };

  return (
    <div className="container">
      <div className="header">PDF</div>
      <div className="content">
        <h2>Select Your Privacy Level</h2>
        <div className="toggle-container">
          <div
            className={`toggle-option ${privacyLevel === 'standard' ? 'active' : ''}`}
            onClick={() => handleToggle('standard')}
          >
            standard
          </div>
          <div
            className={`toggle-option ${privacyLevel === 'editor' ? 'active' : ''}`}
            onClick={() => handleToggle('editor')}
          >
            editor
          </div>
        </div>
        
        {privacyLevel === 'editor' && (
          <div className="editor-container active">
            <div className="form-group">
              <label>File Name</label>
              <input 
                type="text" 
                name="fileName" 
                value={formData.fileName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Keywords</label>
              <input 
                type="text" 
                name="keywords" 
                value={formData.keywords}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Producer</label>
              <input 
                type="text" 
                name="producer" 
                value={formData.producer}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Creator</label>
              <input 
                type="text" 
                name="creator" 
                value={formData.creator}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Create Date</label>
              <input 
                type="date" 
                name="createDate" 
                value={formData.createDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Mod Date</label>
              <input 
                type="date" 
                name="modDate" 
                value={formData.modDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        
        <div className="button-container">
          <button className="continue-button" onClick={handleContinue}>
            Download Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFComponent;
