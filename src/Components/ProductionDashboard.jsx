import React, { useState } from 'react'
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

const ProductionDashboard = () => {

  const [selectedItem, setSelectedItem] = useState("Workspace");

  const handleItemClick = (itemName) => {
    console.log("Clicked item:", itemName);
    setSelectedItem(itemName);
  };

  return (
    <Sidebar>
      <SidebarItem
        icon={<Home size={20} />}
        text="Workspace"
        active={selectedItem === "Workspace"}
        onClick={() => handleItemClick("Workspace")}
        to="/WorkspaceProduction"
      />
      <SidebarItem
        icon={<Receipt size={20} />}
        text="Attachments"
        active={selectedItem === "Attachments"}
        onClick={() => handleItemClick("Attachments")}
        to="/Attachments"
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
  )
}

export default ProductionDashboard