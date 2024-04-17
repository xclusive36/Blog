import {
  IonButton,
  IonCardContent,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from "@ionic/react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_BLOG_COMMENTS } from "../utils/queries.js";
import { ADD_COMMENT } from "../utils/mutations.js";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import Auth from "../utils/auth.js";
import PropTypes from "prop-types";
import BlogCommentItemComponent from "./BlogCommentItem.component.jsx";

export const BlogCommentsComponent = ({ _id }) => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const {
    loading,
    data: commentData,
    fetchMore,
  } = useQuery(QUERY_BLOG_COMMENTS, {
    variables: {
      blogID: _id,
      offset: 0,
      limit: 5,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (commentData) {
      setComments([
        ...commentData.blogComments.comments,
        ...commentData.blogComments.replies,
      ]);
      setCommentsCount(commentData.blogComments.commentsCount);
    }
  }, [commentData]);

  const [addComment, { error: addCommentError }] = useMutation(ADD_COMMENT);

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

  const handleLoadMore = async (e) => {
    e.preventDefault();
    await fetchMore({
      variables: {
        offset: commentData.blogComments.comments.length,
        limit: 5,
      },
    }).then((data) => {
      setComments([
        ...comments,
        ...data.data.blogComments.comments,
        ...data.data.blogComments.replies,
      ]);
    });
  };

  return (
    <IonCardContent>
      <IonCardSubtitle>Comments</IonCardSubtitle>
      <IonList>
        {loading && (
          <IonItem>
            <IonLabel className="ion-text-wrap">Loading Comments...</IonLabel>
          </IonItem>
        )}
        {}
        {comments &&
          comments.length > 0 &&
          comments
            .filter((comment) => comment.commentID === null)
            .map((comment) => (
              <BlogCommentItemComponent
                key={comment._id}
                blogID={_id}
                comments={comments}
                comment={comment}
                setComments={setComments}
              />
            ))}
        {comments && comments.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-wrap">No Comments</IonLabel>
          </IonItem>
        )}
      </IonList>
      {comments.filter((comment) => comment.commentID === null).length <
        commentsCount && (
        <div className="ion-text-center">
          <IonButton
            fill="clear"
            onClick={handleLoadMore}
            disabled={
              comments.filter((comment) => comment.commentID === null)
                .length === commentsCount
            }>
            Load More Comments
          </IonButton>
        </div>
      )}
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
  );
};

BlogCommentsComponent.propTypes = {
  _id: PropTypes.string,
};

export default BlogCommentsComponent;
