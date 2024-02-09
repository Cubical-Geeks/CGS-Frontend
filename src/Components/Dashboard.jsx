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

  const [selectedItem, setSelectedItem] = useState('Home');

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <Sidebar>
      <Link to="/Workspace">
        <SidebarItem
          icon={<Home size={20} />}
          text="Workspace"
          active={selectedItem === 'Home'}
          onClick={() => handleItemClick('Home')}
        />
      </Link>
      <Link to="/HR">
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="HR"
          active={selectedItem === 'HR'}
          onClick={() => handleItemClick('HR')}
        />
      </Link>
      <Link to="/Setup">
        <SidebarItem
          icon={<Receipt size={20} />}
          text="Setup"
          active={selectedItem === 'Setup'}
          onClick={() => handleItemClick('Setup')}
        />
      </Link>
      <Link to="/Projects">
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Projects"
          active={selectedItem === 'Projects'}
          onClick={() => handleItemClick('Projects')}
        />
      </Link>
      <Link to="/Orders">
        <SidebarItem
          icon={<Package size={20} />}
          text="Orders"
          active={selectedItem === 'Orders'}
          onClick={() => handleItemClick('Orders')}
        />
      </Link>
      <Link to="/Notifications">
        <SidebarItem
          icon={<IoMdNotifications size={20} />}
          text="Notifications"
          active={selectedItem === 'Notifications'}
          onClick={() => handleItemClick('Notifications')}
        />
      </Link>

      <hr className="my-3" />
      <Link to="/Settings">
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={selectedItem === 'Settings'}
          onClick={() => handleItemClick('Settings')}
        />
      </Link>
      <Link to="/Help">
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          active={selectedItem === 'Help'}
          onClick={() => handleItemClick('Help')}
        />
      </Link>
    </Sidebar>
  );
};

export default Dashboard;
