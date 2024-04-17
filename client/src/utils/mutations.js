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
      username
      title
      subtitle
      imageURL
      imageAlt
      date
      lastUpdated
      slug
      introduction
      content
      approved
    }
  }
`;

export const APPROVE_BLOG = gql`
  mutation approveBlog($_id: ID!, $approved: Boolean!) {
    approveBlog(_id: $_id, approved: $approved) {
      _id
      userID
      username
      title
      subtitle
      imageURL
      imageAlt
      date
      lastUpdated
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
      username
      title
      subtitle
      imageURL
      imageAlt
      date
      lastUpdated
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
      username
      title
      subtitle
      imageURL
      imageAlt
      date
      lastUpdated
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

export const ADD_COMMENT = gql`
  mutation addComment($blogID: ID!, $content: String!) {
    addComment(blogID: $blogID, content: $content) {
      _id
      userID
      username
      blogID
      commentID
      parentCommentID
      date
      content
      voteTotal
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($_id: ID!, $content: String!) {
    updateComment(_id: $_id, content: $content) {
      _id
      userID
      username
      blogID
      commentID
      parentCommentID
      date
      content
      voteTotal
    }
  }
`;

export const REPLY_COMMENT = gql`
  mutation replyComment(
    $blogID: ID!
    $commentID: ID!
    $content: String!
    $parentCommentID: ID!
  ) {
    replyComment(
      blogID: $blogID
      commentID: $commentID
      content: $content
      parentCommentID: $parentCommentID
    ) {
      _id
      userID
      username
      blogID
      commentID
      parentCommentID
      date
      content
      voteTotal
    }
  }
`;

export const UPDATE_COMMENT_VOTE = gql`
  mutation updateCommentVote($_id: ID!, $vote: String!) {
    updateCommentVote(_id: $_id, vote: $vote) {
      _id
      userID
      username
      blogID
      commentID
      parentCommentID
      date
      content
      voteTotal
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($_id: ID!) {
    removeComment(_id: $_id) {
      _id
      userID
      username
      blogID
      commentID
      parentCommentID
      date
      content
      voteTotal
    }
  }
`;
