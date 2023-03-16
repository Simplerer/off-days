import React from "react";
import { Link } from 'react-router-dom';
// import Auth from '../../utils/auth';

function Navbar() {
  return (
    <>
      <h1>BLLLLLL</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/outdoors'>Outdoors</Link>
        </li>
      </ul>
    </>
  )
}

export default Navbar;