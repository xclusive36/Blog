import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($_id: ID!) {
    removeUser(_id: $_id) {
      _id
      username
      email
    }
  }
`;

export const ADD_BLOG = gql`
  mutation addBlog(
    $title: String!
    $subtitle: String!
    $imageURL: String!
    $imageAlt: String!
    $introduction: String!
    $content: String!
  ) {
    addBlog(
      title: $title
      subtitle: $subtitle
      imageURL: $imageURL
      imageAlt: $imageAlt
      introduction: $introduction
      content: $content
    ) {
      _id
      userID
      title
      subtitle
      imageURL
      imageAlt
      date
      slug
      introduction
      content
      approved
    }
  }
`;

export const APPROVE_BLOG = gql`
  mutation approveBlog($_id: ID!) {
    approveBlog(_id: $_id) {
      _id
      userID
      title
      subtitle
      imageURL
      imageAlt
      date
      slug
      introduction
      content
      approved
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog(
    $_id: ID!
    $title: String!
    $subtitle: String!
    $imageURL: String!
    $imageAlt: String!
    $introduction: String!
    $content: String!
  ) {
    updateBlog(
      _id: $_id
      title: $title
      subtitle: $subtitle
      imageURL: $imageURL
      imageAlt: $imageAlt
      introduction: $introduction
      content: $content
    ) {
      _id
      userID
      title
      subtitle
      imageURL
      imageAlt
      date
      slug
      introduction
      content
      approved
    }
  }
`;

export const REMOVE_BLOG = gql`
  mutation removeBlog($_id: ID!) {
    removeBlog(_id: $_id) {
      _id
      userID
      title
      subtitle
      imageURL
      imageAlt
      date
      slug
      introduction
      content
      approved
    }
  }
`;

export const ADD_AMINISTRATOR = gql`
  mutation addAdministrator($userID: String!) {
    addAdministrator(userID: $userID) {
      _id
      userID
    }
  }
`;
