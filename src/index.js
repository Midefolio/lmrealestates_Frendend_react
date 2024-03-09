import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './typography.css';
import './fontawesome.css';
import './all.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './interceptors/axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);