import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { REPLY_COMMENT } from "../utils/mutations";
import DOMPurify from "dompurify";
import Auth from "../utils/auth";
import { IonButton, IonCardContent, IonTextarea } from "@ionic/react";
import PropTypes from "prop-types";

export const ReplyFormComponent = ({
  blogID,
  comments,
  comment,
  isAvailable,
  setShowThisForm,
  setComments,
  parentCommentID,
}) => {
  const replyCommentRef = useRef();

  const [replyComment, { error: replyCommentError }] =
    useMutation(REPLY_COMMENT);

  const handleReplyComment = async (e) => {
    e.preventDefault();
    const commentContent = DOMPurify.sanitize(replyCommentRef.current.value);
    try {
      const result = await replyComment({
        variables: {
          blogID,
          commentID: comment._id,
          content: commentContent,
          parentCommentID,
        },
      });
      setShowThisForm(null);
      setComments([...comments, result.data.replyComment]);
      replyCommentRef.current.value = "";
    } catch (err) {
      console.error(err);
      console.error(replyCommentError);
    }
  };

  return (
    <>
      {Auth.loggedIn() && isAvailable && (
        <IonCardContent>
          <form onSubmit={handleReplyComment}>
            <IonTextarea
              className="ion-margin-top ion-margin-bottom"
              labelPlacement="stacked"
              fill="outline"
              mode="md"
              aria-label="Submit Reply"
              counter={true}
              maxlength={500}
              placeholder="Submit Reply"
              ref={replyCommentRef}>
              <div slot="label">
                <strong>Submit Reply</strong>
              </div>
            </IonTextarea>
            <IonButton type="submit" expand="block">
              Submit Reply
            </IonButton>
          </form>
        </IonCardContent>
      )}
    </>
  );
};

ReplyFormComponent.propTypes = {
  blogID: PropTypes.string,
  comments: PropTypes.array,
  comment: PropTypes.object,
  isAvailable: PropTypes.bool,
  setShowThisForm: PropTypes.func,
  setComments: PropTypes.func,
  parentCommentID: PropTypes.string,
};

export default ReplyFormComponent;
