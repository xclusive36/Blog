import { useParams } from "react-router";
import BlogItem from "../components/BlogItem";
import Page from "../components/Page";
import { BlogContext } from "../context/blogContext";
import { useContext } from "react";

const Blog: React.FC = () => {
  const { BlogArray } = useContext(BlogContext);
  const { blogId } = useParams<{ blogId: string }>();

  const blog = BlogArray.find((blog) => blog.id === blogId);

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
