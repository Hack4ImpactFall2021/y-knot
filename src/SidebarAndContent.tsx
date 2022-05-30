import React from "react";
import { AdminSidebarOptions } from "./admin/AdminSidebarInfo";
import { TraineeSidebarOptions } from "./trainee/TraineeSidebarInfo";
import { MentorSidebarOptions } from "./mentor/MentorSidebarInfo";

import Sidebar from "./widgets/Sidebar";

import "./SidebarAndContent.css";


export type NavRouteOptions = AdminSidebarOptions | MentorSidebarOptions | TraineeSidebarOptions;
interface Props {
  selectedTile: NavRouteOptions,
  sidebarTiles: SidebarTileInfo[],
  contentComponent: JSX.Element
}

export interface SidebarTileInfo {
  name: NavRouteOptions,
  route: string, 
  label: string, 
  activeIcon: string,
  inactiveIcon: string, 
}


const SidebarAndContent : React.FC<Props>= ({ selectedTile, sidebarTiles, contentComponent }) => {
  return (
    <div className="sidebar-and-content">
      <Sidebar selected={selectedTile} sidebarTiles={sidebarTiles} />
      {contentComponent}
    </div>
  );
}

export default SidebarAndContent;
