// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from "react-redux";
import store from './services/store/store'


// Stylesheet
import './assets/css/icons.css'
import './assets/css/global.css'

// Translation Hook
import { setTranslations, setDefaultLanguage } from 'react-multi-lang'
import en from './laguages/en.json'
import ar from './laguages/ar.json'

// Routes
import AppRoutes from './services/routes/AppRoutes';

// Setting up translations
setTranslations({en, ar})
setDefaultLanguage(localStorage.getItem("lang") ? String( localStorage.getItem("lang") ) : 'en')

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
        <AppRoutes />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);