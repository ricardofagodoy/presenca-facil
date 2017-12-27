// --- MOCK--- 
//import 'tests/mocks/mock-axios'

import React from 'react'
import Routes from 'views/Routes'

import '../styles/vendor/bootstrap.min.css'
import '../styles/vendor/bootstrap-theme.min.css'
import '../styles/style.scss'

import 'jquery';
import 'bootstrap';
import 'vendor/bootstrap-notify.min';

function startApp() {
    require('react-dom').render(<Routes/>, document.getElementById('root'));
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}