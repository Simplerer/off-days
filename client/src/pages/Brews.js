import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BREWERIES } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import './index.css';
import Auth from '../utils/auth';
import Liked from '../components/Liked/Liked.js';

function Brews() {

  const [liked, setLiked] = useState(false)
  const clearIt = () => setLiked(!liked)

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
    setLiked(true);

    const { name, value } = event.target;

    if (Auth.loggedIn()) {
      try {
        const { data } = await createLike({
          variables: {
            event: name,
            link: value,
            type: 'brews'
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
    <div id="brews">
      <h1 className="page-titles">Time for a Brewery Tour!</h1>
      <main>
        {
          beers.map((beer, index) => (
            <div key={index}>
              <div className="brew-box">
                <div className="brew-left">
                  <div className="brew-title">
                    
                    {beer.website_url
                      ? <a href={beer.website_url} target='_blank' rel="noreferrer" ><h2>{beer.name}</h2></a>
                      : <a href={`https://www.google.com/search?q=${town}+${beer.name}`} target='_blank' rel="noreferrer"
                      ><h2>{beer.name}</h2></a>
                    }
                  </div>
                  <h3>Located at:</h3>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${(beer.name).replace(' ', '+')}`} target='_blank' rel="noreferrer" >
                    <h3>{beer.street} {town}</h3>
                  </a>
                </div>
                <div className="brew-right">
                  {Auth.loggedIn()
                    ?
                    <button
                      name={beer.name}
                      value={beer.website_url}
                      type="submit"
                      className="likeBtn"
                      onClick={handleSubmit}
                    >Like</button>
                    :
                    <></>
                  }
                </div>
              </div>
              <hr></hr>
            </div>
          ))
        }
        <div>
          <Liked liked={liked} clearIt={clearIt} />
        </div>
      </main>
    </div>
  )
};

export default Brews;