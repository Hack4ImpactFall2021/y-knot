import React from "react";

import "./AdminSidebarTile.css";

import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  route: string;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
  selected: boolean;
}

export const AdminSidebarTile: React.FC<Props> = ({
  name,
  route,
  label,
  activeIcon,
  inactiveIcon,
  selected,
}) => {
  const navigate = useNavigate();

  const className = "admin-sidebar-tile" + (selected ? " selected" : "");
  return (
    <div className={className} onClick={() => navigate(route)}>
      <img
        className=""
        src={selected ? activeIcon : inactiveIcon}
        alt="Uh oh"
      />
      <span>{label}</span>
    </div>
  );
};
