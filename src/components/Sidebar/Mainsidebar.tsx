import React, { useEffect, useRef, useState, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/TrPro.png';
import { useSidebarRoutes } from './SidebarLinks';
import { LogoutIcons } from './SideBarSvgIcons';
import { IoIosArrowUp } from 'react-icons/io';
import { adminLogin, handleLogouts } from '../../api/auth';
import { AppDispatch } from '../../store/store';
import { getDeviceInfo } from '../../common/getDeviceInfo';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface AuthState {
  Auth: {
    loginUserData: {
      role: string;
    };
  };
}

const Mainsidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const dispatch=useDispatch<AppDispatch>()
  const loginUser:any = useSelector(
    (state: AuthState) => state.Auth?.loginUserData,
  );
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    localStorage.getItem('sidebar-expanded') === 'true',
  );
  const [openGroup, setOpenGroup] = useState<string | null>(null); // Track open group

  const sidebarRoutes = useSidebarRoutes();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      )
        return;
      setSidebarOpen(false);
    },
    [sidebarOpen],
  );

  const handleEscPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) setSidebarOpen(false);
    },
    [sidebarOpen],
  );

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
    document.body.classList.toggle('sidebar-expanded', sidebarExpanded);
  }, [sidebarExpanded]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [handleClickOutside, handleEscPress]);

  const handleLogout =async () => {
       const payload: any = {userId:loginUser?._id, deviceInfo:getDeviceInfo() };
   
          const response: any = await dispatch(handleLogouts(payload));
    
    localStorage.removeItem('token');
    navigate('/auth/signin');
  };

  const handleRoutes = useCallback(() => {
    loginUser?.role === 'Dealer'
      ? navigate('/DealearDashboard')
      : navigate('/');
  }, [loginUser, navigate]);

  const renderNavLink = useCallback(
    (
      to: string,
      label: string,
      icon: JSX.Element | string,
      active: boolean,
    ) => (
      <NavLink
        to={to}
        className={`text14 group flex items-center gap-2.5 text-[15px] rounded-sm px-4 py-2 font-medium transition-all duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${active ? 'bg-graydark text-[#D9E821]' : 'text-[#fff]'
          }`}
      >
        <span>{icon}</span> {label}
      </NavLink>
    ),
    [],
  );
  const renderNestedRoutes = useCallback(
    (routes: any[], depth: number = 0) => {
      return routes.map((route, index) => {
        const isActive = pathname.includes(route.path);
        const hasNested = route.children?.length || route.subChildren?.length;
        if (!route.isView) return null;
  
        const handleClick = (
          event: React.MouseEvent,
          groupKey: string,
          i: any,
        ) => {
          event.preventDefault();
          setOpenGroup(openGroup?.includes(groupKey) ? null : groupKey);
        };
  
        return (
          <li key={index}>
            {hasNested ? (
              <SidebarLinkGroup activeCondition={isActive}>
                {(handleClickInner, open) => (
                  <>
                    <NavLink
                      to="#"
                      onClick={(event) => handleClick(event, route.path, index)}
                      className={`group flex items-center gap-2.5 pl-10 px-4 py-2 font-medium text-white hover:bg-graydark ${isActive ? 'bg-graydark text-[#D9E821]' : ''
                        }`}
                    >
                      <span>{route.icon}</span> {route.label}
                      {hasNested && (
                        <IoIosArrowUp
                          className={`ml-1 transition-transform ${openGroup === route.path ? '' : 'rotate-180'
                            }`}
                        />
                      )}
                    </NavLink>
                    <ul
                      className={`text-[#000000] transition-all ease-in-out duration-300 overflow-hidden pl-6 ${openGroup?.includes(route.path)
                          ? 'max-h-screen'
                          : 'max-h-0'
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
              <div className={`pl-${depth * 4}`}>
                {renderNavLink(route.path, route.label, route.icon, isActive)}
              </div>
            )}
          </li>
        );
      });
    },
    [pathname, renderNavLink, openGroup],
  );
  
  const handleClick5 = (path: any) => {
    setOpenGroup(openGroup?.includes(path) ? null : path);
  };

  return (
    <aside
      ref={sidebar}
      className={`mt-1 mr-5 ml-2 mb-5 absolute left-[-30px] top-0 z-50 flex h-screen w-60 flex-col overflow-y-hidden transition-all duration-300 ease-in-out dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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

      <div className="no-scrollbar rounded-xl mt-5 bg-[#000] flex flex-col overflow-y-auto text-[15px]">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {loginUser?.role &&
              sidebarRoutes.map(
                ({ path, label, icon, condition, children, isView }, index) =>
                  isView ? (
                    <li key={index}>
                      {children ? (
                        <SidebarLinkGroup activeCondition={condition(pathname)}>
                          {(handleClick2, open) => (
                            <>
                              <NavLink
                                to="#"
                                onClick={() => handleClick5(path)}
                                className={`group flex items-center gap-2.5 px-4 py-2 font-medium text-white hover:bg-graydark ${condition(pathname) ? 'bg-graydark' : ''
                                  }`}
                              >
                                <span>{icon}</span>{' '}
                                <p className="w-full text-[15px]">{label}</p>
                                {children && (
                                  <IoIosArrowUp
                                    className={`ml-1 transition-transform ${openGroup?.includes(path)
                                        ? ''
                                        : 'rotate-180'
                                      }`}
                                  />
                                )}
                              </NavLink>
                              <ul
                                className={`transition-all pl-2.5 ${openGroup?.includes(path)
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
                  ) : null,
              )}
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

export default Mainsidebar;
