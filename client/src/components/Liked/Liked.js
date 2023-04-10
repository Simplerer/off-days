import React from "react";
import './index.css';

function Liked({ liked, clearIt }) {
  return (
    <div style={{ display: liked ? 'block' : 'none' }}>
      <main className="likes">
        <section className="popup">
          <div className="liked-box">
          </div>
          <h1>
            Added to Likes!
          </h1>
          <button id="clearBtn" onClick={clearIt}>Got it!</button>
        </section>
      </main>
    </div>
  )
};

export default Liked;