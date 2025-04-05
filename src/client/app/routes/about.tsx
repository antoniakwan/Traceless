import React, { useState } from 'react';
import "./about.css";
import union from "../images/Union.svg";
import rectangle from "../images/Rectangle.svg";
import {type PageState} from './types';

import { Landing } from './landing'; // 🆕 Import the new page

export const About: React.FC<{setPage : (p : PageState) => void }> = ({setPage}) => {
  const [showHome, setGoHome] = useState(false); // 🆕 Page toggle

  if (showHome) {
    return <Landing />;
  }

  return <div className="page">
    <div className="overlap-group">
      
      <img className="rectangle" alt="rectangle" src={rectangle} />

      <div className="text-wrapper-2"></div>
      <div className="text-wrapper-3">About Traceless.io.</div>
      <div className="text-wrapper-4">IEOJWOFEJOEIFJe.</div>


      <div className="rectangle-2" />
      <div className="rectangle-3" />
      <div className="about1">
        <p style={{ marginLeft: '10px', marginTop: "20px", fontSize: '25px' }}>Traceless.io is a platform where you can upload PDFs or 
        images to analyze the information they contain. This helps you understand what data is being shared, so you can identify and remove 
        any details you're uncomfortable disclosing.</p>
      </div>
      
      
      <div className="about2"> 
        <p style={{ marginLeft: '10px', marginTop: "20px", fontSize: '25px' }}>
        How to Use Traceless.io: <br/>
          1. Upload an Image or a PDF <br/>
          2. Choose the level of security you want. <br/>
            - Image: paranoid (completely rerenders your image and metadata), <br/>standard (erases metadata), editor (customize metadata)<br/>
            - PDF: standard (erases metadata), editor (customize metadata)<br/>
          3. Add a watermark if desired. You have the option to use our AI Identifier <br/>which will potential private information <br/>
          4. Download your file! Stay protected. 
        </p></div>

      <button className="union" onClick={() => setGoHome(true)}><img src={union} alt="Union" /></button>
      <button className="text-wrapper-8" onClick={() => setGoHome(false)}>About</button>
  
      <div className="text-wrapper-9">traceless.io</div>
    </div>
  </div>
}






// import React, { useState } from 'react';
// import "./about.css";
// import rectangle from "../images/Rectangle.svg";
// import {type PageState} from './types';

// export const About: React.FC<{setPage : (p : PageState) => void }> = ({setPage}) => {
//   return <div className = "page">

//     <div className="overlap-group">
      
//       <img className="rectangle" alt="rectangle" src={rectangle} />

//       <div className="text-wrapper-2"></div>
//       <div className="text-wrapper-3">About Traceless.io.</div>
//       <div className="text-wrapper-4">IEOJWOFEJOEIFJe.</div>

//       <div className="rectangle-2" />
//       <div className="rectangle-3" />
//       <div className="about1">
//         <p style={{ marginLeft: '10px', marginTop: "20px", fontSize: '25px' }}>Traceless.io is a platform where you can upload PDFs or 
//         images to analyze the information they contain. This helps you understand what data is being shared, so you can identify and remove 
//         any details you're uncomfortable disclosing.</p>
//       </div>

//       <div className="about2"> 
//         <p style={{ marginLeft: '10px', marginTop: "20px", fontSize: '25px' }}>
//         How to Use Traceless.io:
//           1. Upload an Image or a PDF
//           2. Choose the level of security you want.
//             - Image: paranoid (completely rerenders your image and metadata), standard (erases metadata), editor (customize metadata)
//             - PDF: standard (erases metadata), editor (customize metadata)
//           3. Add a watermark if desired. You have the option to use our AI Identifier which will potential private information 
//           4. Download your file! Stay protected. 
//         </p></div>
      
//         <button className="union" onClick={() => setGoHome(true)}><img src={union} alt="Union" /></button>
//         <button className="text-wrapper-8" onClick={() => setGoHome(false)}>About</button>
      
//       <div className="about2" />
  
//       {/* <div className="text-wrapper-9">traceless.io</div> */}

//       <div className="bgr" />
//     </div>
//   </div>
// }

// return <div className="page">
//     <div className="overlap-group">
      
//       <img className="rectangle" alt="rectangle" src={rectangle} />

//       <div className="text-wrapper-2"></div>
//       <div className="text-wrapper-3">About Traceless.io.</div>
//       <div className="text-wrapper-4">IEOJWOFEJOEIFJe.</div>



      
      



  
//       <div className="text-wrapper-9">traceless.io</div>
//     </div>
//   </div>
// }
