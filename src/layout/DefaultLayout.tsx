import React, { useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Footer } from '../components/Footer/Footer';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current location
  
  // Check if the current pathname is '/auth/signin'
  const isSignInPath = location.pathname === '/auth/signin';

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen flex flex-col">
      {/* ===== Page Wrapper Start ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* ===== Sidebar Start ===== */}
        {!isSignInPath && (
          <div className="fixed top-0 left-0 bottom-0 w-64 z-10 bg-[#F2F6F9]">
            {/* Fixed Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>
        )}
        {/* ===== Sidebar End ===== */}

        {/* ===== Content Area Start ===== */}
        <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ${!isSignInPath ? 'lg:ml-[16rem] sm:ml-auto' : ''} `}>
        {/* gap-10 */}
          {/* Adjust content area */}
          {/* ===== Header Start ===== */}
          {!isSignInPath && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}
          {/* ===== Header End ===== */}
          
          {/* ===== Main Content Start ===== */}
          <main className="flex-1 ">
            <div className="mx-auto max-w-screen-2xl   ">{children}</div>
            {/* mt-1.5 */}
            {/* pl-5 */}
          </main>
          {/* ===== Main Content End ===== */}
        </div>
        {/* ===== Content Area End ===== */}
      </div>
      {/* Footer */}
      <div className="ml-auto px-12 sm:w-full lg:w-[80%]">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
