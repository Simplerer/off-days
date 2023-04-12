import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import title from '../assets/OffDays-sm.png';
import Roll from 'react-reveal/Roll';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import {
  FaCampground,
  // FaHome,
  FaGamepad,
  FaGuitar,
  FaBeer,
  FaGavel
} from "react-icons/fa";
import '../App.css';
import Auth from '../utils/auth'

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
  
  const [info, setInfo] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setInfo(!info)
    }, 5000)
  }, [])

  return (
    <main id="landing">
      <section id="welcome">
        <Flip top>
          <h1>Let's find Something to do on your</h1>
        </Flip>
          <span id="landing-icon">
        <Roll top>
            <img style={{ display: logo ? 'block' : 'none', width: 'auto', height: 'auto' }}
              src={title} alt='title page' />
        </Roll>
          </span>
      </section>
      <section id="pages">
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink
              to={Auth.loggedIn() ? "/events" : "/login"}
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
              to={Auth.loggedIn() ? "/brews" : "/login"}
              style={{ color: "#364958" }} >
              <FaBeer />
            </NavLink>
          </div>
        </Flip>
        <Flip>
          <div
            style={{ display: pages ? 'block' : 'none' }}
            className="home-links" >
            <NavLink to={Auth.loggedIn() ? "/outdoors" : "/login"}
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
      <Fade>
      <section style={{ display: info ? 'block' : 'none' }}
      className="landing-info">
        <div id="info-top">
          <h2><span className="info-words">Stuck</span> doing the same <span className="info-words">old</span> stuff?</h2>
        </div>
        <div id="info-mid">
          <h3>Find events unique to your location!</h3>
          <h3>Signup or just see what is open for all!</h3>
        </div>
        <div id="info-bottom">
          <h2>Get your <span className="info-words">ideas</span> and get <span className="info-words">Doing</span>.</h2>
        </div>
      </section>
      </Fade>
    </main>
  )
};

export default Landing;