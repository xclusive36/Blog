import { User, Blog, Administrator } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import DOMPurify from "isomorphic-dompurify";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    amIAdmin: async (parent, args, context) => {
      if (context.user) {
        // If you are logged in

        const { user } = context; // pull objects out of context
        user = JSON.parse(user); // parse the user object

        // find if context user id is in the administrators array
        const admin = await Administrator.findOne({ userID: user._id });

        if (!admin) {
          // If no admin is found
          throw new AuthenticationError("You are not an admin!"); // Throw an error message
        }

        return admin; // Return the admin object
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    allBlogs: async () => {
      return Blog.find();
    },
    unapprovedBlogs: async () => {
      return Blog.find({ approved: false });
    },
    approvedBlogs: async () => {
      return Blog.find({ approved: true });
    },
    myUnapprovedBlogs: async (parent, args, context) => {
      if (context.user) {
        // pull objects out of context
        let { user } = context;
        user = JSON.parse(user);

        return Blog.find({ userID: user._id, approved: false });
      }

      throw new AuthenticationError("You need to be logged in!"); // Throw an error message
    },
    myBlogs: async (parent, args, context) => {
      if (context.user) {
        // pull objects out of context
        let { user } = context;
        user = JSON.parse(user);

        return Blog.find({ userID: user._id });
      }

      throw new AuthenticationError("You need to be logged in!"); // Throw an error message
    },
    myApprovedBlogs: async (parent, args, context) => {
      if (context.user) {
        // pull objects out of context
        let { user } = context;
        user = JSON.parse(user);

        return Blog.find({ userID: user._id, approved: true });
      }
    },
  },
  Mutation: {
    addAdministrator: async (parent, { userID }, context) => {
      if (context.user) {
        // If you are logged in

        // find if context user id is in the administrators array
        const amIAdmin = await Administrator.findOne({
          userID: context.user._id,
        });

        if (!amIAdmin) {
          // If no admin is found
          throw new AuthenticationError("You are not an admin!"); // Throw an error message
        }

        // find if userID is in the administrators array
        const doesAdminExist = await Administrator.findOne({ userID });

        if (doesAdminExist) {
          // If userID is found
          throw new AuthenticationError("This user is already an admin!"); // Throw an error message
        }

        const administrator = await Administrator.create({
          userID,
        });

        return administrator;
      } else {
        // If you are not logged in
        throw new AuthenticationError("You need to be logged in!"); // Throw an error message
      }
    },
    addUser: async (parent, { username, email, password }) => {
      if (!email || !password || !username) {
        throw new AuthenticationError(
          "You need to provide a username, email, and password!"
        );
      }

      const user = await User.create({
        username,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        // If you are logged in
        const user = await User.findOneAndDelete({ _id: context.user._id }); // Delete yourself only from the database

        if (!user) {
          // If no user is found
          throw new AuthenticationError("No user found with this id!"); // Throw an error message
        }

        return user; // Return the deleted user object
      }
    },
    login: async (parent, { email, password }) => {
      if (!email || !password) {
        throw new AuthenticationError(
          "You need to provide an email and password!"
        );
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addBlog: async (
      parent,
      { title, subtitle, imageURL, imageAlt, introduction, content },
      context
    ) => {
      if (context.user) {
        // Check if the required fields are provided
        // The required fields are: title, content
        if (!title || !content) {
          throw new AuthenticationError(
            "You need to provide a title and content!"
          );
        }

        const sanitizedTitle = DOMPurify.sanitize(title.trim()); // sanitize the input and trim whitespace
        const sanitizedSubtitle = DOMPurify.sanitize(subtitle.trim()); // sanitize the input and trim whitespace
        const sanitizedImageURL = DOMPurify.sanitize(imageURL.trim()); // sanitize the input and trim whitespace
        const sanitizedImageAlt = DOMPurify.sanitize(imageAlt.trim()); // sanitize the input and trim whitespace
        const sanitizedIntroduction = DOMPurify.sanitize(introduction.trim()); // sanitize the input and trim whitespace
        const sanitizedContent = DOMPurify.sanitize(content.trim()); // sanitize the input and trim whitespace

        // Check if Title and Content are not empty
        if (sanitizedTitle === "" || sanitizedContent === "") {
          throw new AuthenticationError(
            "You need to provide a title and content!"
          );
        }

        // Check title length
        if (sanitizedTitle.length > 100) {
          throw new AuthenticationError(
            "The title cannot be longer than 100 characters!"
          );
        }

        // Check subtitle length
        if (sanitizedSubtitle.length > 200) {
          throw new AuthenticationError(
            "The subtitle cannot be longer than 200 characters!"
          );
        }

        // Check imageURL is a valid URL
        if (
          sanitizedImageURL &&
          !sanitizedImageURL.startsWith("https://") &&
          !sanitizedImageURL.startsWith("http://")
        ) {
          throw new AuthenticationError("The imageURL must be a valid URL!");
        }

        // Check imageAlt length
        if (sanitizedImageAlt.length > 100) {
          throw new AuthenticationError(
            "The imageAlt cannot be longer than 100 characters!"
          );
        }

        const slug = sanitizedTitle
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""); // Set slug to the title in lowercase with spaces replaced with dashes and all non-alphanumeric characters removed

        // pull objects out of context
        let { user } = context;
        user = JSON.parse(user);

        const blog = await Blog.create({
          userID: user._id,
          title: sanitizedTitle,
          subtitle: sanitizedSubtitle,
          imageURL: sanitizedImageURL,
          imageAlt: sanitizedImageAlt,
          date: new Date().toISOString(), // Set date to the current date and time
          slug,
          introduction: sanitizedIntroduction,
          content: sanitizedContent,
          approved: false, // Set approved to false by default
        });

        return blog;
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    approveBlog: async (parent, { _id }, context) => {
      if (context.user) {
        // If you are logged in

        // find if context user id is in the administrators array
        const amIAdmin = await Administrator.findOne({
          userID: context.user._id,
        });

        if (!amIAdmin) {
          // If no admin is found
          throw new AuthenticationError("You are not an admin!"); // Throw an error message
        }

        // find blog by id
        const blog = await Blog.findOne({ _id });

        if (!blog) {
          // If no blog is found
          throw new AuthenticationError("No blog found with this id!"); // Throw an error message
        }

        // update blog approved to true
        const approved = true;
        const updatedBlog = await Blog.findOneAndUpdate(
          { _id },
          { approved },
          { new: true }
        );

        return updatedBlog;
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
      if (context.user) {
        // Check if the required fields are provided
        // The required fields are: title, content
        if (!title || !content) {
          throw new AuthenticationError(
            "You need to provide a title and content!"
          );
        }

        // Santize and trim the input
        sanitizedTitle = DOMPurify.sanitize(title).trim();
        sanitizedSubtitle = DOMPurify.sanitize(subtitle).trim();
        sanitizedImageURL = DOMPurify.sanitize(imageURL).trim();
        sanitizedImageAlt = DOMPurify.sanitize(imageAlt).trim();
        sanitizedIntroduction = DOMPurify.sanitize(introduction).trim();
        sanitizedContent = DOMPurify.sanitize(content).trim();

        // Check title length
        if (sanitizedTitle.length > 100) {
          throw new AuthenticationError(
            "The title cannot be longer than 100 characters!"
          );
        }

        // Check subtitle length
        if (sanitizedSubtitle.length > 200) {
          throw new AuthenticationError(
            "The subtitle cannot be longer than 200 characters!"
          );
        }

        // Check imageURL is a valid URL
        if (
          sanitizedImageURL &&
          !sanitizedImageURL.startsWith("https://") &&
          !sanitizedImageURL.startsWith("http://")
        ) {
          throw new AuthenticationError("The imageURL must be a valid URL!");
        }

        // Check imageAlt length
        if (sanitizedImageAlt.length > 100) {
          throw new AuthenticationError(
            "The imageAlt cannot be longer than 100 characters!"
          );
        }

        const slug = sanitizedTitle
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""); // Set slug to the title in lowercase with spaces replaced with dashes and all non-alphanumeric characters removed

        const blog = await Blog.findOneAndUpdate(
          { _id },
          {
            sanitizedTitle,
            sanitizedSubtitle,
            sanitizedImageURL,
            sanitizedImageAlt,
            date: new Date().toISOString(), // Set date to the current date and time
            slug,
            sanitizedIntroduction,
            sanitizedContent,
            approved: false, // Set approved to false by default
          },
          { new: true }
        );

        return blog;
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    removeBlog: async (parent, { _id }, context) => {
      if (context.user) {
        // find and delete blog by id where the user id matches the context user id
        const blog = await Blog.findOneAndDelete({
          _id,
          userID: context.user._id,
        });

        if (!blog) {
          throw new AuthenticationError("No blog found with this id!");
        }

        return blog;
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
  },
};
