import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FETCHING, SEAT_GEEK } from '../utils/queries';
import { CREATE_LIKE } from '../utils/mutations';
import Auth from '../utils/auth';
import './index.css';

function Events() {
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [info, setInfo] = useState(false)
  const [town, setTown] = useState(null)
  const [createLike] = useMutation(CREATE_LIKE);

  useEffect(() => {
    setTown(localStorage.getItem('town'))
  }, [])
  const { error } = useQuery(FETCHING, {
    skip: !town,
    variables: {
      homeTown: town
    },
    onCompleted: (data) => {
      setLat(data.getLatLon.lat)
      setLon(data.getLatLon.lon)
    }
  });

  const { loading, secondError, data } = useQuery(SEAT_GEEK, {
    skip: !lat, // Skip the query if the data from the first query isn't available yet
    variables: {
      lat: lat,
      lon: lon
    }, // Use data from the first query in the variables
    onCompleted: () => setInfo(!info)
  });
  const events = data?.seatGeekSearch || {};

  if (loading) return <h2>Loading...</h2>;
  if (error || secondError) return <p>Error :(</p>;

  if (!info) {
    return (
      <h2>Loading...</h2>
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
    <div id="event">
      <h1 className="page-titles">Maybe catch a show?</h1>
      <main className="event-page">
        {
          events.map((event, index) => (
            <div key={index} className="event-box">
              <h2>{event.performers[0].name}</h2>
              <a href={event.performers[0].url} target='_blank' rel="noreferrer">
                <img src={event.performers[0].image} alt={`${event.performers[0].name}`} />
              </a>
              <div className="event-box-bottom">
                <div className="venue-name">
                  <a href={event.venue.url} target='_blank' rel="noreferrer">
                    <h3>{event.venue.name}</h3>
                  </a>
                </div>
                {Auth.loggedIn()
                  ?
                  <button
                    name={event.performers[0].name}
                    value={event.performers[0].url}
                    type="submit"
                    className="likeBtn"
                    onClick={handleSubmit}
                  >Like</button>
                  :
                  <></>
                }
              </div>
            </div>
          ))
        }
      </main>
    </div>
  )
};

export default Events;