import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () =>{
  const [activeMenuItem, setactiveMenuItem] = useState();

  const setMenuItemCollapsedOrnot = () =>{
    if(window.location.pathname == '/admin/settings'){
      setactiveMenuItem('settings');
    }else if(window.location.pathname == '/admin/dashboard'){
      setactiveMenuItem('dashboard');
    }else if(window.location.pathname == '/admin/sections'){
      setactiveMenuItem('sections');
    }
  
  }

  useEffect(()=>{
    setMenuItemCollapsedOrnot();
  },[]);
    return (
        <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item ">
        <Link className={activeMenuItem == 'dashboard'?'nav-link':'nav-link collapsed'} to="/admin/dashboard">
        <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
        
      </li>

      <li className="nav-item">
        <Link className={activeMenuItem == 'sections'?'nav-link':'nav-link collapsed'} to="/admin/sections">
        <i className="bi bi-grid"></i>
          <span>Sections</span>
        </Link>
        
      </li>

      <li className="nav-item">
        <Link className={activeMenuItem == 'pages'?'nav-link':'nav-link collapsed'} to="/admin/dashboard">
        <i className="bi bi-grid"></i>
          <span>Pages</span>
        </Link>
        
      </li>

      <li className="nav-item">
        <Link className={activeMenuItem == 'orders'?'nav-link':'nav-link collapsed'} to="/admin/dashboard">
        <i className="bi bi-grid"></i>
          <span>Orders</span>
        </Link>
        
      </li>

      <li className="nav-item">
        <Link className={activeMenuItem == 'settings'?'nav-link':'nav-link collapsed'} to="/admin/settings">
        <i className="bi bi-grid"></i>
          <span>Settings</span>
        </Link>
        
      </li>


      

    </ul>

  </aside>
    );

}

export default Sidebar;