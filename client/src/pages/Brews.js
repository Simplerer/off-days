import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BREWERIES } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import Auth from '../utils/auth';

function Brews () {
  const [town, setTown] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [createLike] = useMutation(CREATE_LIKE);

  useEffect(() => {
    setTown(localStorage.getItem('town'))
  }, [])

  const { data } = useQuery(BREWERIES, {
    skip: !town,
    variables: {
      homeTown: town
    },
    onCompleted: () => setLoaded(true)
  });
  const beers = data?.breweries || {};
  if (!town) {
    setTown('Asheville')
  }

  if (!loaded) {
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

  return(
    <main>
      <h1>Brews</h1>
      <h2>Hi {Auth.loggedIn() 
      ? Auth.getProfile().data.username
      : 'BrewHopper!'}</h2>
      {
      beers.map((beer, index) => (
        <div key={index}>
          <h2>{beer.name}</h2>
          {beer.website_url 
          ? <a href={beer.website_url}>link</a>
          : <a href={`https://www.google.com/search?q=${town}+${beer.name}`}>Worth a Google!</a>
        } 
          <h3>Located at</h3>
          <h3>{beer.street} {town}</h3>
          <button
              name={beer.name}
              value={beer.website_url}
              type="submit"
              onClick={handleSubmit}
            >Like This</button>
        </div>
      ))
    }
    </main>
  )
};

export default Brews;