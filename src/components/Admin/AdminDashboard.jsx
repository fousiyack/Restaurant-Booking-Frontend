import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Dashboard from "./Dashboard";


function AdminDashboard() {

  return (
    <div>
      <div>
        <div>
          <AdminNavbar />
        </div>

        <div className="flex col-2">
          <AdminSidebar />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
