import React, { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  BarChart3,
  UserCircle,
  Boxes,
  Package,
  Receipt,
  Settings,
  LifeBuoy,
  LayoutDashboard,
  Home,
} from "lucide-react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Home");

  const handleItemClick = (itemName) => {
    console.log("Clicked item:", itemName);
    setSelectedItem(itemName);
  };


  return (
    <Sidebar>
      <SidebarItem
        icon={<Home size={20} />}
        text="Workspace"
        active={selectedItem === "Home"}
        onClick={() => handleItemClick("Home")}
        to="/Workspace" // Add this prop
      />
      <SidebarItem
        icon={<UserCircle size={20} />}
        text="HR"
        active={selectedItem === "HR"}
        onClick={() => handleItemClick("HR")}
        to="/HR" // Add this prop
      />
      <SidebarItem
        icon={<Receipt size={20} />}
        text="Setup"
        active={selectedItem === "Setup"}
        onClick={() => handleItemClick("Setup")}
        to="/Setup"
      />
      <SidebarItem
        icon={<Boxes size={20} />}
        text="Projects"
        active={selectedItem === "Projects"}
        onClick={() => handleItemClick("Projects")}
        to="/Projects"
      />
      <SidebarItem
        icon={<Package size={20} />}
        text="Orders"
        active={selectedItem === "Orders"}
        onClick={() => handleItemClick("Orders")}
        to="/Orders"
      />
      <SidebarItem
        icon={<IoMdNotifications size={20} />}
        text="Notifications"
        active={selectedItem === "Notifications"}
        onClick={() => handleItemClick("Notifications")}
        to="/Notifications"
      />
      <hr className="my-3" />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        active={selectedItem === "Settings"}
        onClick={() => handleItemClick("Settings")}
        to="/Settings"
      />
      <SidebarItem
        icon={<LifeBuoy size={20} />}
        text="Help"
        active={selectedItem === "Help"}
        onClick={() => handleItemClick("Help")}
        to="/Help"
      />
    </Sidebar>
  );
};

export default Dashboard;
