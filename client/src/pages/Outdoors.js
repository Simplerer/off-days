import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PARKS } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import Auth from '../utils/auth';
import './index.css';

function Outdoors() {
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
      <h1>Go on and Greet the Outdoors!</h1>
      {
        parkInfo.map((info, index) => (
          <div className="park-card" key={index}>
            <a href={info.url}>
              <h2>{info.title}</h2>
            </a>
            <p>{info.shortDescription}</p>
            <a href={info.relatedParks[0].url}>
              <h2>{info.relatedParks[0].fullName}</h2>
            </a>
            <img src={info.images[0].url} alt={info.images[0].altText} />
            <button
              name={info.title}
              value={info.url}
              type="submit"
              onClick={handleSubmit}
            >Like This</button>
          </div>
        ))
      }
    </main>
  )
}

export default Outdoors