import Markdown from "react-markdown";
import PropTypes from "prop-types";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from "@ionic/react";
import lightOrDarkImage from "@check-light-or-dark/image";
import Auth from "../utils/auth.js";
import { personCircle, closeOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import "./BlogItem.styles.css";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_AM_I_ADMIN, QUERY_GET_BLOG_COMMENTS } from "../utils/queries.js";
import { REMOVE_COMMENT, ADD_COMMENT } from "../utils/mutations.js";

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

  const [comments, setComments] = useState([]);

  const { data: adminData } = useQuery(QUERY_AM_I_ADMIN);
  const { loading, data: getBlogCommentsData } = useQuery(
    QUERY_GET_BLOG_COMMENTS,
    {
      variables: {
        blogID: _id,
        offset: 0,
        limit: 5,
      },
    }
  );

  useEffect(() => {
    if (getBlogCommentsData) {
      setComments(getBlogCommentsData.getBlogComments);
    }
  }, [getBlogCommentsData]);

  const [addComment, { error: addCommentError }] = useMutation(ADD_COMMENT);
  const [removeComment, { error: removeCommentError }] =
    useMutation(REMOVE_COMMENT);

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

  const addCommentRef = useRef();

  const handleAddComment = async (e) => {
    e.preventDefault();
    const commentContent = DOMPurify.sanitize(addCommentRef.current.value);
    try {
      const newComment = await addComment({
        variables: {
          blogID: _id,
          content: commentContent,
        },
      });

      setComments([...comments, newComment.data.addComment]);
      addCommentRef.current.value = "";
    } catch (err) {
      console.error(err);
      console.error(addCommentError);
    }
  };

  const handleRemoveComment = async (e, commentID) => {
    e.preventDefault();
    try {
      await removeComment({
        variables: {
          _id: commentID,
        },
      });

      setComments(comments.filter((comment) => comment._id !== commentID));
    } catch (err) {
      console.error(err);
      console.error(removeCommentError);
    }
  };

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

            <IonCardContent>
              <IonCardSubtitle>Comments</IonCardSubtitle>
              <IonList>
                {loading && (
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      Loading Comments...
                    </IonLabel>
                  </IonItem>
                )}
                {comments &&
                  comments.length > 0 &&
                  comments.map((comment) => (
                    <IonItem key={comment._id}>
                      <div slot="start">
                        <IonIcon
                          style={{
                            position: "absolute",
                            top: "1.8rem",
                            left: ".5rem",
                          }}
                          icon={personCircle}
                        />
                      </div>
                      <IonLabel className="ion-text-wrap">
                        {comment.username}
                        <br />
                        <small>{convertDate(comment.date)}</small>
                        <p>{comment.content}</p>
                      </IonLabel>
                      {adminData && adminData.amIAdmin && (
                        <IonButton
                          slot="end"
                          color="danger"
                          onClick={(e) => handleRemoveComment(e, comment._id)}>
                          <IonIcon slot="icon-only" icon={closeOutline} />
                        </IonButton>
                      )}
                    </IonItem>
                  ))}
                {comments && comments.length === 0 && (
                  <IonItem>
                    <IonLabel className="ion-text-wrap">No Comments</IonLabel>
                  </IonItem>
                )}
              </IonList>
              {Auth.loggedIn() && (
                <form onSubmit={handleAddComment}>
                  <IonTextarea
                    className="ion-margin-top ion-margin-bottom"
                    labelPlacement="stacked"
                    fill="outline"
                    mode="md"
                    aria-label="Add Comment"
                    counter={true}
                    maxlength={500}
                    placeholder="Add Comment"
                    ref={addCommentRef}>
                    <div slot="label">
                      <strong>Add Comment</strong>
                    </div>
                  </IonTextarea>
                  <IonButton type="submit" expand="block">
                    Add Comment
                  </IonButton>
                </form>
              )}
            </IonCardContent>
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
