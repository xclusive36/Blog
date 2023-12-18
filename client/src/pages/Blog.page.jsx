import { useParams } from "react-router";
import BlogItemComponent from "../components/BlogItem.component";
import PageComponent from "../components/Page.component";
import { QUERY_BLOG } from "../utils/queries";
import { useQuery } from "@apollo/client";

const BlogPage = () => {
  const { blogSlug } = useParams();
  const { loading, data } = useQuery(QUERY_BLOG, {
    variables: { slug: blogSlug },
  });

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
