import { useParams } from "react-router";
import BlogItem from "../components/BlogItem";
import Page from "../components/Page";
import { BlogContext } from "../context/blogContext";
import { useContext } from "react";

const Blog = () => {
  const { BlogArray } = useContext(BlogContext);
  const { blogSlug } = useParams();

  const blog = BlogArray.find((blog) => blog.slug === blogSlug);

  if (!blog) {
    return (
      <Page>
        <h1>Blog not found</h1>
      </Page>
    );
  }

  return (
    <Page>
      <div className="home-container">
        <BlogItem blog={blog} showContent={true} />
      </div>
    </Page>
  );
};

export default Blog;
