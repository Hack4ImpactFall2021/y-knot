import React from "react";

import AdminSidebar from "./AdminSidebar";
import { NavRouteOptions } from "./AdminSidebar";
import { NavRoutes } from "./AdminSidebar";

import "./Admin.css";

interface Props {
  selected: NavRouteOptions
}

// Admin Home
const Admin : React.FC<Props>= ({ selected }) => {
  return (
    <div className="admin">
      {/* Admin Sidebar -__- */}
      <AdminSidebar
        selected={selected}
        routes={[NavRouteOptions.Home, NavRouteOptions.Trainee, NavRouteOptions.Applicants, NavRouteOptions.Settings]}
      />
      {/* Admin Content */}
      {NavRoutes[selected].contentComponent}
    </div>
  );
}

export default Admin;