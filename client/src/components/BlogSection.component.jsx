import { IonCol, IonGrid, IonRow } from "@ionic/react";
import BlogItemComponent from "./BlogItem.component";
import { BlogContext } from "../context/blogContext";
import { useContext } from "react";

const BlogSectionComponent = () => {
  const { BlogArray } = useContext(BlogContext);

  return (
    <IonGrid>
      <IonRow>
        {BlogArray.map((blog) => (
          <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12" key={blog.id}>
            <BlogItemComponent blog={blog} showIntro={false} showContent={false} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default BlogSectionComponent;
