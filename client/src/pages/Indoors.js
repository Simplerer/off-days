import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GAMING } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import Auth from '../utils/auth';

function Indoors() {

  const { loading, data } = useQuery(GAMING);
  const [createLike] = useMutation(CREATE_LIKE);

  const games = data?.gaming || {};

  if (loading) {
    return (
      <h2>...Loading</h2>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    <main>
      <h1>Indoors</h1>
      {
        games.map((game, index) => (
          <div key={index}>
            <h2>{game.title}</h2>
            <a href={game.game_url}>link</a>
            <img src={game.thumbnail} alt="game thumbnail" />
            <p>{game.short_description}</p>
            <button
              name={game.title}
              value={game.game_url}
              type="submit"
              onClick={handleSubmit}
            >Like This</button>
          </div>
        ))

      }
    </main>
  )
};

export default Indoors;