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
  showIntro?: boolean;
  showContent: boolean;
}

const BlogItem: React.FC<BlogItemProps> = ({
  blog,
  showIntro = true,
  showContent = false,
}) => {
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
      style={{
        maxWidth: "786px",
        margin: "auto",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.05)",
      }}
      {...(!showContent && { routerLink: `/blog/${blog.slug}` })}
    >
      <div className={showContent ? "" : "thumbnail"}>
        <img className="blog-image" alt={imageAlt} src={imageURL} />
      </div>
      <IonCardHeader>
        <IonCardTitle
          className={showContent ? "card-title" : "card-title underline"}
        >
          {title}
        </IonCardTitle>
        {showContent && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
      </IonCardHeader>

      <IonCardContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showIntro && <Markdown>{introduction}</Markdown>}
        {showContent && (
          <>
            <Markdown>{content}</Markdown>
            {date && <p>Published by Joshua on {convertDate(date)}</p>}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default BlogItem;