import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
import Dashboard from './frontend/index';
import  Login from './frontend/login';
export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Dashboard/>}></Route>
        <Route path="/erp-login" element={<Login/>}></Route>
        {/* <Route path='/notification' element={<Notification/>}></Route> */}
        {/* <Route path="/Login" element={<Login/>}></Route>
        <Route path='/Register' element={<Registeration/>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'));