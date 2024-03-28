import { IonCol, IonGrid, IonLoading, IonRow } from "@ionic/react";
import BlogItemComponent from "./BlogItem.component";
import { QUERY_APPROVED_BLOGS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const BlogSectionComponent = () => {
  const { loading, data } = useQuery(QUERY_APPROVED_BLOGS);

  return (
    <IonGrid>
      <IonRow>
        {loading ? (
         <IonLoading isOpen={loading} message="Loading..." duration={3000} spinner="circles" />
        ) : data ? (
          data?.approvedBlogs.map((blog) => (
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
