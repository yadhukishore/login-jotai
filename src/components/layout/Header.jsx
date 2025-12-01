import { logoutService } from "@src/api/services/authService";
import useSwrApi from "../../customHooks/useSwrApi";
import { useEffect, useRef, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Link } from "react-router-dom";
export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const userData = null; // placeholder until real user data is wired

  const handleLogout = async () => {
    await logoutService();
    // You can handle additional logic based on logout result if needed
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="sticky top-0 left-0 bg-white w-full flex items-center justify-between gap-x-4 h-[60px] border-b border-grey-400 z-1000 px-5 ">
      <Link to="/">
        <span className="font-bold">App</span>
      </Link>

      <div className="flex items-center">
        <ProfileDropdown
          dropdownRef={dropdownRef}
          handleToggle={handleDropdownToggle}
          showDropdown={showDropdown}
          userData={userData}
          handleLogout={handleLogout}
        />
      </div>

    </header>
  );
}
