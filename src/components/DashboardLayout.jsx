import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileView = () => {
    setIsMobileOpen(false);
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

        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeMobileView}
          >
            <div
              className="w-64 bg-white h-full shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-4 pt-16">
                <ul>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/analytics"
                      className="block p-2 hover:bg-orange-500 rounded"
                      onClick={closeMobileView}
                    >
                      Analytics
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/users"
                      className="block p-2 hover:bg-orange-500 rounded"
                      onClick={closeMobileView}
                    >
                      Users
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard/tasks"
                      className="block p-2 hover:bg-orange-500 rounded"
                      onClick={closeMobileView}
                    >
                      Task Manager
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        <div className="hidden md:block w-64 bg-white shadow-md">
          <nav className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <ul>
              <li className="mb-2">
                <Link
                  to="/dashboard/analytics"
                  className="block p-2 hover:bg-blue-100 rounded"
                >
                  Analytics
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/users"
                  className="block p-2 hover:bg-blue-100 rounded"
                >
                  User Management
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/tasks"
                  className="block p-2 hover:bg-blue-100 rounded"
                >
                  Task Manager
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 mt-16 md:mt-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
