import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Flip from 'react-reveal/Flip';

function WrongPage() {

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])

  return (
    <main className="logged-out">
      <article>
        <Flip>
          <h1>There is nothing to see here!</h1>
          <h2>Guess You really are bored?</h2>
        </Flip>
      </article>
    </main>
  )
};

export default WrongPage;