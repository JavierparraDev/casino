import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
