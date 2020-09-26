import React from 'react';
import logo from './logo.svg';
import './App.css';
//importamos los componentes
import Links from './components/links';
// npm install --save react-toastify
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  return (
    <div className="container p-2">
      <div>
      <Links/>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
