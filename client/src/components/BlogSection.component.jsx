import { IonCol, IonGrid, IonLoading, IonRow } from "@ionic/react";
import BlogItemComponent from "./BlogItem.component";
import { QUERY_BLOGS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const BlogSectionComponent = () => {
  const [blogs, setBlogs] = useState([]);

  const { loading } = useQuery(QUERY_BLOGS, {
    fetchPolicy: "cache-and-network",
    variables: {
      offset: 0,
      limit: 9,
    },
    onCompleted: (data) => {
      setBlogs(data.blogs.blogs);
    },
  });

  return (
    <IonGrid>
      <IonRow>
        {loading ? (
          <IonLoading
            isOpen={loading}
            message="Loading..."
            duration={3000}
            spinner="circles"
          />
        ) : blogs ? (
          blogs.map((blog) => (
            <IonCol
              sizeLg="4"
              sizeMd="6"
              sizeSm="12"
              sizeXs="12"
              key={blog._id}>
              <BlogItemComponent
                blog={blog}
                showIntro={false}
                showContent={false}
              />
            </IonCol>
          ))
        ) : (
          <p>No blogs to display</p>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default BlogSectionComponent;
