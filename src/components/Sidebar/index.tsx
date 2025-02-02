import React, { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/TrPro.png';
import { manageRoutes, useSidebarRoutes } from './SidebarLinks';
import { LogoutIcons } from './SideBarSvgIcons';
import { IoIosArrowUp } from 'react-icons/io';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface Route {
  path: string;
  label: string;
  icon: JSX.Element | string;
  condition?: any;
  children?: Route[];
  subChildren?: Route[];
  isView: boolean; // Added isView property
}

interface AuthState {
  Auth: {
    loginUserData: {
      role: string;
    };
  };
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const loginUser = useSelector(
    (state: AuthState) => state.Auth?.loginUserData,
  );
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    localStorage.getItem('sidebar-expanded') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
    document.body.classList.toggle('sidebar-expanded', sidebarExpanded);
  }, [sidebarExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [sidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/signin');
  };

  const handleRoutes = useCallback(() => {
    loginUser?.role === 'Dealer'
      ? navigate('/DealearDashboard')
      : navigate('/');
  }, [loginUser, navigate]);

  const renderNavLink = (
    to: string,
    label: string,
    icon: JSX.Element | string,
    active: boolean,
  ) => (
    <NavLink
      to={to}
      className={`group flex items-center gap-2.5 text-[14px] rounded-sm px-4 py-2 font-medium transition-all duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
        active ? 'bg-graydark text-[#D9E821]' : 'text-[#fff]'
      }`}
    >
      <span>{icon}</span> {label}
    </NavLink>
  );

  const renderNestedRoutes = useCallback(
    (routes: Route[], depth: number = 0) => {
      return routes.map((route: any, index: any) => {
        const isActive = pathname.includes(route.path);
        const hasNested = route.children?.length || route.subChildren?.length;
        const shouldRender = route.isView;
        if (!shouldRender) return null;
        return (
          <li key={index}>
            {hasNested ? (
              <SidebarLinkGroup activeCondition={isActive}>
                {(handleClick, open) => (
                  <>
                    <NavLink
                      to="#"
                      onClick={handleClick}
                      className={`group flex items-center gap-2.5 px-4 py-2 pl-${
                        depth * 4
                      } font-medium text-white hover:bg-graydark ${
                        isActive ? 'bg-graydark text-[#D9E821]' : ''
                      }`}
                    >
                      <span>{route.icon}</span> {route.label}
                      <IoIosArrowUp
                        className={`ml-1 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </NavLink>
                    <ul
                      className={`transition-all ${
                        open ? 'max-h-screen' : 'max-h-0 overflow-hidden'
                      }`}
                    >
                      {route.children &&
                        renderNestedRoutes(route.children, depth + 1)}
                      {route.subChildren &&
                        renderNestedRoutes(route.subChildren, depth + 2)}
                    </ul>
                  </>
                )}
              </SidebarLinkGroup>
            ) : (
              renderNavLink(route.path, route.label, route.icon, isActive)
            )}
          </li>
        );
      });
    },
    [pathname],
  );

  return (
    <aside
      ref={sidebar}
      className={`mt-1 mr-5 ml-5 mb-5 absolute left-[-30px] top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden transition-all duration-300 ease-in-out dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div
        onClick={handleRoutes}
        className="bg-[#000] h-28 rounded-xl flex items-center justify-between px-6 py-6 cursor-pointer"
      >
        <NavLink to="#">
          <img className="rounded-xl" src={Logo} alt="logo" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="block lg:hidden"
        />
      </div>

      <div className="no-scrollbar rounded-xl mt-5 bg-[#000] flex flex-col overflow-y-auto">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {/* SuperAdmin Routes */}
            {loginUser?.role &&
              useSidebarRoutes().map(
                ({ path, label, icon, condition, children, isView }, index) =>
                  isView && (
                    <li key={index}>
                      {children ? (
                        <SidebarLinkGroup activeCondition={condition(pathname)}>
                          {(handleClick, open) => (
                            <>
                              <NavLink
                                to="#"
                                onClick={handleClick}
                                className={`group flex items-center gap-2.5 px-4 py-2 font-medium text-white hover:bg-graydark ${
                                  condition(pathname) ? 'bg-graydark' : ''
                                }`}
                              >
                                <span>{icon}</span>{' '}
                                <p className="w-full text-[14px]"> {label}</p>
                                {children && (
                                  <IoIosArrowUp
                                    className={`ml-1 transition-transform ${
                                      open ? 'rotate-180' : ''
                                    }`}
                                  />
                                )}
                              </NavLink>
                              <ul
                                className={`transition-all pl-2.5 ${
                                  open
                                    ? 'max-h-screen'
                                    : 'max-h-0 overflow-hidden'
                                }`}
                              >
                                {children && renderNestedRoutes(children)}
                              </ul>
                            </>
                          )}
                        </SidebarLinkGroup>
                      ) : (
                        renderNavLink(path, label, icon, condition(pathname))
                      )}
                    </li>
                  ),
              )}

            {/* Manage Routes */}
            {loginUser?.role === 'SuperAdmin' &&
              manageRoutes.map(
                ({ path, label, icon, children, isView }, index) =>
                  isView && ( // Only render if isView is true
                    <li key={index}>
                      {children ? (
                        <SidebarLinkGroup activeCondition={pathname == 'path'}>
                          {(handleClick, open) => (
                            <>
                              <NavLink
                                to="#"
                                onClick={handleClick}
                                className={`group flex items-center gap-2.5 px-4 py-2 font-medium text-white hover:bg-graydark ${
                                  pathname == 'path' ? 'bg-graydark' : ''
                                }`}
                              >
                                <span>{icon}</span>{' '}
                                <p className="w-full text-[14px]">{label}</p>
                                {children && (
                                  <IoIosArrowUp
                                    className={`ml-1 transition-transform ${
                                      open ? 'rotate-180' : ''
                                    }`}
                                  />
                                )}
                              </NavLink>
                              <ul
                                className={`transition-all ml-2  ${
                                  open
                                    ? 'max-h-screen'
                                    : 'max-h-0 overflow-hidden'
                                }`}
                              >
                                {children && renderNestedRoutes(children)}
                              </ul>
                            </>
                          )}
                        </SidebarLinkGroup>
                      ) : (
                        renderNavLink(
                          path,
                          label,
                          icon,
                          pathname.includes(path),
                        )
                      )}
                    </li>
                  ),
              )}

            {/* Logout */}
            <li onClick={handleLogout}>
              {renderNavLink(
                '#',
                'Logout',
                <LogoutIcons />,
                pathname.includes('logout'),
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
