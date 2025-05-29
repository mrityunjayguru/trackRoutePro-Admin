import React from 'react';
import { useLocation } from 'react-router-dom';
import Mainsidebar from './Mainsidebar';
import ChildSidebar from './ChildSidebar';

function Sidebar() {
  const location = useLocation();

  const isEcomRoute = location.pathname.startsWith('/ecommdashboard');

  return (
    < >
    {isEcomRoute?(<div><ChildSidebar /></div>):(<Mainsidebar />)}
   
    </>
  );
}

export default Sidebar;
