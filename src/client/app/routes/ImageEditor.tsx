import React, {useState } from 'react';
import '../../CSS/PDF.css';
import {strip, edit, wipeAll} from '../scrubbers/ImageScrubber';
import { useLocation } from 'react-router';

const ImageComponent = () => {
    const [privacyLevel, setPrivacyLevel] = useState('standard');
    const [formData, setFormData] = useState({
        fileName: '',
        Timezone: 0,
        Latitude: 0,
        Longitude: 0,
        Artist: '',
        Make: '',
        Model: '',
    })

    const location = useLocation();
    const { file } = location.state || {};
    const fileExtension = (file instanceof File)? (file.name.split(".").pop()) : ".blank";
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
    //console.log(`Privacy Level Selected: ${privacyLevel}`);
    if(file === null) {
        throw "cannot have empty file";
    }

    if (privacyLevel === 'editor') {   
        const cleanedFile = edit(
            file,
            formData.Artist,
            formData.Make,
            formData.Model,
            formData.Latitude,
            formData.Longitude,
            formData.Timezone
          );
          
          cleanedFile.then(blob => {
            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob);
            
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `cleaned_${baseName}.${fileExtension}`; // Set your desired filename
            
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
    else if(privacyLevel === 'standard'){
        const cleaned_file = strip(file);
        cleaned_file.then(blob => {
            const blobUrl = URL.createObjectURL(blob)
            // Create a URL for the blob 
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `cleaned_file.${fileExtension}`; // Set your desired filename
            
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
        //Download
        const cleaned_file = wipeAll(file);
        cleaned_file.then(blob => {
            const blobUrl = URL.createObjectURL(blob)
            // Create a URL for the blob 
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `cleaned_file.${fileExtension}`; // Set your desired filename
            
            // Append to body, click, and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Release the blob URL to free memory
            URL.revokeObjectURL(blobUrl);
          }).catch(error => {
            console.error("Error downloading file:", error);
        })
    }
  };

  return (
    <div className="container">
      <div className="header">Image</div>
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
            className={`toggle-option ${privacyLevel === 'paranoid' ? 'active' : ''}`}
            onClick={() => handleToggle('paranoid')}
          >
            paranoid
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
              <label>Timezone</label>
              <input 
                type="text" 
                name="Timezone" 
                value={formData.Timezone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Latitude</label>
              <input 
                type="text" 
                name="Latitude" 
                value={formData.Latitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input 
                type="text" 
                name="Longitude" 
                value={formData.Longitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Artist</label>
              <input 
                type="text" 
                name="Artist" 
                value={formData.Artist}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Make</label>
              <input 
                type="text" 
                name="Make" 
                value={formData.Make}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input 
                type="text" 
                name="Model" 
                value={formData.Model}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        
        <div className="button-container">
          <button className="continue-button" onClick={handleContinue} disabled={!file}>
          Download Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;