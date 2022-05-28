import React from "react";

import "./SidebarTile.css";

import { useNavigate } from "react-router-dom";

interface Props {
  selected: boolean
  route: string,
  label: string,
  activeIcon: string,
  inactiveIcon: string,
}


export const SidebarTile: React.FC<Props> = ({ selected, route, label, activeIcon, inactiveIcon }) => {
  const navigate = useNavigate();

  const className = "jason-sidebar-tile" + (selected ? " selected" : "");
  return (
    <div className={className} onClick={() => navigate(route)}>
      <img className="" src={selected ? activeIcon : inactiveIcon} alt="Uh oh"/>
      <span>
        {label}
      </span>
    </div>
  );
}