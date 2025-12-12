import React from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-item">
          <a href="/" className="nav-logo">Erik Beute</a>
        </div>
           <ul className="center-menu">
             {/* <li className="nav-item">
               <a href="/projects" className="nav-link">Projects</a>
             </li> */}
           </ul>
      </div>
    </nav>
  );
};