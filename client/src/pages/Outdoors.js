import React from "react";
import { useQuery } from "@apollo/client";
import { PARKS } from '../utils/queries';
import Auth from '../utils/auth';
import './pages.css';

function Outdoors() {

  const stateCode = Auth.getProfile().data.state
  const { loading, data } = useQuery(PARKS, {
    variables: {
      state: stateCode
    }
  });
  const parkInfo = data?.parks || {};

  if (loading) {
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