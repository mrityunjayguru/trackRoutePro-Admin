import React from 'react';
import { useLocation } from 'react-router-dom';
import Mainsidebar from './Mainsidebar';
import ChildSidebar from './ChildSidebar';
import SalesAppSidebar from './SalesAppSidebar';

function Sidebar() {
  const location = useLocation();

  const isEcomRoute = location.pathname.startsWith('/ecommdashboard');
  const isSalesApp = location.pathname.startsWith('/salesApp');

  return (
    <>
      {isEcomRoute ? (
        <ChildSidebar sidebarOpen={false} setSidebarOpen={function (open: boolean): void {
          throw new Error('Function not implemented.');
        } } />
      ) : isSalesApp ? (
        <SalesAppSidebar sidebarOpen={false} setSidebarOpen={function (open: boolean): void {
            throw new Error('Function not implemented.');
          } } />
      ) : (
        <Mainsidebar sidebarOpen={false} setSidebarOpen={function (open: boolean): void {
              throw new Error('Function not implemented.');
            } } />
      )}
    </>
  );
}

export default Sidebar;
