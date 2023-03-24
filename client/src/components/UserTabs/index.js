import React, { useState } from "react";
import './index.css';
import Login from './Login';
import Signup from './Signup';

function Tabs() {

  const [openTab, setOpenTab] = useState(true)
  
  return (

    <div className="tabBox">
      <section className="tabTop">
        <div className={openTab ? "tabs active-tabs" : "tabs" }
        onClick={()=>setOpenTab(!openTab)}>Login</div>
        <div className={openTab ? "tabs" : "tabs active-tabs" }
        onClick={()=>setOpenTab(!openTab)}>Signup</div>
      </section>
      <section className="tabContent">
          {openTab 
          ? <Login /> 
          : <Signup />
          }
      </section>



    </div>


  )
};

export default Tabs