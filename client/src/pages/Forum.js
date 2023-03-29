import React from "react";
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_POSTS } from '../utils/queries';
import { ADD_POST } from "../utils/mutations";
import './index.css';
import Auth from '../utils/auth';
import PostForm from "../components/PostForm/PostForm";


function Forum() {

  const { loading, data } = useQuery(GET_POSTS)
  // Add new posts as they are submited
  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  });



  const posts = data?.getPosts || {};

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div>
      <h1 className="page-titles">Some Boredom Busters!</h1>
      <main className="forum-page">
        <div className="forum-top">
        {Auth.loggedIn()
          ? <div>
            <h2>Share some Ideas!</h2>
            < PostForm addPost={addPost} error={error} />
          </div>
          : <div>
            <h2>Login to share your own!</h2>
            <NavLink to='/login'>
              <button className="likeBtn">Login</button>
            </NavLink>
          </div>}
          </div>
        {posts
          ?
          <section className="forum-bottom">
            {posts.map((post, index) => (
              <article key={index} className="post-card">
                <div className="post-head">
                  <h2>By {post.author.username} from {
                  ((post.author.homeTown.charAt(0).toUpperCase()) + (post.author.homeTown.slice(1)))}</h2>
                  <h3>Posted:  {post.createdAt}</h3>
                </div>
                <p className="post-content">{post.text}</p>
                <hr></hr>
              </article>
            ))}
          </section>
          :
          <h1>No One has anything yet!</h1>
        }
      </main>
    </div>
  )
};

export default Forum;