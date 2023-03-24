import React, { useState, useEffect } from "react";
import title from '../assets/OffDays.png';
import Roll from 'react-reveal/Roll';
import Flip from 'react-reveal/Flip';
import {
  FaCampground,
  FaHome,
  FaGamepad,
  FaGuitar,
  FaBeer,
  FaGavel
} from "react-icons/fa";

function Landing() {

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
  
  return (
    <main id="landing">
      <section id="welcome">
        <Flip top>
          <h1>Let's find Something to do on your</h1>
        </Flip>
        <Roll top>
          <img style={{ display: logo ? 'block' : 'none' }}
            src={title} alt='title page' />
        </Roll>
      </section>
      <section id="pages">
        <Flip>
          <div style={{ display: pages ? 'block' : 'none' }}>
            <FaCampground />
          </div>
        </Flip>
        <Flip>
          <div style={{ display: pages ? 'block' : 'none' }}>
            <FaHome />
          </div>
        </Flip>
        <Flip>
          <div style={{ display: pages ? 'block' : 'none' }}>
            <FaGamepad />
          </div>
        </Flip>
        <Flip>
          <div style={{ display: pages ? 'block' : 'none' }}>
            <FaGuitar />
          </div>
        </Flip>
        <Flip>
          <div style={{ display: pages ? 'block' : 'none' }}>
            <FaBeer />
          </div>
        </Flip>
        <Flip>
          <div style={{ display: pages ? 'block' : 'none' }}>
            <FaGavel />
          </div>
        </Flip>
      </section>
    </main>
  )
};

export default Landing;