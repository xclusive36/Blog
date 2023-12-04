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

// query allBlogs
export const QUERY_ALL_BLOGS = gql`
  query allBlogs {
    allBlogs {
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

// query unapprovedBlogs
export const QUERY_UNAPPROVED_BLOGS = gql`
  query unapprovedBlogs {
    unapprovedBlogs {
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

// query approvedBlogs
export const QUERY_APPROVED_BLOGS = gql`
  query approvedBlogs {
    approvedBlogs {
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

// query myUnapprovedBlogs
export const QUERY_MY_UNAPPROVED_BLOGS = gql`
  query myUnapprovedBlogs($userID: String!) {
    myUnapprovedBlogs(userID: $userID) {
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

// query myBlogs
export const QUERY_MY_BLOGS = gql`
  query myBlogs($userID: String!) {
    myBlogs(userID: $userID) {
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

// query myApprovedBlogs
export const QUERY_MY_APPROVED_BLOGS = gql`
  query myApprovedBlogs($userID: String!) {
    myApprovedBlogs(userID: $userID) {
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