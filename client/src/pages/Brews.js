import React from "react";
import { useQuery } from "@apollo/client";
import { BREWERIES } from '../utils/queries';
import Auth from '../utils/auth';

function Brews () {
  
  const town = Auth.getProfile().data.homeTown
  const { loading, data } = useQuery(BREWERIES, {
    variables: {
      homeTown: town
    }
  });
  const beers = data?.breweries || {};
  const townProper = town[0].toUpperCase() + town.slice(1)

  if (loading) {
    return (
      <h2>...Loading</h2>
    )
  }

  return(
    <main>
      <h1>Brews</h1>
      <h2>Hi {Auth.getProfile().data.username}</h2>
      {
      beers.map((beer, index) => (
        <div key={index}>
          <h2>{beer.name}</h2>
          {beer.website_url 
          ? <a href={beer.website_url}>link</a>
          : <a href={`https://www.google.com/search?q=${townProper}+${beer.name}`}>Worth a Google!</a>
        } 
          <h3>Located at</h3>
          <h3>{beer.street} {townProper}</h3>
        </div>
      ))
    }
    </main>
  )
};

export default Brews;