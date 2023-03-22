import React, { useState, useEffect } from "react";
import title from '../assets/OffDays.png';
import Roll from 'react-reveal/Roll';
import Flip from 'react-reveal/Flip';

function Landing() {

  const [logo, setLogo] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLogo(!logo)
    }, 1000)
  }, [])

  return (
    <div>
    <section id="landing">
      <Flip top>
        <h1>Let's find Something to do on your</h1>
      </Flip>
      <Roll top>
        <img style={{ display: logo ? 'block' : 'none' }} src={title} alt='title page' />
      </Roll>
    </section>
    </div>
  )
};

export default Landing;