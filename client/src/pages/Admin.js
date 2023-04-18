import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { DELETE_USER } from '../utils/mutations';

function Admin() {

  const { data, loading } = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  });

  const users = data?.getUsers || {};

  const handleClick = async (username) => {
    try {
      const { data } = await deleteUser({
        variables: {
          user: username
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
    <main id="admin-page">
      <h1>User Handler</h1>
      <section>
        {users.map((user, index) => (
          <div key={index}
            className="admin-card">
            <h2>{user.username}</h2>
            <ul>
              <li>
                Id: {user._id}
              </li>
              <li>
                {user.homeTown}
              </li>
              <li>
                {user.state}
              </li>
            </ul>
            <div className="admin-likes">
              <h3>Likes</h3>
              <ol>
              {user.likes.map((like, index) => (
                  <li key={index}>{like.event}</li>
              ))}
                </ol>
            </div>
            <div className="admin-posts">
              <h3>Posts</h3>
              <ol>
              {user.posts.map((post, index) => (
                  <li key={index}>{post.createdAt}
                  <br></br>{post.text}</li>
              ))}
                </ol>
            </div>
            <button 
            className="admin-button"
            onClick={() => handleClick(user.username)}>
              Delete</button>
          </div>
        ))}
      </section>
    </main>
  )


}

export default Admin;