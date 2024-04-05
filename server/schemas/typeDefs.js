// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Administrator {
    _id: ID
    userID: String
  }

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
    username: String
    title: String
    subtitle: String
    imageURL: String
    imageAlt: String
    date: String
    lastUpdated: String
    slug: String
    introduction: String
    content: String
    approved: Boolean
  }

  # This "Comment" type defines the queryable fields for every comment in our data source.
  type Comment {
    _id: ID
    userID: String
    username: String
    blogID: String
    date: String
    content: String
  }

  type MyBlogObject {
    unapprovedBlogs: [Blog]
    unapprovedBlogsCount: Int
    approvedBlogs: [Blog]
    approvedBlogsCount: Int
  }

  type blogs {
    blogs: [Blog]
    blogsCount: Int
  }

  type myUnapproved {
    unapprovedBlogs: [Blog]
    unapprovedBlogsCount: Int
  }

  type myApproved {
    approvedBlogs: [Blog]
    approvedBlogsCount: Int
  }

  type BlogObject {
    blog: Blog
    username: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  # The "user" query returns a single User (defined above).
  # The "books" query returns an array of zero or more Books (defined above).
  type Query {
    amIAdmin: Administrator
    users: [User]
    user(_id: ID!): User
    allBlogs: [Blog]
    unapprovedBlogs: [Blog]
    approvedBlogs(offset: Int, limit: Int): [Blog]
    blogs(offset: Int, limit: Int): blogs
    myBlogs: [Blog]
    myUnapprovedBlogs(offset: Int, limit: Int, searchTerm: String): myUnapproved
    myApprovedBlogs(offset: Int, limit: Int, searchTerm: String): myApproved
    blog(slug: String!): BlogObject
    getBlogComments(blogID: String!, offset: Int, limit: Int): [Comment]
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each. In this
  # case, the "addUser" mutation returns an Auth (defined above).
  # The "login" mutation returns an Auth (defined above).
  type Mutation {
    addAdministrator(userID: String!): Administrator
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    login(email: String!, password: String!): Auth
    addBlog(title: String!, subtitle: String!, imageURL: String, imageAlt: String, introduction: String!, content: String!): Blog
    approveBlog(_id: ID!, approved: Boolean!): Blog
    updateBlog(_id: ID!, title: String!, subtitle: String!, imageURL: String, imageAlt: String, introduction: String!, content: String!, approved: Boolean): Blog
    removeBlog(_id: ID!): Blog
    addComment(blogID: ID!, content: String!): Comment
    removeComment(_id: ID!): Comment
  }
`;
