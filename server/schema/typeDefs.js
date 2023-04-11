const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String!
    password: String!
    homeTown: String
    state: String
    posts: [Post]
    likes: [Likes]
  }

  type Likes {
    _id: ID
    event: String
    link: String
    type: String
  }

  type Post {
    _id: ID
    text: String
    author: User
    createdAt: String
  }

  type Comment {
    _id: ID
    text: String
    author: User
    post: ID
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Performer {
    name: String
    image: String
    url: String
  }

  type Venue {
    name: String
    url: String
  }

  type SeatGeek {
    id: ID
    venue: Venue
    performers: [Performer]
  }

  type Datetime {
    year: Int 
    month: Int 
    day: Int 
  }

  type Date {
    datetime: Datetime 
  }

  type Holiday {
    name: String
    date: Date
    description: String
    primary_type: String
  }

  type Brewery {
    id: ID
    name: String
    street: String
    website_url: String
  }

  type Game {
    id: ID
    title: String
    thumbnail: String
    short_description: String
    game_url: String
  }

  type Park {
    states: String
    fullName: String
    url: String
  }

  type Image {
    url: String
    altText: String
  }

  type Parks {
    id: ID
    url: String
    title: String
    shortDescription: String
    images: [Image]
    relatedParks: [Park]
  }

  type Location {
    lat: String
    lon: String
  }

  type Query {
    getMe: User
    getUsers: [User]
    getPosts: [Post]
    seatGeekSearch(lat: String, lon: String): [SeatGeek]
    holidays: [Holiday]
    #(date: Int)
    breweries(homeTown: String): [Brewery]
    gaming: [Game]
    parks(state: String): [Parks]
    getLatLon(homeTown: String): Location
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!
      homeTown: String!
      state: String
    ): Auth
    login(username: String!, password: String!): Auth
    deleteUser: User
    addPost(text: String, userId: ID): Post
    createComment(text: String!, userId: ID!, postId: ID!): Comment
    createLike(userId: ID, event: String, link: String, type: String): User 
  }
`;

module.exports = typeDefs;