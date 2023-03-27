import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCHING, SEAT_GEEK } from '../utils/queries';
import Auth from '../utils/auth';
import './pages.css';

function Events() {
  const town = Auth.getProfile().data.homeTown;
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

  const { loading, error } = useQuery(FETCHING, {
    variables: {
      homeTown: town
    },
    onCompleted: (data) => {
      setLat(data.getLatLon.lat)
      setLon(data.getLatLon.lon)
    }
  });

  const { secondLoading, secondError, data } = useQuery(SEAT_GEEK, {
    skip: !lat, // Skip the query if the data from the first query isn't available yet
    variables: {
      lat: lat,
      lon: lon
    }, // Use data from the first query in the variables
  });
  const events = data?.seatGeekSearch || {};
  console.log(events)

  if (loading || secondLoading) return <h2>Loading...</h2>;
  if (error || secondError) return <p>Error :(</p>;


  return (
    <main>
      <h1>Events dude!!#!@$!@$</h1>
      {
        events.map((event, index) => (
          <div key={index}>
            <h2>{event.performers[0].name}</h2>
            <a href={event.performers[0].url}>link</a>
            <img src={event.performers[0].image} alt={`${event.performers[0].name}`} />
            <h3>Performing at</h3>
            <a href={event.venue.url}>
              <h3>{event.venue.name}</h3>
            </a>
          </div>
        ))
      }
    </main>
  )
};

export default Events;