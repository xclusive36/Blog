import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import PropTypes from "prop-types";
import Auth from "../utils/auth";
import ReplyFormComponent from "./ReplyForm.component";
import UpdateFormComponent from "./UpdateForm.component";
import {
  arrowUpOutline,
  closeOutline,
  createOutline,
  arrowDownOutline,
  returnUpBackOutline,
} from "ionicons/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_COMMENT, UPDATE_COMMENT_VOTE } from "../utils/mutations";
import { useState } from "react";

export const BlogCommentItemComponent = ({
  className = "",
  blogID,
  comments,
  comment,
  setComments,
  parentCommentID = null,
}) => {
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [removeComment, { error: removeCommentError }] =
    useMutation(REMOVE_COMMENT);
  const [updateCommentVote, { error: updateCommentVoteError }] =
    useMutation(UPDATE_COMMENT_VOTE);

  const convertDate = (date) => {
    // return the date in the format of Month Day, Year
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString("default", { month: "long" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleUpdateCommentVote = async (e, commentID, vote) => {
    e.preventDefault();
    try {
      const result = await updateCommentVote({
        variables: {
          _id: commentID,
          vote: vote,
        },
      });

      setComments(
        comments.map((comment) => {
          if (comment._id === commentID) {
            return {
              ...comment,
              voteTotal: result.data.updateCommentVote.voteTotal,
            };
          }
          return comment;
        })
      );
    } catch (err) {
      console.error(err);
      console.error(updateCommentVoteError);
    }
  };

  const handleRemoveComment = async (e, commentID) => {
    // This function removes the comment by updating the comment string to "REMOVED"
    e.preventDefault();
    try {
      await removeComment({
        variables: {
          _id: commentID,
        },
      });

      setComments(
        comments.map((comment) => {
          if (comment._id === commentID) {
            return {
              ...comment,
              content: "REMOVED",
            };
          }
          return comment;
        })
      );
    } catch (err) {
      console.error(err);
      console.error(removeCommentError);
    }
  };

  return (
    <div className={className}>
      <IonItem lines="none">
        <IonAvatar
          style={{ width: "1rem", height: "1rem" }}
          aria-hidden="true"
          slot="start">
          <img
            alt=""
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <IonLabel className="ion-text-wrap">
          <span
            style={{
              fontWeight: 500,
            }}>
            {comment.username}
          </span>
          <br />
          <span style={{ fontWeight: 300 }}>
            <small>{convertDate(comment.date)}</small>
          </span>
        </IonLabel>
      </IonItem>
      <div>{comment.content}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "1px solid var(--ion-color-light)",
        }}>
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "10px",
          }}
          slot="start"
          className="ion-text-center"
          color="dark">
          <IonButton
            className="button-no-padding-top"
            disabled={!Auth.loggedIn()}
            onClick={(e) => handleUpdateCommentVote(e, comment._id, "down")}
            fill="clear">
            <IonIcon className="comment-icon" icon={arrowDownOutline} />
          </IonButton>
          <small>{comment.voteTotal}</small>
          <IonButton
            className="button-no-padding-top"
            disabled={!Auth.loggedIn()}
            onClick={(e) => handleUpdateCommentVote(e, comment._id, "up")}
            fill="clear">
            <IonIcon className="comment-icon" icon={arrowUpOutline} />
          </IonButton>
        </span>
        <IonButton
          className="button-no-padding ion-padding-left ion-padding-right"
          disabled={
            !Auth.loggedIn() || !comment.userID === Auth.getProfile().data._id
          }
          onClick={() =>
            showUpdateForm === comment._id
              ? setShowUpdateForm(null)
              : (setShowUpdateForm(comment._id), setShowReplyForm(null))
          }
          fill="clear">
          <IonIcon className="comment-icon" icon={createOutline} />
        </IonButton>
        <IonButton
          disabled={!Auth.loggedIn()}
          onClick={() =>
            showReplyForm === comment._id
              ? setShowReplyForm(null)
              : (setShowReplyForm(comment._id), setShowUpdateForm(null))
          }
          fill="clear">
          <IonIcon
            className="comment-icon"
            icon={returnUpBackOutline}
            slot="start"
          />
        </IonButton>
        {Auth.loggedIn() && Auth.getProfile().data._id === comment.userID && (
          <IonButton
            className="button-no-padding ion-padding-left ion-padding-right"
            fill="clear"
            onClick={(e) => handleRemoveComment(e, comment._id)}>
            <IonIcon className="comment-icon" icon={closeOutline} />
          </IonButton>
        )}
      </div>
      <ReplyFormComponent
        blogID={blogID}
        comments={comments}
        comment={comment}
        isAvailable={showReplyForm === comment._id}
        setShowThisForm={setShowReplyForm}
        setComments={setComments}
        parentCommentID={parentCommentID ? parentCommentID : comment._id}
      />
      <UpdateFormComponent
        comment={comment}
        isAvailable={showUpdateForm === comment._id}
        setShowThisForm={setShowUpdateForm}
      />
      {comments &&
        comments
          .filter((reply) => reply.commentID === comment._id)
          .map((reply) => (
            <BlogCommentItemComponent
              className="reply"
              key={reply._id}
              blogID={blogID}
              comments={comments}
              comment={reply}
              setComments={setComments}
              parentCommentID={parentCommentID ? parentCommentID : comment._id}
            />
          ))}
    </div>
  );
};

BlogCommentItemComponent.propTypes = {
  className: PropTypes.string,
  blogID: PropTypes.string,
  comments: PropTypes.array,
  comment: PropTypes.object,
  setComments: PropTypes.func,
  parentCommentID: PropTypes.string,
};

export default BlogCommentItemComponent;
