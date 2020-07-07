/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [show, setShow] = useState(false);

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <b>GELD</b>
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${show && 'is-active'}`}
          onClick={() => setShow(!show)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar" className={`navbar-menu ${show && 'is-active'}`}>
        <div className="navbar-start">
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
