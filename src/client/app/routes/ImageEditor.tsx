import React, { useState } from 'react';
import '../../CSS/PDF.css';
const ImageComponent = () => {
    const [privacyLevel, setPrivacyLevel] = useState('standard');
    const [formData, setFormData] = useState({
        fileName: '',
        DateTime: '',
        Timezone: '',
        Location: '',
        Description: '',
        Artist: '',
        HostComputer: '',
        Software: '',
    })

  const handleToggle = (level: string) => {
    setPrivacyLevel(level);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleContinue = () => {
    console.log(`Privacy Level Selected: ${privacyLevel}`);
    if (privacyLevel === 'editor') {
      console.log('Form Data:', formData);
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
              <label>Date/Time</label>
              <input 
                type="text" 
                name="DateTime" 
                value={formData.DateTime}
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
              <label>Location</label>
              <input 
                type="text" 
                name="Location" 
                value={formData.Location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                name="Description" 
                value={formData.Description}
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
              <label>Host Computer</label>
              <input 
                type="date" 
                name="HostComputer" 
                value={formData.HostComputer}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Software</label>
              <input 
                type="date" 
                name="Software" 
                value={formData.Software}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        
        <div className="button-container">
          <button className="continue-button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;