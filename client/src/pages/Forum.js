import React from "react";
import { NavLink } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { GET_POSTS } from '../utils/queries';
import { ADD_POST } from "../utils/mutations";
import Auth from '../utils/auth';
import PostForm from "../components/PostForm/PostForm";


function Forum() {

  const { loading, data } = useQuery(GET_POSTS)
  // Add new posts as they are submited
  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }]
  });
  
  

  const posts = data?.getPosts || {};
  console.log(posts)

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <main>
      <h1>Some Boredom Busters!</h1>
      {Auth.loggedIn()
        ? <div>
          <h2>Share some Ideas!</h2>
          < PostForm addPost={addPost} error={error} />
        </div>
        : <div>
          <h2>Login to share your own!</h2>
          <NavLink to='/login'>
            <button>Login</button>
          </NavLink>
        </div>}
      {posts
        ?
        <section>
          {posts.map((post, index) => (
            <article key={index}>
              <div>
                <h2>By {post.author.username} from {post.author.homeTown}</h2>
                <h2>Posted:  {post.createdAt}</h2>
              </div>
              <p>{post.text}</p>
            </article>
          ))}
        </section>
        :
        <h1>No One has anything yet!</h1>
      }
    </main>
  )
};

export default Forum;