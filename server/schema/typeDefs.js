const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    posts: [Post]
    likes: [Likes]
  }

  type Likes {
    _id: ID
    event: String!
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

  type Query {
    getMe: User
    getUsers: [User]
    getPosts: [Post]
    seatGeekSearch: [SeatGeek]
    #(city: String!)
    holidays: [Holiday]
    #(date: Int)
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!
    ): Auth
    login(username: String!, password: String!): Auth
    deleteUser: User
    addPost(text: String, userId: ID): Post
    createComment(text: String!, userId: ID!, postId: ID!): Comment
    createLike(userId: ID, event: String!): User 
  }
`;

module.exports = typeDefs;