import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="center-menu">
          <li className="nav-item">
            <a
              href="https://www.linkedin.com/in/erik-beute"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="icon" />
              LinkedIn
            </a>
          </li>

          <li className="nav-item">
            <a
              href="https://www.github.com/Erikbeute"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="icon" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
