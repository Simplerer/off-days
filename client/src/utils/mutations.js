import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      password
      homeTown
      posts {
        _id
        text
        createdAt
      }
      likes {
        _id
        event
      }
    }
  }
}
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!, $homeTown: String!) {
  createUser(username: $username, email: $email, password: $password, homeTown: $homeTown) {
    token
    user {
      username
      homeTown
      password
    }
  }
}
`

export const DELETE_USER = gql`
  mutation DeleteUser {
  deleteUser {
    _id
    username
  }
}
`

export const ADD_POST = gql`
  mutation AddPost($text: String, $userId: ID) {
  addPost(text: $text, userId: $userId) {
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

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!, $userId: ID!, $postId: ID!) {
  createComment(text: $text, userId: $userId, postId: $postId) {
    _id
    text
    author {
      username
      homeTown
    }
    post
    createdAt
  }
}
`

export const CREATE_LIKE = gql`
  mutation CreateLike($event: String!, $userId: ID) {
  createLike(event: $event, userId: $userId) {
    username
    likes {
      _id
      event
    }
    homeTown
  }
}
`

