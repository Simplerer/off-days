import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

// import Auth from '../../utils/auth';
import {
  FaThList,
  FaCampground,
  FaHome,
  FaGamepad,
  FaGuitar,
  FaBeer
} from 'react-icons/fa';

function Navbar({children}) {
  const[isOpen, setIsOpen] = useState(false);
  const menuOpen = () => setIsOpen (!isOpen);
  const menuItems = [
    {
      path:'/',
      name: 'Home',
      icon:<FaHome/>
    },
    {
      path:'/events',
      name: 'Events',
      icon:<FaGuitar/>
    },
    {
      path:'/brews',
      name: 'Brews',
      icon:<FaBeer/>
    },
    {
      path:'/outdoors',
      name: 'Outdoors',
      icon:<FaCampground/>
    },
    {
      path:'/indoors',
      name: 'Indoors',
      icon:<FaGamepad/>
    }
  ];
  return (
    <div className="container">
      <div 
      style={{width: isOpen ? '200px' : '50px'}}
       className="navbar">
        <div className="top-section">
          <h1 style={{display: isOpen ? 'block' : 'none'}} className="logo">Off Days</h1>
          <div style={{marginLeft: isOpen ? '50px' : '0px'}} className="bars">
            <FaThList onClick={menuOpen}/>
          </div>

        </div>
        {
          menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{display: isOpen ? 'block' : 'none'}} className="link-text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Navbar;