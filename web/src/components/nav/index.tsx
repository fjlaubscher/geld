import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';

const Nav = () => {
  const [show, setShow] = useState(false);

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item is-size-4" to="/">
          <FaWallet className="mr-4" />
        </Link>
        <button
          className={`navbar-burger burger button is-primary is-size-4 ${
            show && 'is-active'
          }`}
          onClick={() => setShow(!show)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="navbar" className={`navbar-menu ${show && 'is-active'}`}>
        <div className="navbar-end">
          <Link className="navbar-item" to="/track">
            Track
          </Link>
          <Link className="navbar-item" to="/income">
            Income
          </Link>
          <Link className="navbar-item" to="/expenses">
            Expenses
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
