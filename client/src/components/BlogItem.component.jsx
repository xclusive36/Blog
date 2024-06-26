import Markdown from "react-markdown";
import PropTypes from "prop-types";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import lightOrDarkImage from "@check-light-or-dark/image";
import { useEffect, useState } from "react";

import "./BlogItem.styles.css";
import BlogCommentsComponent from "./BlogComments.component.jsx";

const BlogItemComponent = ({ blog, showIntro = true, showContent = false }) => {
  const {
    _id,
    username,
    title,
    subtitle,
    imageURL,
    imageAlt,
    date,
    introduction,
    content,
  } = blog;

  const convertDate = (date) => {
    // return the date in the format of Month Day, Year
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString("default", { month: "long" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const [textColor, setTextColor] = useState("light");
  const [colorScheme, setColorScheme] = useState("light");

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newColorScheme = e.matches ? "dark" : "light";
      setColorScheme(newColorScheme);
    });

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // dark mode
      setColorScheme("dark");
    } else {
      // light mode
      setColorScheme("light");
    }

    lightOrDarkImage({
      image: imageURL,
    }).then((res) => {
      // if the image is light and the color scheme is light, then set the text color to dark
      if (res === "light" && colorScheme === "light") setTextColor("dark");
      // if the image is dark and the color scheme is light, then set the text color to light
      if (res === "dark" && colorScheme === "light") setTextColor("dark");
      // if the image is light and the color scheme is dark, then set the text color to light
      if (res === "light" && colorScheme === "dark") setTextColor("light");
      // if the image is dark and the color scheme is dark, then set the text color to dark
      if (res === "dark" && colorScheme === "dark") setTextColor("dark");
    });
  }, [colorScheme, imageURL]);

  return (
    <IonCard
      style={{
        maxWidth: "1080px",
        margin: "auto",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.05)",
      }}
      {...(!showContent && { routerLink: `/blog/${blog.slug}` })}>
      {
        /* If showContent is false, then show the image and title only */
        !showContent ? (
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--ion-color-dark)",
            }}
            className="thumbnail">
            <img
              className={!showContent ? "blog-image" : ""}
              alt={imageAlt}
              src={imageURL}
            />
            <div
              style={{
                position: "absolute",
                bottom: ".8rem",
                left: "1rem",
                right: "1rem",
                backgroundColor:
                  textColor === "light"
                    ? "rgba(0, 0, 0, .8)"
                    : "rgba(255, 255, 255, .8)",
                padding: "0.5rem",
                borderRadius: "4px",
              }}>
              <IonCardSubtitle>{title}</IonCardSubtitle>
              {date && (
                <>
                  Published by {username} on {convertDate(date)}
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <img
              className={!showContent ? "blog-image" : ""}
              alt={imageAlt}
              src={imageURL}
              style={{
                borderRadius: "4px",
              }}
            />
            <IonCardHeader>
              <IonCardTitle>{title}</IonCardTitle>
              <IonCardSubtitle>{subtitle}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
              {showIntro && <Markdown>{introduction}</Markdown>}
              {showContent && (
                <>
                  <Markdown>{content}</Markdown>
                  {date && (
                    <p>
                      Published by {username} on {convertDate(date)}
                    </p>
                  )}
                </>
              )}
            </IonCardContent>

            <BlogCommentsComponent _id={_id} />
          </>
        )
      }
    </IonCard>
  );
};

BlogItemComponent.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    imageURL: PropTypes.string,
    imageAlt: PropTypes.string,
    date: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  username: PropTypes.string,
  showIntro: PropTypes.bool,
  showContent: PropTypes.bool,
};

export default BlogItemComponent;
