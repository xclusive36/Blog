import { IonCol, IonGrid, IonRow } from "@ionic/react";
import BlogItemComponent from "./BlogItem.component";
import { QUERY_APPROVED_BLOGS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const BlogSectionComponent = () => {
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
              key={blog._id}>
              <BlogItemComponent
                blog={blog}
                showIntro={false}
                showContent={false}
              />
            </IonCol>
          ))
        )}
      </IonRow>
    </IonGrid>
  );
};

export default BlogSectionComponent;
