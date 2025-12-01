import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SubMenu = ({ menuItem = [], isSideBarOpen }) => {
  const [sidebarWidth, setSidebarWidth] = useState("260px");
  const location = useLocation();

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth >= 1200 && window.innerWidth <= 1450) {
        setSidebarWidth("220px");
      } else {
        setSidebarWidth("260px");
      }
    };
    updateSidebarWidth();
    window.addEventListener("resize", updateSidebarWidth);
    return () => window.removeEventListener("resize", updateSidebarWidth);
  }, []);

  return (
    <AnimatePresence>
      {isSideBarOpen && (
        <motion.div
          key="submenu"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className={`SubMenu sticky top-(--header-height) left-[80px] overflow-y-auto  h-[calc(100dvh-(var(--header-height)))] px-2 py-2 bg-white z-97 border-r border-grey-400 shadow-md`}
          style={{ width: sidebarWidth }}
        >
          <nav className="w-full h-full ">
            <ul className="flex flex-col">
              {menuItem.map((item) => (
                <li key={item.key} className="py-2 ">
                  <Link
                    to={item.link}
                    className={`px-4 py-2 rounded-3xl  flex gap-x-2 marker:items-center text-sm font-medium  
                  transition-all duration-300 cursor-pointer active:bg-highlight hover:bg-grey-100 group ${
                    location.pathname.includes(item.link)
                      ? "text-primary font-semibold"
                      : "text-grey_700"
                  }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubMenu;
