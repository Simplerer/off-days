import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { LOGIN_USER } from '../../utils/mutations';
import { NavLink } from 'react-router-dom';
import Auth from '../../utils/auth';
import './index.css'

import {
  FaThList,
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

function Navbar({ children, background }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuOpen = () => setIsOpen(!isOpen);
  const menuItems = [
    {
      path: '/',
      name: 'Home',
      icon: <FaHome />
    },
    {
      path: '/events',
      name: 'Events',
      icon: <FaGuitar />
    },
    {
      path: '/brews',
      name: 'Brews',
      icon: <FaBeer />
    },
    {
      path: '/outdoors',
      name: 'Outdoors',
      icon: <FaCampground />
    },
    {
      path: '/indoors',
      name: 'Indoors',
      icon: <FaGamepad />
    },
    {
      path: '/forum',
      name: 'Forum',
      icon: <FaGavel />
    },
    {
      path: '/likes',
      name: 'Likes',
      icon: <FaRegThumbsUp />
    }
  ];
  return (
    <div className="container">
      <div
        style={{ width: isOpen ? '200px' : '50px' }}
        className="navbar">
        <div className="top-section">
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">Off Days</h1>
          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <FaThList onClick={menuOpen} />
          </div>

        </div>
        {
          menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" >
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? 'block' : 'none' }} className="link-text">{item.name}</div>
            </NavLink>
          ))
        }
        {Auth.loggedIn() ? (
          <NavLink to="/" className="link" >
            <div className="icon"><FaLock /></div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link-text">Logout</div>
          </NavLink>
        ) : (
          <NavLink to="/login" className="link" >
            <div className="icon"><FaLockOpen /></div>
            <div style={{ display: isOpen ? 'block' : 'none' }} className="link-text">Login/Signup</div>
          </NavLink>
        )}
      </div>
      <main className='content' style={{ backgroundColor: background ? '' : '#C9E4CA' }}>{children}</main>
    </div>
  )
}

export default Navbar;