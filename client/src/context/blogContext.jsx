import { createContext, useState } from "react";
import PropTypes from "prop-types";

const blogArray = [];

export const BlogContext = createContext({
  BlogArray: blogArray,
  // eslint-disable-next-line no-unused-vars
  setBlogArray: (data) => {},
});

export const BlogProvider = ({ children }) => {
  const [BlogContextArray, setBlogContextArray] = useState(blogArray);

  const value = {
    BlogArray: BlogContextArray,
    setBlogArray: setBlogContextArray,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
