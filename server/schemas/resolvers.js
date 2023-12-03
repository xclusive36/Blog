import { User, Book } from "../models/index.js";
import { signToken } from "../utils/auth.js";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    books: async () => {
      return Book.find();
    },
  },
  Mutation: {
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
    removeUser: async (parent, { _id }) => {
      const user = await User.findOneAndDelete({ _id });

      if (!user) {
        throw new AuthenticationError("No user found with this id!");
      }

      return user;
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
  },
};
