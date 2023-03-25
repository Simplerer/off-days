import React from "react";
import { useQuery } from "@apollo/client";
import { BREWERIES } from '../utils/queries';
import Auth from '../utils/auth';

function Brews () {
  const town = Auth.getProfile().data.homeTown

  const { data } = useQuery(BREWERIES, {
    variables: {
      homeTown: town
    }
  });
  const beers = data?.breweries || {};
  console.log(beers)




  return(
    <main>
      <h1>Brews</h1>
    </main>
  )
};

export default Brews;