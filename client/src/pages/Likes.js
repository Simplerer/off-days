import React from "react";
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import {
  FaCampground,
  FaGamepad,
  FaGuitar,
  FaBeer
} from "react-icons/fa";
import './index.css';

function Likes() {

  const { data, loading } = useQuery(GET_ME)

  const self = data?.getMe || {};

  console.log(self.likes)

  if (loading) {
    return (

      <h2 className="loading">loading...</h2>

    )
  }


  return (
    <div id="like-mobile">
      <h1 className="page-titles">Likes</h1>
      <main className="likes-page">
        {self
          ?
          <>
            {self.likes.map((like, index) => (
              <div className="likes-box" key={index}>
                <div className="like">
                  <h3>{like.event}</h3>
                  <a href={like.link} target="_blank" rel="noreferrer">
                    <button className="likeBtn">Link</button>
                  </a>
                </div>
                <div className="icons">
                  {like.type === "events" &&
                    <NavLink
                      to="/events"
                      style={{ color: "#364958" }}
                      className="like-links" >
                      <FaGuitar />
                    </NavLink>
                  }
                  {like.type === "brews" &&
                    <NavLink
                      to="/brews"
                      style={{ color: "#364958" }}
                      className="like-links" >
                      <FaBeer />
                    </NavLink>
                  }
                  {like.type === "outdoors" &&
                    <NavLink
                      to="/outdoors"
                      style={{ color: "#364958" }}
                      className="like-links" >
                      <FaCampground />
                    </NavLink>
                  }
                  {like.type === "indoors" &&
                    <NavLink
                      to="/indoors"
                      style={{ color: "#364958" }}
                      className="like-links" >
                      <FaGamepad />
                    </NavLink>
                  }
                </div>
                <hr></hr>
              </div>
            ))}
          </>
          :
          <div id="no-likes">
            <h1>No Likes Yet!!</h1>
          </div>}
      </main>
    </div>
  )
};

export default Likes;