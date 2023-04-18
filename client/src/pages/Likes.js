import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { DELETE_LIKE } from '../utils/mutations';
import {
  FaCampground,
  FaGamepad,
  FaGuitar,
  FaBeer,
  // FaCommentsDollar
} from "react-icons/fa";
import './index.css';

function Likes() {

  const { data, loading } = useQuery(GET_ME)
  const [deleteLike] = useMutation(DELETE_LIKE, {
    refetchQueries: [{ query: GET_ME }]
  });

  const self = data?.getMe || {};

  const handleClick = async (like) => {
    try {
      const { data } = await deleteLike({
        variables: {
          event: like
        }
      })
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
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
                  <a href={like.link} target="_blank" rel="noreferrer">
                  <h3>{like.event}</h3>
                  </a>
                    <button
                     className="deleteBtn"
                     onClick={() => handleClick(like.event)}
                     >Delete</button>
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