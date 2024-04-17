import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { UPDATE_COMMENT } from "../utils/mutations";
import DOMPurify from "dompurify";
import Auth from "../utils/auth";
import { IonButton, IonCardContent, IonTextarea } from "@ionic/react";
import PropTypes from "prop-types";

export const UpdateFormComponent = ({
  comment,
  isAvailable,
  setShowThisForm,
}) => {
  const updateCommentRef = useRef();

  const [updateComment, { error: updateCommentError }] =
    useMutation(UPDATE_COMMENT);

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    const commentContent = DOMPurify.sanitize(updateCommentRef.current.value);
    try {
      await updateComment({
        variables: {
          _id: comment._id,
          content: commentContent,
        },
      });
      setShowThisForm(null);
    } catch (err) {
      console.error(err);
      console.error(updateCommentError);
    }
  };

  return (
    <>
      {Auth.loggedIn() && isAvailable && (
        <IonCardContent>
          <form onSubmit={handleUpdateComment}>
            <IonTextarea
              className="ion-margin-top ion-margin-bottom"
              labelPlacement="stacked"
              fill="outline"
              mode="md"
              aria-label="Update Comment"
              counter={true}
              maxlength={500}
              placeholder="Update Comment"
              value={comment.content}
              ref={updateCommentRef}>
              <div slot="label">
                <strong>Update Comment</strong>
              </div>
            </IonTextarea>
            <IonButton type="submit" expand="block">
              Update Comment
            </IonButton>
          </form>
        </IonCardContent>
      )}
    </>
  );
};

UpdateFormComponent.propTypes = {
  comment: PropTypes.object,
  isAvailable: PropTypes.bool,
  setShowThisForm: PropTypes.func,
};

export default UpdateFormComponent;
