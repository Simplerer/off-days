import React from "react";
import { useQuery } from '@apollo/client';
import { GAMING } from '../utils/queries';

function Indoors () {

  const { loading, data } = useQuery(GAMING);

  const games = data?.gaming || {};
  console.log(games);

  if (loading) {
    return (
      <h2>...Loading</h2>
    )
  }

  return(
    <>
    <h1>Indoors</h1>
    {
      games.map((game, index) => (
        <div key={index}>
          <h2>{game.title}</h2>
          <a href={game.game_url}>link</a>
          <img src={game.thumbnail} alt="game thumbnail"/>
          <p>{game.short_description}</p>
        </div>
      ))

    }
    </>
  )
};

export default Indoors;