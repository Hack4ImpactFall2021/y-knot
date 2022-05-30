import React from "react";

import { LogoutButton } from "./LogoutButton";
import { NavRouteOptions, SidebarTileInfo } from "../SidebarAndContent";
import { SidebarTile } from "./SidebarTile";

import "./Sidebar.css";

interface Props {
  selected: any,
  sidebarTiles: any
}


const Sidebar: React.FC<Props> = ({ selected, sidebarTiles }) => {
  return (
    <div className="sidebar">
      {sidebarTiles.map((tile:any, idx:any) => {
        return (
          <SidebarTile
            key={idx}
            selected={selected === tile.name}
            route={tile.route}
            label={tile.label}
            activeIcon={tile.activeIcon}
            inactiveIcon={tile.inactiveIcon}
          />
        );
      })}
      <LogoutButton/>
    </div>  
  );
}

export default Sidebar;
