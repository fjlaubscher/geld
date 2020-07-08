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
  </>
);

export default Layout;
