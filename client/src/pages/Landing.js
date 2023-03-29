import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import title from '../assets/OffDays-sm.png';
import Roll from 'react-reveal/Roll';
import Flip from 'react-reveal/Flip';
import {
  FaCampground,
  // FaHome,
  FaGamepad,
  FaGuitar,
  FaBeer,
  FaGavel
} from "react-icons/fa";
import '../App.css';

function Landing() {

  // These are delays for the logo and symbols ----
  const [logo, setLogo] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLogo(!logo)
    }, 1000)
  }, [])

  const [pages, setPages] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setPages(!pages)
    }, 3000)
  }, [])

  const styles = {
    navLink: {
      color: "#364958",
    },
    hoverLink: {
      color: "#364958",
      size: '105%',
    }
  }

  return (
    <main id="landing">
      <section id="welcome">
        <Flip top>
          <h1>Let's find Something to do on your</h1>
        </Flip>
        <Roll top>
          <img style={{ display: logo ? 'block' : 'none', width: 'auto', height: 'auto' }}
            src={title} alt='title page' />
        </Roll>
      </section>
      <section id="pages">
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink
              to="/events"
              style={{ color: "#364958" }} >
              <FaGuitar />
            </NavLink>
          </div>
        </Flip>
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink
              to="/brews"
              style={{ color: "#364958" }} >
              <FaBeer />
            </NavLink>
          </div>
        </Flip>
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink to="/outdoors"
              style={{ color: "#364958" }} >
              <FaCampground />
            </NavLink>
          </div>
        </Flip>
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink to="/indoors"
              style={{ color: "#364958" }} >
              <FaGamepad />
            </NavLink>
          </div>
        </Flip>
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink to="/forum"
              style={{ color: "#364958" }} >
              <FaGavel />
            </NavLink>
          </div>
        </Flip>
      </section>
    </main>
  )
};

export default Landing;