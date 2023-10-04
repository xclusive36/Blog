import Markdown from "react-markdown";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import "./BlogItem.css";

interface BlogItemProps {
  blog: {
    id: string;
    title: string;
    subtitle: string;
    imageURL: string;
    imageAlt: string;
    date: string;
    slug: string;
    introduction: string;
    content: string;
  };
  showContent: boolean;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, showContent = false }) => {
  const {
    title,
    subtitle,
    imageURL,
    imageAlt,
    date,
    slug,
    introduction,
    content,
  } = blog;

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  return (
    <IonCard
      style={{ maxWidth: "786px", margin: "auto" }}
      href={`/blog/${blog.id}`}
    >
      <img className="blog-image" alt={imageAlt} src={imageURL} />
      <IonCardHeader>
        <IonCardTitle className="card-title">{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {date && <p>{convertDate(date)}</p>}
        <Markdown>{introduction}</Markdown>
        {showContent ? (
          <Markdown>{content}</Markdown>
        ) : (
          <>
            {content.length > 0 && (
              <IonButton className="ion-margin-bottom">
                Read More
              </IonButton>
            )}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default BlogItem;
