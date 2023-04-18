import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { DELETE_USER } from '../utils/mutations';

function Admin() {

  const { data, loading } = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER , {
    refetchQueries: [{ query: GET_USERS }]
  });

  const users = data?.getUsers || {};

  const handleClick = async (name) => {
    try {
      console.log(name)
      const { data } = await deleteUser({
        variables: {
          username: name
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
      <section id="admin-content">
        {users.map((user, index) => (
          <div key={index}
            className="admin-card">
            <div className="admin-area">
              <h2 className="admin-titles">{user.username}</h2>
              <p>
                Id: {user._id}
              </p>
              <p>
                {user.homeTown}, {user.state}
              </p>
            </div>
            <div className="admin-area">
              <h3 className="admin-titles">Likes</h3>
              {user.likes.map((like, index) => (
                <p key={index}>{like.event}</p>
              ))}
            </div>
            <div className="admin-area">
              <h3 className="admin-titles">Posts</h3>
              {user.posts.map((post, index) => (
                <div key={index} className="admin-post">
                  <p>{post.createdAt}</p>
                  <p>{post.text}</p>
                </div>
              ))}
            </div>
            <button
              className="deleteBtn"
              onClick={() => handleClick(user.username)}>
              Delete</button>
          </div>
        ))}
      </section>
    </main>
  )


}

export default Admin;