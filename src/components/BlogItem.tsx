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
    <IonCard>
      <img alt={imageAlt} src={imageURL} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent
        style={{
          displaiy: "flex",
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
              <IonButton expand="block">Read More</IonButton>
            )}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default BlogItem;
