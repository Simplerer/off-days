import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { BREWERIES, GET_ME } from '../utils/queries';
import Auth from '../utils/auth';

function Brews () {
  const { data } = useQuery(GET_ME);
  console.log(data)
  const userData = data?.getMe || {}; 
  console.log(userData)

  // const [findBreweries, { data }] = useLazyQuery(BREWERIES);

  // const songs = data?.findBreweries || {};

  // const [selectedSong, setSelectedSong] = useState('')
  // const [songTitle, setSongTitle] = useState('')
  
  // const findSong = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const { data } = await searchDeezer({
  //       variables: {
  //         song: event.target.id
  //       }
  //     })
  //     await setSelectedSong(data.searchDeezer.preview);
  //     await setSongTitle(data.searchDeezer.title);

  //   } catch (e) {
  //     console.error(e);
  //   }
  // }




  return(
    <h1>Brews</h1>
  )
};

export default Brews;