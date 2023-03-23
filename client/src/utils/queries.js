import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
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
    }
    createdAt
  }
}
`

export const SEAT_GEEK = gql`
  query SeatGeekSearch {
  seatGeekSearch {
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
  query Breweries {
  breweries {
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
  query Parks {
  parks {
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