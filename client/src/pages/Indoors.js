import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GAMING } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import './index.css';
import Auth from '../utils/auth';
import Liked from '../components/Liked/Liked.js';

function Indoors() {

  const [liked, setLiked ] = useState(false)
  const clearIt = () => setLiked(!liked)

  const { loading, data } = useQuery(GAMING);
  const [createLike] = useMutation(CREATE_LIKE);

  const games = data?.gaming || {};

  if (loading) {
    return (
      <h2 className="loading">...Loading</h2>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLiked(true)

    const { name, value } = event.target;

    if (Auth.loggedIn()) {
      try {
        const { data } = await createLike({
          variables: {
            event: name,
            link: value
          }
        })
        console.log('DATA', data)
      } catch (error) {
        console.error(error)
      }
    } else (
      console.error('You need to be logged in to like!')
    )
  }

  return (
    <div id="indoors">
      <h1 className="page-titles">Since you are already on the computer...</h1>
      <main className="games-page">
        {
          games.map((game, index) => (
            <div key={index} className="games-box">
              <div className="games-left">
                <img src={game.thumbnail} alt="game thumbnail" />
              </div>
              <div className="games-right">

                <a href={game.game_url} target="_blank" rel="noreferrer">
                  <h2>{game.title}</h2>
                </a>
                <p>{game.short_description}</p>
                {Auth.loggedIn()
                  ?
                  <button
                    name={game.title}
                    value={game.game_url}
                    type="submit"
                    className="likeBtn"
                    onClick={handleSubmit}
                    id="games-like"
                  >Like</button>
                  :
                  <></>
                }
              </div>
            </div>
          ))

        }
       
          <div>
            <Liked liked={liked} clearIt={clearIt}/>
          </div>
        
      </main>
    </div>
  )
};

export default Indoors;