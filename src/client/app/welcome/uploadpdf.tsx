import React from "react";
import "./style2.css";
import subtract from "/src/client/app/welcome/Subtract.svg";

export const UploadPdf = (): JSX.Element => {
  return (
    <div className="upload-PDF">
      <div className="overlap">
        <div className="rectangle" />

        <div className="div" />

        <div className="text-wrapper">PDF</div>

        <div className="group">
          <div className="overlap-group">
            <img className="subtract" alt="Subtract" src={subtract} />

            <div className="text-wrapper-2">Upload</div>
          </div>
        </div>

        <p className="select-your-privacy">
          <span className="span">Select Your</span>

          <span className="text-wrapper-3">&nbsp;</span>

          <span className="span">Privacy Level</span>
        </p>

        <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="text-wrapper-4">standard</div>

            <div className="rectangle-2" />

            <div className="text-wrapper-5">editor</div>
          </div>
        </div>
      </div>
    </div>
  );
};