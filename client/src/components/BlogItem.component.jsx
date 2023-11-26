import Markdown from "react-markdown";
import PropTypes from 'prop-types';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import "./BlogItem.styles.css";

const BlogItemComponent = ({ blog, showIntro = true, showContent = false }) => {
  const {
    title,
    subtitle,
    imageURL,
    imageAlt,
    date,
    // eslint-disable-next-line no-unused-vars
    slug,
    introduction,
    content,
  } = blog;

  const convertDate = (date) => {
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
        <img className={!showContent && "blog-image"} alt={imageAlt} src={imageURL} />
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

BlogItemComponent.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imageURL: PropTypes.string,
    imageAlt: PropTypes.string,
    date: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  showIntro: PropTypes.bool,
  showContent: PropTypes.bool,
};

export default BlogItemComponent;