import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

// query users
export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
    }
  }
`;

// query books
export const QUERY_BOOKS = gql`
  query getBooks {
    books {
      _id
      title
      description
      image
      link
    }
  }
`;