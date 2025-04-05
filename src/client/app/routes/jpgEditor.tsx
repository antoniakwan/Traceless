import React, { useState, useEffect } from 'react';
import './editor.css';
import { strip, edit, wipeAll } from '../scrubbers/ImageScrubber';
import axios from 'axios';
import { ImageService } from './imageService';

export const JPGEditor: React.FC<{ inputFile: File }> = ({ inputFile }) => {
  const [privacyLevel, setPrivacyLevel] = useState('standard');
  const [transmit, setTransmit] = useState(false);
  const [formData, setFormData] = useState({
    fileName: '',
    Timezone: 0,
    Latitude: 0,
    Longitude: 0,
    Artist: '',
    Make: '',
    Model: '',
    Watermark: undefined
  })

  const handleToggle = (level: string) => {
    setPrivacyLevel(level);
  };

  const handleScan = () => {
    setTransmit(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (!transmit) return
    const formData = new FormData();
    formData.append('file', inputFile); // 'file' is the name of the field you want to send

    axios.post('http://127.0.0.1:5000/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Tell the server that the body contains a file
      },
    })
    .then(r => {console.log("Happy path"); console.log(r)}).catch(e => {console.error("Not so happy path"); console.error(e)})
  }, [transmit, inputFile])

  const handleContinue = () => {

    if (privacyLevel === 'editor') {
        if(formData.Watermark !== null){
            if (privacyLevel === 'editor') {
                // First watermark the file using our backend service
                const imageService = new ImageService(); // Create an instance of the service
                
                // Need to watermark before other processing
                const watermarkPromise = imageService.addWatermark(inputFile, "Your Watermark Text");
                
                watermarkPromise.then(watermarkedImageUrl => {
                  // Fetch the watermarked image
                  return fetch(watermarkedImageUrl)
                    .then(response => response.blob())
                    .then(watermarkedBlob => {
                      // Create a File object from the blob to pass to the edit function
                      const watermarkedFile = new File([watermarkedBlob], inputFile.name, { type: inputFile.type });
                      
                      // Continue with your existing edit function using the watermarked file
                      return edit(
                        watermarkedFile,
                        formData.Artist,
                        formData.Make,
                        formData.Model,
                        formData.Latitude,
                        formData.Longitude,
                        formData.Timezone
                      );
                    });
                })
                .then(blob => {
                  // Create a URL for the blob
                  const blobUrl = URL.createObjectURL(blob);
                  // Create a download link
                  const downloadLink = document.createElement('a');
                  downloadLink.href = blobUrl;
                  downloadLink.download = `cleaned_watermarked_${inputFile.name}`;
                  // Append to body, click, and remove
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                  // Release the blob URL to free memory
                  URL.revokeObjectURL(blobUrl);
                })
                .catch(error => {
                  console.error("Error in watermarking process:", error);
                  alert("Failed to watermark and process the image.");
                });
              } else {
                // Your existing code for other privacy levels
                const cleanedFile = edit(
                  inputFile,
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
                  downloadLink.download = `cleaned_${inputFile.name}`;
                  // Append to body, click, and remove
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                  // Release the blob URL to free memory
                  URL.revokeObjectURL(blobUrl);
                });
            }
        }
        else{
            const cleanedFile = edit(
            inputFile,
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
            downloadLink.download = `cleaned_${inputFile.name}.jpg`;

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
    }
    else if (privacyLevel === 'standard') {
      strip(inputFile).then(blob => {
        const blobUrl = URL.createObjectURL(blob)
        // Create a URL for the blob 
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = `cleaned_${inputFile.name}.jpg`;

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
    else {
      //Download
      const cleaned_file = wipeAll(inputFile);
      cleaned_file.then(blob => {
        const blobUrl = URL.createObjectURL(blob)
        // Create a URL for the blob 
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = `cleaned_${inputFile.name}.jpg`;

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
          <div
            className={`toggle-option ${privacyLevel === 'AI' ? 'active' : ''}`}
            onClick={() => handleToggle('AI')}
          >
            AI scan
          </div>
        </div>
        {privacyLevel === 'AI' && (
          <div className="button-container">
          <button className="continue-button" onClick={handleScan} disabled={!inputFile}>
            Ai SCAN
          </button>
        </div> 
        )}

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
            <div className="form-group">
              <label>Watermark</label>
              <input
                type="text"
                name="Watermark"
                value={formData.Watermark}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        <div className="button-container">
          <button className="continue-button" onClick={handleContinue} disabled={!inputFile}>
            Download Results
          </button>
        </div>
      </div>
    </div>
  );
};

