import React from 'react'

const Home : React.FC = () =>
  <div className="page">
    <div className="overlap-group">
      <div className="div" />
      <img className="rectangle" alt="rectangle" src={rectangle} />
      <div className="text-wrapper">Clean Files. Clean Slate.</div>


      <button className="union" onClick={goHome}>
        Hello.
        <img src={union} alt="Union" style={{ width: '100%', height: '100%' }} />
      </button>
      <button className="text-wrapper-8" onClick={goPoopButtFart}>About</button>

      <input
        id="inputbox"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div className="text-wrapper-9">traceless.io</div>


      <div className="text-wrapper-2">Own your presence.</div>
      <div className="text-wrapper-3">Own your presence.</div>
      <div className="text-wrapper-4">Own your presence.</div>

      <div className="text-wrapper-5">Guard your privacy.</div>

      <p className="p">click here to upload files</p>

      <div className="text-wrapper-6">erase your trace.</div>

      <img className="vector" alt="Vector" src={vector} />

      <div className="rectangle-2" />
      <div className="rectangle-3" />
      <label htmlFor="inputbox" className="rectangle-empty" />

    </div>
  </div>
