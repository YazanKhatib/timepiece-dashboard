// React
import React from 'react';
import ReactDOM from 'react-dom';

// Translation Hook
import { setTranslations, setDefaultLanguage } from 'react-multi-lang'
import en from './laguages/en.json'
import ar from './laguages/ar.json'

// Setting up translations
setTranslations({en, ar})
setDefaultLanguage('en')

ReactDOM.render(
  <React.StrictMode>
    
  </React.StrictMode>,
  document.getElementById('root')
);