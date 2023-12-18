import { IonCol, IonGrid, IonRow } from "@ionic/react";
import BlogItemComponent from "./BlogItem.component";
import { BlogContext } from "../context/blogContext";
import { useContext } from "react";
import { QUERY_APPROVED_BLOGS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const BlogSectionComponent = () => {
  const { BlogArray } = useContext(BlogContext);
  const { loading, data } = useQuery(QUERY_APPROVED_BLOGS);

  return (
    <IonGrid>
      <IonRow>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data?.approvedBlogs.map((blog) => (
            <IonCol
              sizeLg="4"
              sizeMd="6"
              sizeSm="12"
              sizeXs="12"
              key={blog._id}
            >
              <BlogItemComponent
                blog={blog}
                showIntro={false}
                showContent={false}
              />
            </IonCol>
          ))
        )}
        {BlogArray.map((blog) => (
          <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12" key={blog.id}>
            <BlogItemComponent
              blog={blog}
              showIntro={false}
              showContent={false}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default BlogSectionComponent;
