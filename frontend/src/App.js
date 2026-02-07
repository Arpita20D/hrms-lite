import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Attendance from './components/Attendance';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1>HRMS Lite</h1>
            <nav className="nav">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                Dashboard
              </NavLink>
              <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
                Employees
              </NavLink>
              <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>
                Attendance
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;