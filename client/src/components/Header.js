import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <h1>AI Prompt Manager</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Prompt</Link>
          </li>
          <li>
            <Link to="/list">List of Prompts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
