// React
import React from 'react';
import ReactDOM from 'react-dom';

// Stylesheet
import './assets/css/icons.css'
import './assets/css/global.css'

// Translation Hook
import { setTranslations, setDefaultLanguage } from 'react-multi-lang'
import en from './laguages/en.json'
import ar from './laguages/ar.json'
import { InputField } from './components/FormElements/FormElements';
import App from './App';

// Setting up translations
setTranslations({en, ar})
setDefaultLanguage('en')

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);