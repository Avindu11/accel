import { Link, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function SalesLayout() {

  const { user, logout } = useAuth();

  // const [userInfo, setUserInfo] = useState({
  //   firstName: user?.user?.firstName || "U",
  //   lastName: user?.user?.lastName || "",
  //   email: user?.user?.email || "",
  // });

  const firstName = user?.user?.firstName;
  const lastName = user?.user?.lastName;
  const email = user?.user?.email;

  async function handleLogout() {
    await logout();
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <nav className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 shrink-0 md:h-screen md:sticky md:top-0 flex flex-col-reverse md:flex-col">
          <div className="p-4 flex-1">
            <h2 className="hidden md:block text-lg font-bold text-gray-800 mb-6 px-2">
              Sales Menu
            </h2>

            <div className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
              <Link
                to="dashboard"
                className="flex-1 md:flex-none px-3 py-2 text-sm font-medium text-gray-700 bg-transparent hover:bg-orange-50 hover:text-orange-700 rounded-md transition-colors whitespace-nowrap text-left"
              >
                Dashboard
              </Link>
              <Link
                to="leads"
                className="flex-1 md:flex-none px-3 py-2 text-sm font-medium text-gray-700 bg-transparent hover:bg-orange-50 hover:text-orange-700 rounded-md transition-colors whitespace-nowrap text-left"
              >
                Leads
              </Link>
              <Link
                to="add-note"
                className="flex-1 md:flex-none px-3 py-2 text-sm font-medium text-gray-700 bg-transparent hover:bg-orange-50 hover:text-orange-700 rounded-md transition-colors whitespace-nowrap text-left"
              >
                Add Note
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 bg-gray-50/50">
            <div className="flex flex-row items-center justify-between md:flex-col md:items-start md:gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                  {firstName ? firstName[0] : "U"}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {firstName} {lastName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {email}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleLogout()}
                className="text-sm font-medium text-gray-500 hover:text-red-600 md:w-full md:text-left md:px-2 md:py-2 md:hover:bg-red-50 md:rounded-md transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default SalesLayout;
