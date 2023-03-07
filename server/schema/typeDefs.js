const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
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
    post: Post
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    getMe: User
    getUsers: [User]
    getPosts: [Post]
  }

  type Mutation {
    createUser(
      username: String!,
      email: String!,
      password: String!
    ): Auth
    login(username: String!, password: String!): Auth
    deleteUser: User
    createLike(userId: ID, event: String!): User 
    addPost(text: String, userId: ID): Post
    createComment(text: String!, userId: ID!, postId: ID!): Comment
  }
`;

module.exports = typeDefs;