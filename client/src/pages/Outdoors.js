import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PARKS } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import Auth from '../utils/auth';
import './index.css';
import Liked from '../components/Liked/Liked.js';

function Outdoors() {

  const [liked, setLiked] = useState(false)
  const clearIt = () => setLiked(!liked)

  const [stateCode, setStateCode] = useState('')
  const [haveParks, setHaveParks] = useState(false)

  const [createLike] = useMutation(CREATE_LIKE);

  useEffect(() => {
    setStateCode(localStorage.getItem('state'))
  }, [])

  if (!stateCode) {
    setStateCode('NC')
  }

  const { data } = useQuery(PARKS, {
    skip: !stateCode,
    variables: {
      state: stateCode
    },
    onCompleted: () => setHaveParks(true)
  });
  const parkInfo = data?.parks || {};

  if (!haveParks) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
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
            type: 'outdoors'
          }
        })
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    } else (
      console.error('You need to be logged in to like!')
    )
  }

  return (
    <div id="outdoors">
      <h1 className="page-titles">Go on and Greet the Outdoors!</h1>
      <main className="page-content">
        {
          parkInfo.map((info, index) => (
            <div className="park-card" key={index}>
              <div className="park-left">
                <img src={info.images[0].url} alt={info.images[0].altText} />
                <a href={info.relatedParks[0].url} target="_blank" rel="noreferrer">
                  <h3>{info.relatedParks[0].fullName}</h3>
                </a>
              </div>
              <div className="park-right">
                <a href={info.url} target="_blank" rel="noreferrer">
                  <h2>{info.title}</h2>
                </a>
                <p>{info.shortDescription}</p>
              </div>
              {Auth.loggedIn()
                ?
                <button
                  name={info.title}
                  value={info.url}
                  type="submit"
                  className="likeBtn"
                  onClick={handleSubmit}
                  id="games-like"
                >Like</button>
                :
                <></>
              }
            </div>
          ))
        }
        <div>
          <Liked liked={liked} clearIt={clearIt} />
        </div>
      </main>
    </div>
  )
}

export default Outdoors