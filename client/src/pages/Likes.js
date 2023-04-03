import React from "react";
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import Flip from 'react-reveal/Flip';
import {
  FaCampground,
  FaGamepad,
  FaGuitar,
  FaBeer,
  FaGavel
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
    <div className="likes">
      <h1 className="page-titles">Likes</h1>
      <main className="likes-page">
          {self.likes.map((like, index) => (
        <div className="likes-box" key={index}>
            <div className="like">
              <h3>{like.event}</h3>
              <a href={like.link} target="_blank" rel="noreferrer">
                <button className="likeBtn">Link</button>
              </a>
            </div>
              <hr></hr>
        </div>
          ))}
      </main>
        <div className="likes-nav">
          <section className="likes-icons">
            <Flip>
              <div
                className="like-links" >
                <NavLink
                  to="/events"
                  style={{ color: "#364958" }}
                  className="like-links" >
                  <FaGuitar />
                </NavLink>
              </div>
            </Flip>
            <Flip>
              <div
                className="like-links" >
                <NavLink
                  to="/brews"
                  style={{ color: "#364958" }} >
                  <FaBeer />
                </NavLink>
              </div>
            </Flip>
            <Flip>
              <div
                className="like-links" >
                <NavLink to="/outdoors"
                  style={{ color: "#364958" }} >
                  <FaCampground />
                </NavLink>
              </div>
            </Flip>
            <Flip>
              <div
                className="like-links" >
                <NavLink to="/indoors"
                  style={{ color: "#364958" }} >
                  <FaGamepad />
                </NavLink>
              </div>
            </Flip>
            <Flip>
              <div
                className="like-links" >
                <NavLink to="/forum"
                  style={{ color: "#364958" }} >
                  <FaGavel />
                </NavLink>
              </div>
            </Flip>
          </section>
        </div>
    </div>
  )
};

export default Likes;