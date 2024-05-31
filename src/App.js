// import logo from './logo.svg';\
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarMenu />
      </header>
    </div>
  );
}

export default App;
