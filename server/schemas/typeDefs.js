// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # This "Blog" type defines the queryable fields for every blog in our data source.
  type Blog {
    _id: ID
    userID: String
    title: String
    subtitle: String
    imageURL: String
    imageAlt: String
    date: String
    slug: String
    introduction: String
    content: String
    approved: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  # The "user" query returns a single User (defined above).
  # The "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    user(_id: ID!): User
    allBlogs: [Blog]
    unapprovedBlogs: [Blog]
    approvedBlogs: [Blog]
    myUnapprovedBlogs(userID: String!): [Blog]
    myBlogs(userID: String!): [Blog]
    myApprovedBlogs(userID: String!): [Blog]
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each. In this
  # case, the "addUser" mutation returns an Auth (defined above).
  # The "login" mutation returns an Auth (defined above).
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    login(email: String!, password: String!): Auth
    addBlog(userID: String!, title: String!, subtitle: String!, imageURL: String, imageAlt: String, date: String!, slug: String!, introduction: String!, content: String!, approved: Boolean): Blog
  }
`;
