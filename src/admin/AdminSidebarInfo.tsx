//Active and inactive icons for the sidebar
import home_active from "./assets/home_active.png";
import home_inactive from "./assets/home_inactive.png";
import trainee_active from "./assets/trainee_active.png";
import trainee_inactive from "./assets/trainee_inactive.png";
import applicants_active from "./assets/applicants_active.png";
import applicants_inactive from "./assets/applicants_inactive.png";
import settings_active from "./assets/settings_active.png";
import settings_inactive from "./assets/settings_inactive.png";

import { SidebarTileInfo } from "../SidebarAndContent";

export enum AdminSidebarOptions { 
  Home = "Home", 
  Assignments = "Assignments",
  Applicants = "Applicants", 
  Settings = "Settings"
}

export const AdminSidebarTiles: SidebarTileInfo[] = [
  {
    name: AdminSidebarOptions.Home,
    label: "Home",
    activeIcon: home_active,
    inactiveIcon: home_inactive,
  },
  {
    name: AdminSidebarOptions.Assignments,
    label: "Assignments",
    activeIcon: trainee_active,
    inactiveIcon: trainee_inactive,
  },
  {
    name: AdminSidebarOptions.Applicants,
    label: "Applicants",
    activeIcon: applicants_active,
    inactiveIcon: applicants_inactive,
  },
  {
    name: AdminSidebarOptions.Settings,
    label: "Settings",
    activeIcon: settings_active,
    inactiveIcon: settings_inactive,
  },
]