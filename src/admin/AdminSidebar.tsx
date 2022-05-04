//All this has to do with the routing and should probably be in some other file. 
import home_active from "./assets/home_active.png";
import home_inactive from "./assets/home_inactive.png";
import trainee_active from "./assets/trainee_active.png";
import trainee_inactive from "./assets/trainee_inactive.png";
import applicants_active from "./assets/applicants_active.png";
import applicants_inactive from "./assets/applicants_inactive.png";
import settings_active from "./assets/settings_active.png";
import settings_inactive from "./assets/settings_inactive.png";

import AdminHome from "./AdminHome";
import AdminTrainees from "./AdminTrainees";
import AdminApplicants from "./AdminApplicants";
import AdminSettings from "./AdminSettings";

//Sidebar imports
import React from "react";

import "./AdminSidebar.css";
import { AdminSidebarTile } from "./AdminSidebarTile";

import { LogoutButton } from "./LogoutButton";


export enum NavRouteOptions { 
  Home = "Home", 
  Trainee = "Trainee", 
  Applicants = "Applicants", 
  Settings = "Settings"
}

interface SidebarTileInfo {
  name: NavRouteOptions,
  route: string,
  label: string,
  activeIcon: string,
  inactiveIcon: string,
  contentComponent: JSX.Element
}

export const NavRoutes = {
  [NavRouteOptions.Home]: {
    name: NavRouteOptions.Home,
    route: "/admin",
    label: "Home",
    activeIcon: home_active,
    inactiveIcon: home_inactive,
    contentComponent: <AdminHome/>
  },
  [NavRouteOptions.Trainee]: {
    name: NavRouteOptions.Trainee,
    route: "/admin/trainee",
    label: "Trainee",
    activeIcon: trainee_active,
    inactiveIcon: trainee_inactive,
    contentComponent: <AdminTrainees/>
  },
  [NavRouteOptions.Applicants]: {
    name: NavRouteOptions.Applicants,
    route: "/admin/applicants",
    label: "Applicants",
    activeIcon: applicants_active,
    inactiveIcon: applicants_inactive,
    contentComponent: <AdminApplicants/>
  },
  [NavRouteOptions.Settings]: {
    name: NavRouteOptions.Settings,
    route: "/admin/settings",
    label: "Settings",
    activeIcon: settings_active,
    inactiveIcon: settings_inactive,
    contentComponent: <AdminSettings/>
  }
}

//This is where the sidebar stuff actually starts
interface Props {
    selected: NavRouteOptions,
    routes: NavRouteOptions[]
}

const AdminSidebar: React.FC<Props> = ({ selected, routes }) => {

  return (
    <div className="admin-sidebar">
      {routes.map((curRoute, idx) => <AdminSidebarTile key={idx} selected={curRoute === selected} {...NavRoutes[curRoute]} />)}
      <LogoutButton/>
    </div>  
  );
}

export default AdminSidebar;