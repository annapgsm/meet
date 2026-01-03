import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import * as atatus from 'atatus-spa';
atatus.config('f63b49ebc0b9430692c66eaa1b807652').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
