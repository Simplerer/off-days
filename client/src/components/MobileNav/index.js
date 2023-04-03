import React from "react";
import { NavLink } from 'react-router-dom';
import Auth from '../../utils/auth';
import './index.css';
import {
  FaCampground,
  FaHome,
  FaGamepad,
  FaGuitar,
  FaBeer,
  FaGavel,
  FaRegThumbsUp,
  FaLock,
  FaLockOpen
} from 'react-icons/fa';



function MobileNav () {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  } 
  

  return (
    <div className="header">
      <div
        className="mobile-navbar">
        <NavLink to="/" className="mobile-link" ><FaHome /></NavLink>
        <NavLink to="/events" className="mobile-link" ><FaGuitar /></NavLink>
        <NavLink to="/brews" className="mobile-link" ><FaBeer /></NavLink>
        <NavLink to="/outdoors" className="mobile-link" ><FaCampground /></NavLink>
        <NavLink to="/indoors" className="mobile-link" ><FaGamepad /></NavLink>
        <NavLink to="/forum" className="mobile-link" ><FaGavel /></NavLink>
        {Auth.loggedIn() ? (
          <>
          <NavLink to="/likes" className="mobile-link">
          <FaRegThumbsUp />
          </NavLink>
          <NavLink to="/logout" className="mobile-link" onClick={logout}>
          <FaLock />
          </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="mobile-link" >
            <FaLockOpen />
          </NavLink>
        )}
      </div>
    </div>
  ) 

};

export default MobileNav;