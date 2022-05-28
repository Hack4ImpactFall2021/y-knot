//Active and inactive icons for the sidebar
import home_active from "../admin/assets/home_active.png";
import home_inactive from "../admin/assets/home_inactive.png";
import profile_active from "./assets/profile_active.png";
import profile_inactive from "./assets/profile_inactive.png";
import settings_active from "../admin/assets/settings_active.png";
import settings_inactive from "../admin/assets/settings_inactive.png";

//Content components
import TraineeHome from "./TraineeHome";
import AdminSettings from "../admin/AdminSettings";

//Sidebar imports
import { SidebarTileInfo } from "../SidebarAndContent";


export enum TraineeSidebarOptions { 
  Home = "Home", 
  Profile = "Profile",
  Settings = "Settings"
}


export const TraineeSidebarTiles: SidebarTileInfo[] = [
   {
    name: TraineeSidebarOptions.Home,
    label: "Home",
    activeIcon: home_active,
    inactiveIcon: home_inactive,
  },
  {
    name: TraineeSidebarOptions.Profile,
    label: "Profile",
    activeIcon: profile_active,
    //None of these are actually used since the profile doesn't redirect to a SidebarAndContent component
    inactiveIcon: profile_inactive,
  },
  {
    name: TraineeSidebarOptions.Settings,
    label: "Settings",
    activeIcon: settings_active,
    inactiveIcon: settings_inactive,
  }
]