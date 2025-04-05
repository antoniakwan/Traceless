import React, { useState } from 'react';
import "./landing.css";

const About : React.FC = () => {
  return <>About</>
}

const JPGEditor : React.FC = () => {
  return <>JPGEditor</>
}

const PDFEditor : React.FC = () => {
  return <>PDFEditor</>
}

const Home : React.FC = () => {
  return <>Home</>
}

type PageState = 'About' | 'Home' | 'JPGEditor' | 'PDFEditor'

const Navbar : React.FC<{setPage : ((a : PageState) => void)}> = ({setPage}) => {
  return <div className="navbar">
    <div className="right">
      <button onClick={() => setPage('Home')}>
        Home
      </button>
      <button onClick={() => setPage('About')}>
        About
      </button>
    </div>
  </div>
}

export const App : React.FC = () => {
  const [page, setPage] = useState<PageState>('Home')
  const toRender = {
    About : <About/>,
    Home : <Home/>,
    JPGEditor : <JPGEditor/>,
    PDFEditor : <PDFEditor/>
  }
  return <>
    <Navbar setPage={setPage}/>
    <div className="page-content">{toRender[page]}</div>
  </>
}
