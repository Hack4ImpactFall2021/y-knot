import React from "react";

import { LogoutButton } from "./LogoutButton";
import { NavRouteOptions, SidebarTileInfo } from "../SidebarAndContent";
import { SidebarTile } from "./SidebarTile";


interface Props {
  selected: any,
  sidebarTiles: any
}

const Sidebar: React.FC<Props> = ({ selected, sidebarTiles }) => {
  return (
    <div className="jason-sidebar">
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
      {/* {Object.values(sidebarTiles).map((curTile, idx) => {
        const { route, label, activeIcon, inactiveIcon, ...rest } = curTile;
        return (
          <SidebarTile 
            key={idx} 
            selected={curTile.name === selected} 
            route={route}
            label={label}
            activeIcon={activeIcon}
            inactiveIcon={inactiveIcon}
          />
        );
      })} */}
      <LogoutButton/>
    </div>  
  );
}

export default Sidebar;
