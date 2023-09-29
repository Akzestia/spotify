import React from 'react';
import ReactDOM from 'react-dom';
import {MainPageWithRouter} from '../src/pages/MainPage';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Authorization from '../src/pages/Authorization'
import { Callback } from './pages/Callback';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/callback' element={<Callback></Callback>}>

        </Route>
        <Route path='/' element={<Authorization></Authorization>}>

        </Route>
        <Route path='/mainpage' element={<MainPageWithRouter></MainPageWithRouter>}>

        </Route>
        <Route path='/track/:id'>

        </Route>
        <Route path='/album/:id'>
  
        </Route>
        <Route path='/user/account'>
  
        </Route>
        <Route path='/playlist/:id'>
  
        </Route>
        <Route path='/likedtracks'>
  
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
