import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function WrongPage() {

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  },[])

  return (
    <article>
      <h1>Logged Out!</h1>
      <h2>Get Your Day On!</h2>
    </article>
  )
};

export default WrongPage;