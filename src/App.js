import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import Dashboard from './components/Dashboard';
import Schools from './components/Schools';
import Home from './components/Home';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false); // Add menuOpen state

  return (
      <Router>
      <div className={`App ${menuOpen ? 'menu-open' : ''}`}> {/* Adjust class based on menuOpen state */}
        <header className="App-header">
          <NavbarMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Pass menuOpen state and setMenuOpen function */}
          {/* Define routes for Dashboard and Schools */}
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schools" element={<Schools />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

