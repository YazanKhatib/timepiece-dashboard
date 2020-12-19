// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from "react-redux";
import store from './services/store'


// Stylesheet
import './assets/css/icons.css'
import './assets/css/global.css'

// Translation Hook
import { setTranslations, setDefaultLanguage } from 'react-multi-lang'
import en from './laguages/en.json'
import ar from './laguages/ar.json'
import { InputField } from './components/FormElements/FormElements';
import Login from './pages/Login/Login';

// Setting up translations
setTranslations({en, ar})
setDefaultLanguage('en')

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
        <Login />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);