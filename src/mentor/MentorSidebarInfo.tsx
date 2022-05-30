//Active and inactive icons for the sidebar
import home_active from "../admin/assets/home_active.png";
import home_inactive from "../admin/assets/home_inactive.png";
import profile_active from "../trainee/assets/profile_active.png";
import profile_inactive from "../trainee/assets/profile_inactive.png";
import resources_active from "./assets/resources_active.png";
import resources_inactive from "./assets/resources_inactive.png";
import settings_active from "../admin/assets/settings_active.png";
import settings_inactive from "../admin/assets/settings_inactive.png";

//Content components
import MentorHome from "./MentorHome";
import MentorProfile from "./MentorProfile";
import MentorResources from "./MentorResources";
import AdminSettings from "../admin/AdminSettings";

import { SidebarTileInfo } from "../SidebarAndContent";

export enum MentorSidebarOptions { 
  Home = "Home", 
  Profile = "Profile",
  Resources = "Resources", 
  Settings = "Settings"
}

export const MentorSidebarTiles: SidebarTileInfo[] = [
  {
    name: MentorSidebarOptions.Home,
    label: "Home",
    activeIcon: home_active,
    inactiveIcon: home_inactive,
  },
  {
    name: MentorSidebarOptions.Profile,
    label: "Profile",
    activeIcon: profile_active,
    inactiveIcon: profile_inactive,
  },
  {
    name: MentorSidebarOptions.Resources,
    label: "Resources",
    activeIcon: resources_active,
    inactiveIcon: resources_inactive,
  },
  {
    name: MentorSidebarOptions.Settings,
    label: "Settings",
    activeIcon: settings_active,
    inactiveIcon: settings_inactive,
  },
]