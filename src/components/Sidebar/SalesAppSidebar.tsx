import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSalesAppSidebarLink } from './sidebarLinks/SalesAppSidebar';
import { BackIcon, LogoutIcons } from './SideBarSvgIcons';
import Logo from '../../images/logo/TrPro.png';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SlesAppsidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const { pathname } = useLocation();
  const sidebarRoutes = useSalesAppSidebarLink();
  const handlechangeRoute=(val:any)=>{
    alert(val)
  }
  return (
    <aside className="h-full  w-[90%] mx-2 ml-auto bg-white shadow-md flex flex-col justify-between">
      {/* Top Logo */}
      <div className="bg-[#000] h-28 rounded-xl flex items-center justify-between px-6  cursor-pointer">
        <NavLink to="#">
          <img className="rounded-xl" src={Logo} alt="logo" />
        </NavLink>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {sidebarRoutes.map((route, index) =>
            route.isView ? (
              <li key={index}>
                <NavLink 
                  to={route.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  route.path==pathname
                        ? 'bg-[#D9E821] text-[#000000] font-semibold'
                        : 'text-[#2C2C2C] '
                    }`
                  }
                >
                  <span className="text-xl">{route.icon}</span>
                  <span className="text-[15px]">{route.label}</span>
                </NavLink>
              </li>
            ) : null,
          )}

          {/* Back Button (Example) */}
          <li onClick={()=>localStorage.removeItem("token")}>
            <NavLink 
              to="#"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black hover:bg-gray-100"
            >
              <span className="text-xl">
                <BackIcon />
              </span>
              <span className="text-[15px]">LogOut</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="text-center text-[11px] p-4 text-gray-400 border-t">
        Copyright © {new Date().getFullYear()}
        <br />
        Brilsonate Pvt. Ltd.
      </div>
    </aside>
  );
};

export default SlesAppsidebar;
