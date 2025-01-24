import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-20 flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={toggleMobileMenu}>
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
