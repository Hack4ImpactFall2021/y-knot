import Settings from "../settings/Settings";
import "../SidebarAndContent.css";
import Sidebar from "../widgets/Sidebar";
import { AdminSidebarOptions, AdminSidebarTiles } from "./AdminSidebarInfo";

const AdminSettings = () => {
  const getSidebarTiles = () => {
    const routes = ["/admin/home", "/admin/assignments", "/admin/applicants", "/admin/settings"];
    const ret = [];
    for (let i = 0; i < routes.length; i++) {
      const cur = { ...AdminSidebarTiles[i], route: routes[i] };
      ret.push(cur);
    }
    return ret;
  }

  return (
    <div className="sidebar-and-content">
      <Sidebar selected={AdminSidebarOptions.Settings} sidebarTiles={getSidebarTiles()}/>
      <Settings />
    </div>
  );
}

export default AdminSettings;