import { User, Blog, Administrator } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import DOMPurify from "isomorphic-dompurify";

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Query: {
    // Query is used to fetch data
    amIAdmin: async (parent, args, context) => {
      // This resolver is used to check if the user is an admin
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        return Administrator.findOne({ userID: user._id }); // find if the user id is in the administrators array and return the result
      }
      throw new AuthenticationError("You need to be logged in!"); // Throw an error message if you are not logged in
    },
    users: async () => {
      // This resolver is used to get all users
      return User.find(); // find all users
    },
    user: async (parent, { _id }) => {
      // This resolver is used to get a user by id
      return User.findOne({ _id }); // find a user by id
    },
    allBlogs: async () => {
      // This resolver is used to get all blogs
      return Blog.find().sort({ date: 1 }); // find all blogs and sort by date in ascending order
    },
    unapprovedBlogs: async () => {
      // This resolver is used to get all unapproved blogs
      return Blog.find({ approved: false }).sort({ date: 1 }); // find all blogs where approved is false and sort by date in ascending order
    },
    approvedBlogs: async () => {
      // This resolver is used to get all approved blogs
      return Blog.find({ approved: true }).sort({ date: 1 }); // find all blogs where approved is true and sort by date in ascending order
    },
    myBlogs: async (parent, args, context) => {
      // This resolver is used to get the user's blogs
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        return Blog.find({ userID: user._id }); // find all blogs where the user id matches the context user id
      }
      throw new AuthenticationError("You need to be logged in!"); // Throw an error message if you are not logged in
    },
    myUnapprovedBlogs: async (
      // This resolver is used to get the user's unapproved blogs and the count of the user's unapproved blogs
      parent, // parent is the return value of the resolver for this field's parent (the field one level above)
      { offset = 0, limit = 5, searchTerm = "" }, // offset is the number of documents to skip, limit is the number of documents to return, searchTerm is the string to search for
      context // context is an object shared by all resolvers in a particular query, and is used to contain per-request state, including authentication information, dataloader instances, and anything else that should be taken into account when resolving the query
    ) => {
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        const unapprovedBlogs = await Blog.find({
          userID: user._id,
          approved: false,
          title: { $regex: searchTerm, $options: "i" },
        }) // find all unapproved blogs where the user id matches the context user id and the title matches the search term
          .skip(offset) // skip the number of documents specified by the offset
          .limit(limit) // limit the number of documents returned to the number specified by the limit
          .sort({ date: 1 }); // sort the documents by date in ascending order
        const unapprovedBlogsCount = await Blog.countDocuments({
          userID: user._id,
          approved: false,
          title: { $regex: searchTerm, $options: "i" },
        }); // Count the number of unapproved blogs for the user in context
        return {
          unapprovedBlogs, // User unapproved blogs
          unapprovedBlogsCount, // User unapproved blogs count
        }; // Return the object
      }
      throw new AuthenticationError("You need to be logged in!"); // Throw an error message if you are not logged in
    },
    myApprovedBlogs: async (
      // This resolver is used to get the user's approved blogs and the count of the user's approved blogs
      parent, // parent is the return value of the resolver for this field's parent (the field one level above)
      { offset = 0, limit = 5, searchTerm = "" }, // offset is the number of documents to skip, limit is the number of documents to return, searchTerm is the string to search for
      context // context is an object shared by all resolvers in a particular query, and is used to contain per-request state, including authentication information, dataloader instances, and anything else that should be taken into account when resolving the query
    ) => {
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        const approvedBlogs = await Blog.find({
          userID: user._id,
          approved: true,
          title: { $regex: searchTerm, $options: "i" },
        }) // find all approved blogs where the user id matches the context user id and the title matches the search term
          .skip(offset) // skip the number of documents specified by the offset
          .limit(limit) // limit the number of documents returned to the number specified by the limit
          .sort({ date: 1 }); // sort the documents by date in ascending order
        const approvedBlogsCount = await Blog.countDocuments({
          userID: user._id,
          approved: true,
          title: { $regex: searchTerm, $options: "i" },
        }); // Count the number of approved blogs for the user in context
        return {
          approvedBlogs, // User approved blogs
          approvedBlogsCount, // User approved blogs count
        }; // Return the object
      }
      throw new AuthenticationError("You need to be logged in!"); // Throw an error message if you are not logged in
    },
    blog: async (parent, { slug }) => {
      // This resolver is used to get a blog by slug
      const blog = await Blog.findOne({ slug }); // find a blog by slug
      if (!blog) {
        // If no blog is found
        throw new AuthenticationError("No blog found with this slug!"); // Throw an error message
      }
      // If a blog is found, get the username of the user who created the blog
      const { username } = await User.findOne({ _id: blog.userID });
      return { blog, username }; // Return the blog and username
    },
  },
  Mutation: {
    // Mutation is used to modify data
    addAdministrator: async (parent, { userID }, context) => {
      // This resolver is used to add an administrator
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        const amIAdmin = await Administrator.findOne({
          userID: user._id,
        }); // find if user who sent the request is an admin
        if (!amIAdmin) {
          // If no admin is found then you are not an admin!
          throw new AuthenticationError("You are not an admin!"); // Throw an error message
        }
        const doesAdminExist = await Administrator.findOne({ userID }); // find if userID being added previously exists
        if (doesAdminExist) {
          // If userID is found
          throw new AuthenticationError("This user is already an admin!"); // Throw an error message
        }
        return await Administrator.create({
          userID,
        }); // Create a new administrator
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
    addUser: async (parent, { username, email, password }) => {
      // This resolver is used to add a user
      if (!email || !password || !username) {
        // Check if the required fields are provided
        throw new AuthenticationError(
          "You need to provide a username, email, and password!"
        ); // Throw an error message if the required fields are not provided
      }
      const user = await User.create({
        username,
        email,
        password,
      }); // Create a new user with the provided fields and save it to the database
      const token = signToken(user); // Sign the token with the user object
      return { token, user }; // Return the token and user object
    },
    removeUser: async (parent, args, context) => {
      // This resolver is used to remove a user
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        const userToRemove = await User.findOneAndDelete({ _id: user._id }); // Delete yourself only from the database
        if (!userToRemove) {
          // If no user is found
          throw new AuthenticationError("No user found with this id!"); // Throw an error message
        }
        return user; // Return the deleted user object
      }
    },
    login: async (parent, { email, password }) => {
      // This resolver is used to login
      if (!email || !password) {
        // Check if the required fields are provided
        throw new AuthenticationError(
          "You need to provide an email and password!"
        ); // Throw an error message if the required fields are not provided
      }
      const user = await User.findOne({ email }); // Find a user by email
      if (!user) {
        // If no user is found
        throw new AuthenticationError("No user found with this email address"); // Throw an error message
      }
      const correctPw = await user.isCorrectPassword(password); // Check if the password is correct
      if (!correctPw) {
        // If the password is incorrect
        throw new AuthenticationError("Incorrect credentials"); // Throw an error message
      }
      const token = signToken(user); // Sign the token with the user object
      return { token, user }; // Return the token and user object
    },
    addBlog: async (
      parent,
      { title, subtitle, imageURL, imageAlt, introduction, content },
      context
    ) => {
      // This resolver is used to add a blog
      if (context.user) {
        // If you are logged in
        if (!title || !content) {
          // Check if the required fields are provided
          throw new AuthenticationError(
            "You need to provide a title and content!"
          ); // Throw an error message if the required fields are not provided
        }
        const sanitizedTitle = DOMPurify.sanitize(title.trim()); // sanitize the input and trim whitespace
        const sanitizedSubtitle = DOMPurify.sanitize(subtitle.trim()); // sanitize the input and trim whitespace
        const sanitizedImageURL = DOMPurify.sanitize(imageURL.trim()); // sanitize the input and trim whitespace
        const sanitizedImageAlt = DOMPurify.sanitize(imageAlt.trim()); // sanitize the input and trim whitespace
        const sanitizedIntroduction = DOMPurify.sanitize(introduction.trim()); // sanitize the input and trim whitespace
        const sanitizedContent = DOMPurify.sanitize(content.trim()); // sanitize the input and trim whitespace
        if (sanitizedTitle === "" || sanitizedContent === "") {
          // Check if the required fields are provided
          throw new AuthenticationError(
            "You need to provide a title and content!"
          ); // Throw an error message if the required fields are not provided
        }
        if (sanitizedTitle.length > 100) {
          // Check title length
          throw new AuthenticationError(
            "The title cannot be longer than 100 characters!"
          ); // Throw an error message if the title is too long
        }
        if (sanitizedSubtitle.length > 200) {
          // Check subtitle length
          throw new AuthenticationError(
            "The subtitle cannot be longer than 200 characters!"
          ); // Throw an error message if the subtitle is too long
        }
        if (
          sanitizedImageURL &&
          !sanitizedImageURL.startsWith("https://") &&
          !sanitizedImageURL.startsWith("http://")
        ) {
          // Check imageURL is a valid URL
          throw new AuthenticationError("The imageURL must be a valid URL!"); // Throw an error message if the imageURL is not a valid URL
        }
        if (sanitizedImageAlt.length > 100) {
          // Check imageAlt length
          throw new AuthenticationError(
            "The imageAlt cannot be longer than 100 characters!"
          ); // Throw an error message if the imageAlt is too long
        }
        const slug = sanitizedTitle
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""); // Set slug to the title in lowercase with spaces replaced with dashes and all non-alphanumeric characters removed
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        return await Blog.create({
          userID: user._id, // Set userID to the context user id
          username: user.username, // Set username to the context user username
          title: sanitizedTitle, // Set title to the sanitized title
          subtitle: sanitizedSubtitle, // Set subtitle to the sanitized subtitle
          imageURL: sanitizedImageURL, // Set imageURL to the sanitized imageURL
          imageAlt: sanitizedImageAlt, // Set imageAlt to the sanitized imageAlt
          date: new Date().toISOString(), // Set date to the current date and time
          slug, // Set slug to the slug
          introduction: sanitizedIntroduction, // Set introduction to the sanitized introduction
          content: sanitizedContent,
          approved: false, // Set approved to false by default
        }); // Create a new blog with the provided fields and save it to the database
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
    approveBlog: async (parent, { _id, approved }, context) => {
      // This resolver is used to approve a blog
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        const amIAdmin = await Administrator.findOne({
          // find if user who sent the request is an admin
          userID: user._id, // Set userID to the context user id
        });
        if (!amIAdmin) {
          // If no admin is found
          throw new AuthenticationError("You are not an admin!"); // Throw an error message
        }
        const blog = await Blog.findOne({ _id }); // find blog by id
        if (!blog) {
          // If no blog is found
          throw new AuthenticationError("No blog found with this id!"); // Throw an error message
        }
        return await Blog.findOneAndUpdate(
          // Update the blog
          { _id }, // find blog by id
          { approved }, // Set approved to the approved value
          { new: true } // Return the updated blog
        );
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
    updateBlog: async (
      parent,
      { _id, title, subtitle, imageURL, imageAlt, introduction, content },
      context
    ) => {
      // This resolver is used to update a blog
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        if (!title || !content) {
          // Check if the required fields are provided
          throw new AuthenticationError(
            "You need to provide a title and content!"
          ); // Throw an error message if the required fields are not provided
        }
        const sanitizedID = DOMPurify.sanitize(_id.trim()); // sanitize the input and trim whitespace
        const sanitizedTitle = DOMPurify.sanitize(title.trim()); // sanitize the input and trim whitespace
        const sanitizedSubtitle = DOMPurify.sanitize(subtitle.trim()); // sanitize the input and trim whitespace
        const sanitizedImageURL = DOMPurify.sanitize(imageURL.trim()); // sanitize the input and trim whitespace
        const sanitizedImageAlt = DOMPurify.sanitize(imageAlt.trim()); // sanitize the input and trim whitespace
        const sanitizedIntroduction = DOMPurify.sanitize(introduction.trim()); // sanitize the input and trim whitespace
        const sanitizedContent = DOMPurify.sanitize(content.trim()); // sanitize the input and trim whitespace
        if (sanitizedTitle.length > 100) {
          // Check title length
          throw new AuthenticationError(
            "The title cannot be longer than 100 characters!"
          ); // Throw an error message if the title is too long
        }
        if (sanitizedSubtitle.length > 200) {
          // Check subtitle length
          throw new AuthenticationError(
            "The subtitle cannot be longer than 200 characters!"
          ); // Throw an error message if the subtitle is too long
        }
        if (
          sanitizedImageURL &&
          !sanitizedImageURL.startsWith("https://") &&
          !sanitizedImageURL.startsWith("http://")
        ) {
          // Check imageURL is a valid URL
          throw new AuthenticationError("The imageURL must be a valid URL!"); // Throw an error message if the imageURL is not a valid URL
        }
        if (sanitizedImageAlt.length > 100) {
          // Check imageAlt length
          throw new AuthenticationError(
            "The imageAlt cannot be longer than 100 characters!"
          ); // Throw an error message if the imageAlt is too long
        }
        const slug = sanitizedTitle
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""); // Set slug to the title in lowercase with spaces replaced with dashes and all non-alphanumeric characters removed
        return await Blog.findOneAndUpdate(
          // Update the blog
          { _id: sanitizedID, userID: user._id },
          {
            username: user.username, // Set username to the context user username
            title: sanitizedTitle, // Set title to the sanitized title
            subtitle: sanitizedSubtitle, // Set subtitle to the sanitized subtitle
            imageURL: sanitizedImageURL, // Set imageURL to the sanitized imageURL
            imageAlt: sanitizedImageAlt, // Set imageAlt to the sanitized imageAlt
            date: new Date().toISOString(), // Set date to the current date and time
            slug, // Set slug to the slug
            introduction: sanitizedIntroduction, // Set introduction to the sanitized introduction
            content: sanitizedContent,
            approved: false, // Set approved to false by default
          }, // Set the fields to the sanitized fields
          { new: true } // Return the updated blog
        );
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
    removeBlog: async (parent, { _id }, context) => {
      // This resolver is used to remove a blog
      if (context.user) {
        // If you are logged in
        let { user } = context; // pull user object out of context
        user = JSON.parse(user); // parse the user object from a string to an object
        const blog = await Blog.findOneAndDelete({
          // Delete the blog
          _id, // find blog by id
          userID: user._id, // Set userID to the context user id
        });
        if (!blog) {
          // If no blog is found
          throw new AuthenticationError("No blog found with this id!"); // Throw an error message
        }
        return blog; // Return the deleted blog
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
  },
};
