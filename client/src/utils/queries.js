import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
  getMe {
    _id
    username
    password
    homeTown
    posts {
      text
      createdAt
    }
    likes {
      event
      link
      type
    }
  }
}
`

export const GET_USERS = gql`
  query GetUsers {
  getUsers {
    _id
    username
    homeTown
    state
    posts {
      text
      createdAt
    }
    likes {
      event
    }
  }
}
`

export const GET_POSTS = gql`
  query GetPosts {
  getPosts {
    _id
    text
    author {
      username
      homeTown
      state
    }
    createdAt
  }
}
`

export const SEAT_GEEK = gql`
  query SeatGeekSearch($lat: String, $lon: String) {
  seatGeekSearch(lat: $lat, lon: $lon) {
    id
    venue {
      name
      url
    }
    performers {
      name
      image
      url
    }
  }
}
`

export const HOLIDAYS = gql`
  query Holidays {
  holidays {
    name
    date {
      datetime {
        year
        month
        day
      }
    }
    description
    primary_type
  }
}
`

export const BREWERIES = gql`
  query Breweries($homeTown: String) {
  breweries(homeTown: $homeTown) {
    id
    name
    street
    website_url
  }
}
`

export const GAMING = gql`
  query Gaming {
  gaming {
    id
    title
    thumbnail
    short_description
    game_url
  }
}
`

export const PARKS = gql`
  query Parks($state: String) {
  parks(state: $state) {
    id
    url
    title
    shortDescription
    images {
      url
      altText
    }
    relatedParks {
      states
      fullName
      url
    }
  }
}
`

export const FETCHING = gql`
query GetLatLon($homeTown: String) {
  getLatLon(homeTown: $homeTown) {
    lat
    lon
  }
}
`