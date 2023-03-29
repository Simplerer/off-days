import React from "react";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

function Likes () {

  const { data, loading } = useQuery(GET_ME)

  const self = data?.getMe || {};
  console.log(self)
  
  if (loading) {
    return (

      <h2>loading...</h2>

    )
  } 


  return (
    <div>
    <h1>Likes</h1>
    {/* {self.likes.map((like) => (
      <div>
        <h1>{like}</h1>
      </div>
    ))} */}
    </div>
  )
};

export default Likes;