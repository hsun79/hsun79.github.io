import React from 'react'
import ReactDOM from 'react-dom/client'
// Import Radix Themes styles first
import '@radix-ui/themes/styles.css';
// Then import your custom overrides
import './radix-overrides.css';
// Then import your other styles
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
