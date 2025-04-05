import { Component, type JSX, useState} from "react";
import { useLocation, useNavigate } from 'react-router';
import './CSS/PDF.css';

type Editor = {
    kind: "PDF"
    Title? : string,
    Author?: string,
    Subject?: string,
    Keywords?: string[],
    Producer?: string,
    Creator?: string,
    CreateDate?: Date,
    ModificationDate?: Date,
} | {
    kind: "Image"
};

type EditorProps = {
    Type: Editor
  };
  

type EditorState = {
/** The root square of all squares in the design */
Title? : string,
Author?: string,
Subject?: string,
Keywords?: string[],
Producer?: string,
Creator?: string,
CreateDate?: Date,
ModificationDate?: Date,
};

export default function EditorWrapper() {
    const location = useLocation();
    const navigate = useNavigate();
    const editorType = location.state?.type || "PDF";
  
    return (
      <div>
        {editorType === "PDF" && <TypeEditor />}
        //
      </div>
    );
  }
;
export const TypeEditor: React.FC = () => {
    console.log("HELLO");
    const [privacyLevel, setPrivacyLevel] = useState<'standard' | 'editor'>('standard');
  
    const handleToggle = (level: 'standard' | 'editor') => {
      setPrivacyLevel(level);
      console.log(level)
    };
    
    const handleContinue = () => {
      // Implement continue logic here
      console.log(`Continuing with privacy level: ${privacyLevel}`);
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
          <div className="button-container">
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };