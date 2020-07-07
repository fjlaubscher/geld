import React from 'react';

// components
import Nav from '../nav';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <>
    <Nav />
    {children}
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Geld</strong> by
          <a href="https://francois.codes"> Francois Laubscher</a>. The source
          code is licensed
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
        </p>
      </div>
    </footer>
  </>
);

export default Layout;
