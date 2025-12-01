import React from 'react';

const ProfileDropdown = ({ dropdownRef, showDropdown, userData, handleToggle, handleLogout }) => {
  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={handleToggle} className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">U</span>
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow p-2">
          <div className="text-sm mb-2">{userData?.name || 'User'}</div>
          <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
