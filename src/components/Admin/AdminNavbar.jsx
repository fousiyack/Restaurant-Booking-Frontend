import React ,{useState}from 'react';

const AdminNavbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const profileToggle = () => {
    // Profile toggle functionality
  };

  return (
    <header className="bg-nav">
      <div className="flex justify-between">
        {/* <div className="p-1 mx-3 inline-flex items-center">
          <i
            className="fas fa-bars pr-2 text-white cursor-pointer md:hidden"
            onClick={toggleSidebar}
          >toggle</i>
          <h1 className="text-white p-2">Admin</h1>
        </div> */}
        {/* <div className="p-1 flex flex-row items-center">
          <a
            href="https://github.com/tailwindadmin/admin"
            className="text-white p-2 mr-2 no-underline hidden md:block lg:block"
          >
            Github
          </a>

          <img
            onClick={profileToggle}
            className="inline-block h-8 w-8 rounded-full cursor-pointer"
            src="https://avatars0.githubusercontent.com/u/4323180?s=460&v=4"
            alt=""
          />
          <a
            href="#"
            onClick={profileToggle}
            className="text-white p-2 no-underline hidden md:block lg:block"
          >
            Adam Wathan
          </a>
          <div
            id="ProfileDropDown"
            className="rounded hidden shadow-md bg-white absolute pin-t mt-12 mr-1 pin-r"
          >
            <ul className="list-reset">
              <li>
                <a
                  href="#"
                  className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                >
                  Notifications
                </a>
              </li>
              <li>
                <hr className="border-t mx-2 border-grey-ligght" />
              </li>
              <li>
                <a
                  href="#"
                  className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default AdminNavbar;
