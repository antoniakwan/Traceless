import React, { useState } from 'react'
import { About } from './about'
import { Home } from './home'
import { JPGEditor } from './jpgEditor'
import { PDFEditor } from './pdfEditor'
import union from '../images/Union.svg'
import './landing.css'

import {type PageState} from './types'

const Navbar : React.FC<{setPage : ((a : PageState) => void)}> = ({setPage}) => {
  // return <>
  //   <button className="union" onClick={() => setPage('Home')}><img src={union} alt="Union" /></button>
  //   <button className="text-wrapper-8" onClick={() => setPage("About")}>About</button>

  //   <div className="text-wrapper-9">traceless.io</div>

  //   <div className="rectangle-2" />
  //   <div className="rectangle-3" />
  // </>
  return <div className="navbar">
    <div className="ourname">traceless.io</div>
    <div className="right">
      <button onClick={() => setPage('Home')}>
      <img src={union} alt="Home"/>
      </button>
      <button onClick={() => setPage('About')}>
        About
      </button>
    </div>
  </div>
}

export const Landing : React.FC = () => {
  const [page, setPage] = useState<PageState>('Home')
  const [inputFile, setInputFile] = useState<File | null>(null)

  const handleFile = (f : File | null) : void => {
    if (!f) return
    setInputFile(f)
    const fileType : string | undefined = f.name.split(".").pop();
    if (!fileType) return;
    if (fileType === "pdf"){
      setPage('PDFEditor')
    } else if (['jpg', 'jpeg'].includes(fileType)) {
      setPage('JPGEditor')
    }
  } 

  const toRender = {
    About : <><About setPage={setPage}/></>,
    Home : <><Home setPage={setPage} setInputFile={handleFile}/></>,
    JPGEditor : inputFile ? <><Navbar setPage={setPage}/><JPGEditor inputFile={inputFile}/></> : <p>Error.</p>,
    PDFEditor : inputFile ? <><Navbar setPage={setPage}/><PDFEditor inputFile={inputFile}/></> : <p>Error.</p>
  }
  return toRender[page]
}