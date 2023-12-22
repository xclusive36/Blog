import { useParams } from "react-router";
import BlogItemComponent from "../components/BlogItem.component";
import PageComponent from "../components/Page.component";
import { BlogContext } from "../context/blogContext";
import { useContext } from "react";

const BlogPage = () => {
  const { BlogArray } = useContext(BlogContext);
  const { blogSlug } = useParams();

  const blog = BlogArray.find((blog) => blog.slug === blogSlug);

  if (!blog) {
    return (
      <PageComponent>
        <h1>Blog not found</h1>
      </PageComponent>
    );
  }

  return (
    <PageComponent>
      <div className="home-container">
        <BlogItemComponent blog={blog} showContent={true} />
      </div>
    </PageComponent>
  );
};

export default BlogPage;
