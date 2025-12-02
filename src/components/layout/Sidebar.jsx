import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuData } from "./menuData";
import SubMenu from "./SubMenu";

export default function Sidebar() {
  const location = useLocation();
  const activePath = location.pathname;
  const [activeMenu, setActiveMenu] = useState(() => {
    try {
      const stored = localStorage.getItem("sidebarActiveMenu");
      return stored && stored === location.pathname ? stored : null;
    } catch (e) {
      console.warn(e);
      return null;
    }
  });
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    try {
      const v = localStorage.getItem("isMenuOpen");
      return v === null ? true : JSON.parse(v);
    } catch (e) {
      console.warn(e);
      return true;
    }
  });

  useEffect(() => {
    try {
      const storedActiveMenu = localStorage.getItem("sidebarActiveMenu");
      if (storedActiveMenu && storedActiveMenu !== activePath) {
        localStorage.removeItem("sidebarActiveMenu");
      }
    } catch (e) {
      console.warn(e);
    }
  }, [activePath]);


  useEffect(() => {
    if (activeMenu) {
      localStorage.setItem("sidebarActiveMenu", activeMenu);
    } else {
      localStorage.removeItem("sidebarActiveMenu");
    }
  }, [activeMenu]);

  useEffect(() => {
    try {
      localStorage.setItem("isMenuOpen", JSON.stringify(isMenuOpen));
    } catch (e) {
      console.warn(e);
    }
  }, [isMenuOpen]);

  const handleMenuClick = (menuKey) => {
    // Always set the active menu and open the submenu
    setActiveMenu(menuKey);
    setIsMenuOpen(true);
  };

  const handleSidebarClose = () => {
    // Only for closing - set menuOpen to false and clear activeMenu
    setIsMenuOpen(false);
    setActiveMenu(null);
  };

  const isMenuItemActive = (menuKey) => {
    if (activeMenu) {
      return activeMenu === menuKey;
    }
    return activePath === menuKey;
  };

  return (
    <>
      <aside className="sidebar bg-white sticky w-[80px] top-[60px] left-0 h-[calc(100dvh-(var(--header-height)))] border-r flex flex-col justify-between items-center bg-primaryLight z-98 pb-4">
        <nav className="w-full h-full overflow-auto no-scrollbar">
          <ul className="flex flex-col nav">
            {menuData.map((menuItem) => (
              <li key={menuItem.key} className="p-[2px] pr-[3px]">
                <Link
                  to={menuItem.link}
                  onClick={() => handleMenuClick(menuItem.key)}
                  className={`flex flex-col cursor-pointer justify-center items-center w-full h-[80px] p-[6px] rounded-[6px] group
                    transition-all duration-300 
                    ${
                      isMenuItemActive(menuItem.key)
                        ? "bg-primary text-white"
                        : "bg-transparent text-grey-700"
                    }`}
                >
                  <span
                    className={`transition-all leading-none duration-300 flex items-center justify-center p-[2px] rounded mb-1 ${
                      isMenuItemActive(menuItem.key)
                        ? "bg-primary text-white"
                        : "bg-transparent group-hover:bg-grey-100 group-active:bg-[#e5f4c5] group-focus:bg-[#e5f4c5]"
                    }`}
                  >
                    <span className="text-2xl leading-none material-symbols-outlined">
                      {menuItem.icon}
                    </span>
                  </span>
                  <strong className="text-xs font-medium leading-tight text-center">
                    {menuItem.title}
                  </strong>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="cursor-pointer menu-close hover:text-primary size-6"
          onClick={handleSidebarClose}
        >
          <span className="material-symbols-outlined text-24">menu_open</span>
        </button>
      </aside>

      {activeMenu &&
        isMenuOpen &&
        (() => {
          const subMenu = menuData.find(
            (item) => item.key === activeMenu
          )?.subMenu;
          if (subMenu && subMenu.length > 0) {
            return <SubMenu menuItem={subMenu} isSideBarOpen={isMenuOpen} />;
          }
          return null;
        })()}
    </>
  );
}
