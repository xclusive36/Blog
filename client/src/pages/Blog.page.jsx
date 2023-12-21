import { useParams } from "react-router";
import BlogItemComponent from "../components/BlogItem.component";
import PageComponent from "../components/Page.component";
import { QUERY_BLOG, QUERY_AM_I_ADMIN } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Auth from "../utils/auth";

const BlogPage = () => {
  const loginStatus = Auth.loggedIn(); // Get the login status
  const { blogSlug } = useParams(); // Get the blog slug from the URL
  const { loading, data } = useQuery(QUERY_BLOG, {
    variables: { slug: blogSlug },
  }); // Get the blog data from the server
  const { data: adminData } = useQuery(QUERY_AM_I_ADMIN); // Get the admin data from the server

  useEffect(() => {
    if (data?.blog?.blog) {
      // If the blog exists
      if (!data.blog.blog.approved) {
        // If the blog is not approved
        if (loginStatus) {
          // If the user is logged in
          const user = Auth.getProfile().data; // Get the user data from the local storage
          // If the user is logged in
          if (user?._id !== data.blog.blog.userID) {
            // If the user is not the author of the blog
            return window.location.replace("/"); // Redirect to the home page
          }
          if (adminData) {
            // If the admin data is loaded
            if (!adminData?.amIAdmin) {
              // If the user is not an admin
              return window.location.replace("/"); // Redirect to the home page
            }
          }
        } else {
          // If the user is not logged in
          return window.location.replace("/"); // Redirect to the home page
        }
      }
    }
  }, [adminData, data, loginStatus]);

  return (
    <PageComponent>
      <div className="home-container">
        {loading ? (
          <p>Loading...</p>
        ) : data?.blog ? (
          <BlogItemComponent
            blog={data.blog.blog}
            username={data.blog.username}
            showContent={true}
          />
        ) : (
          <p>Blog not found</p>
        )}
      </div>
    </PageComponent>
  );
};

export default BlogPage;
