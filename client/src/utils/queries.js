import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser($_id: String!) {
    user(_id: $_id) {
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
      username
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
      username
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
      username
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
  query myBlogs {
    myBlogs {
      _id
      userID
      username
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

// query amIAdmin
export const QUERY_AM_I_ADMIN = gql`
  query amIAdmin {
    amIAdmin {
      _id
      userID
    }
  }
`;

// query myUnapprovedBlogs
export const QUERY_MY_UNAPPROVED_BLOGS = gql`
  query myUnapprovedBlogs($offset: Int, $limit: Int, $searchTerm: String) {
    myUnapprovedBlogs(offset: $offset, limit: $limit, searchTerm: $searchTerm) {
      unapprovedBlogs {
        _id
        userID
        username
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
      unapprovedBlogsCount
    }
  }
`;

// query myApprovedBlogs
export const QUERY_MY_APPROVED_BLOGS = gql`
  query myApprovedBlogs($offset: Int, $limit: Int, $searchTerm: String) {
    myApprovedBlogs(offset: $offset, limit: $limit, searchTerm: $searchTerm) {
      approvedBlogs {
        _id
        userID
        username
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
      approvedBlogsCount
    }
  }
`;

// query blog
export const QUERY_BLOG = gql`
  query blog($slug: String!) {
    blog(slug: $slug) {
      blog {
        _id
        userID
        username
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
      username
    }
  }
`;
