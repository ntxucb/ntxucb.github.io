import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './StickyImages.jsx'
import CanvasTest from './CanvasTest'
import './index.css'
import HomePage from './Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <CanvasTest/>
    {/* <HomePage/> */}
  </React.StrictMode>,
)
