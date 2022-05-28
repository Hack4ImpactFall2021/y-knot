import React from "react";
import { AdminSidebarOptions } from "./admin/AdminSidebarInfo";
import { TraineeSidebarOptions } from "./trainee/TraineeSidebarInfo";
import { MentorSidebarOptions } from "./mentor/MentorSidebarInfo";

import Sidebar from "./widgets/Sidebar";

import "./SidebarAndContent.css";

interface Props {
  selected: NavRouteOptions,
  sidebarTiles: { [key in NavRouteOptions]?: SidebarTileInfo }
}

export interface SidebarTileInfo {
  name: NavRouteOptions,
  /* All of these only matter for the sidebar tiles that redirect to a SidebarAndContent type component.
   * There are a few sidebars that redirect to their own pages (e.g. mentor profile and trainee profile). Those
   * sidebar tiles really only need the route. */
  label: string, 
  activeIcon: string,
  inactiveIcon: string, 
}

export type NavRouteOptions = AdminSidebarOptions | MentorSidebarOptions | TraineeSidebarOptions;

const SidebarAndContent : React.FC<Props>= ({ selected, sidebarTiles}) => {
  return (
    <div className="sidebar-and-content">
      {/* Sidebar */}
      <Sidebar selected={selected} sidebarTiles={sidebarTiles} />
      {/* Content */}
      {/* {sidebarTiles[selected]!.contentComponent}  */}
      {/* In hindsight, maybe this wasn't very well thought out. This is what happens when you are a TS novice */}
    </div>
  );
}

export default SidebarAndContent;
