import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import BlogItemComponent from "./BlogItem.component";
import { QUERY_BLOGS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const BlogSectionComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);

  const { data, fetchMore } = useQuery(QUERY_BLOGS, {
    fetchPolicy: "cache-and-network",
    variables: {
      offset: 0,
      limit: 9,
    },
  });

  useEffect(() => {
    if (data) {
      setBlogs(data.blogs.blogs);
      setBlogsCount(data.blogs.blogsCount);
    }
  }, [data]);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    await fetchMore({
      variables: {
        offset: blogs.length,
        limit: 9,
      },
    }).then((data) => {
      setBlogs([...blogs, ...data.data.blogs.blogs]);
    });
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          {blogs ? (
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
      {blogs.length < blogsCount && (
        <div className="ion-text-center ion-padding">
          <IonButton
            fill="clear"
            disable={blogs.length === blogsCount}
            onClick={handleLoadMore}>
            <IonText className="small">Load More</IonText>
          </IonButton>
        </div>
      )}
    </>
  );
};

export default BlogSectionComponent;
