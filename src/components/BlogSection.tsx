import { IonCol, IonGrid, IonRow } from "@ionic/react";
import BlogItem from "./BlogItem";
import { BlogContext } from "../context/blogContext";
import { useContext } from "react";

const BlogSection = () => {
  const { BlogArray } = useContext(BlogContext);

  return (
    <IonGrid>
      <IonRow>
        {BlogArray.map((blog) => (
          <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12" key={blog.id}>
            <BlogItem blog={blog} showIntro={false} showContent={false} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default BlogSection;
