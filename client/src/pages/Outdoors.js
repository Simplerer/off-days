import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { PARKS } from '../utils/queries';
import './pages.css';

function Outdoors() {
  const [stateCode, setStateCode] = useState('')
  const [haveParks, setHaveParks] = useState(false)

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
          </div>
        ))
      }
    </main>
  )
}

export default Outdoors