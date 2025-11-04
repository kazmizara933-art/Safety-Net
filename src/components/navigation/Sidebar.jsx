import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import white from "../../assets/white.png";
import { 
  Menu, 
  Home, 
  MapPin, 
  AlertTriangle, 
  History, 
  Bell, 
  Settings, 
  User 
} from "lucide-react";

const NavItem = ({ icon, label, to, badge, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg transition-colors 
        ${isActive ? 'bg-gray-700 text-white' : 'text-white-300 hover:bg-gray-700 hover:text-grey'}
        ${isCollapsed ? 'justify-center pl-4' : ''}
      `}
      title={isCollapsed ? label : ''}
    >
      <span>{icon}</span>
      {!isCollapsed && (
        <>
          <span className="whitespace-nowrap">{label}</span>
          {badge && (
            <span className="ml-auto bg-red-500 text-white text-xs font-medium px-3 py-0.5 rounded-full animate-pulse">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-red-500 to-gray-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
      <div className="p-4 flex items-center justify-between border-b border-red-700">
        {sidebarOpen ? (
          <Link to="/" className="flex items-center gap-2">
           <div>
      <img src={white} alt="white" className=" w-42 h-auto" />
    </div>
         
          </Link>
        ) : (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto hidden">
            <AlertTriangle size={18} />
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="  hover:bg-red-700 rounded-lg transition-colors"
        >
          <Menu size={20}  />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto font-white">
        <div className="space-y-2">
          <NavItem 
            icon={<Home size={20} />} 
            label="Dashboard" 
            to="/"
            isCollapsed={!sidebarOpen}
          />
          <NavItem 
            icon={<MapPin size={20} />} 
            label="Map View" 
            to="/map-view"
            isCollapsed={!sidebarOpen}
          />
          <NavItem 
            icon={<AlertTriangle size={20} />} 
            label="Incidents" 
            to="/incidents"
            isCollapsed={!sidebarOpen}
          />
          <NavItem 
            icon={<History size={20} />} 
            label="My Report" 
            to="/my-report"
            isCollapsed={!sidebarOpen}
          />
          <NavItem 
            icon={<Bell size={20} />} 
            label="Notifications" 
            to="/notifications" 
            badge={2}
            isCollapsed={!sidebarOpen}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            to="/settings"
            isCollapsed={!sidebarOpen}
          />
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-gray-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium">John Resident</p>
              <p className="text-xs text-gray-400">john@email.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;