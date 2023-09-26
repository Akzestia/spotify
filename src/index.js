import React from 'react';
import ReactDOM from 'react-dom/client';
import {MainPageWithRouter} from '../src/pages/MainPage';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Authorization from '../src/pages/Authorization'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPageWithRouter></MainPageWithRouter>}>

        </Route>
        <Route path='/authorization' element={<Authorization></Authorization>}>

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
