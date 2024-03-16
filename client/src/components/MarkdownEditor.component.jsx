import {
  IonButton,
  IonCard,
  IonCardContent,
  // IonCardHeader,
  IonCardTitle,
  // IonCardSubtitle,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
  // IonTextarea,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useMutation } from "@apollo/client";
import { ADD_BLOG, UPDATE_BLOG } from "../utils/mutations";
import PropTypes from "prop-types";
import MDEditor from "./Remirror.component";

const MarkdownEditor = ({
  updateBlog: updateBlogProp,
  setUpdateBlog,
  setShouldIRefetch = false,
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [introduction, setIntroduction] = useState(``);
  const [content, setContent] = useState(``);

  useEffect(() => {
    if (updateBlogProp) {
      setTitle(updateBlogProp.title);
      setSubtitle(updateBlogProp.subtitle);
      setImageURL(updateBlogProp.imageURL);
      setImageAlt(updateBlogProp.imageAlt);
      setIntroduction(updateBlogProp.introduction);
      setContent(updateBlogProp.content);
    }
  }, [updateBlogProp]);

  const [addBlog, { error }] = useMutation(ADD_BLOG);
  const [updateBlog, { error: errorUpdate }] = useMutation(UPDATE_BLOG);

  const [present] = useIonToast();

  const presentToast = (message = "Blog successfully created") => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  };

  // Handle the title change
  const handleChangeTitle = (e) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value); // Sanitize the input
    setTitle(sanitizedInput); // Set the state
  };

  // Handle the subtitle change
  const handleChangeSubTitle = (e) =>
    setSubtitle(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state

  // Handle the image change
  const handleChangeImage = (e) =>
    setImageURL(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state

  // Handle the image alt change
  const handleChangeImageAlt = (e) =>
    setImageAlt(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state

  // Handle the introduction change
  const handleChangeIntroduction = (e) =>
    // setIntroduction(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state
    setIntroduction(DOMPurify.sanitize(e.helpers.getMarkdown())); // Sanitize the input and set the state

  // Handle the content change
  const handleChangeContent = (e) =>
    // setContent(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state
    setContent(DOMPurify.sanitize(e.helpers.getMarkdown())); // Sanitize the input and set the state

  // Handle the blog creation
  const handleBlogCreation = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (refreshing the page)

    // Make sure the required fields are filled out
    if (!title || !content) {
      return false;
    }

    // define the variables for the mutation and sanitize the input
    const sanitizedTitle = DOMPurify.sanitize(title.trim()); // sanitize the input and trim whitespace
    const sanitizedSubtitle = DOMPurify.sanitize(subtitle.trim()); // sanitize the input and trim whitespace
    const sanitizedImageURL = DOMPurify.sanitize(imageURL.trim()); // sanitize the input and trim whitespace
    const sanitizedImageAlt = DOMPurify.sanitize(imageAlt.trim()); // sanitize the input and trim whitespace
    const sanitizedIntroduction = DOMPurify.sanitize(introduction.trim()); // sanitize the input and trim whitespace
    const sanitizedContent = DOMPurify.sanitize(content.trim()); // sanitize the input and trim whitespace

    // create the object to pass to the mutation
    const blogData = {
      title: sanitizedTitle,
      subtitle: sanitizedSubtitle,
      imageURL: sanitizedImageURL,
      imageAlt: sanitizedImageAlt,
      introduction: sanitizedIntroduction,
      content: sanitizedContent,
    };

    // If the updateBlogProp exists, update the blog with the updateBlog mutation
    if (updateBlogProp) {
      try {
        // try to update the blog
        const { data } = await updateBlog({
          // destructure the data from the mutation
          variables: {
            _id: updateBlogProp._id, // pass the blogId
            ...blogData, // spread the blogData object
          },
        });

        if (data) {
          // if the data exists (i.e. the mutation was successful)
          presentToast("Blog successfully updated"); // Present the toast notification

          // Clear the form fields by setting the state to empty strings
          setTitle("");
          setSubtitle("");
          setImageURL("");
          setImageAlt("");
          setIntroduction("");
          setContent("");

          setUpdateBlog(null); // Set the updateBlog state to null
          setShouldIRefetch(true); // Set the shouldIRefetch state to true to refetch the blogs
        }
      } catch (error) {
        // catch any errors
        console.log(error); // log the error to the console if there is one
      }

      return false; // return false to exit the function
    }

    // Create the blog with the addBlog mutation
    try {
      // try to create the blog
      const { data } = await addBlog({
        // destructure the data from the mutation
        variables: {
          ...blogData, // spread the blogData object
        },
      });

      if (data) {
        // if the data exists (i.e. the mutation was successful)
        presentToast(); // Present the toast notification

        // Clear the form fields by setting the state to empty strings
        setTitle("");
        setSubtitle("");
        setImageURL("");
        setImageAlt("");
        setIntroduction("");
        setContent("");

        setShouldIRefetch(true); // Set the shouldIRefetch state to true to refetch the blogs
      }
    } catch (error) {
      // catch any errors
      console.log(error); // log the error to the console if there is one
    }
  };

  // Handle the reset of the form
  const handleReset = (e = null) => {
    if (e) e.preventDefault(); // Prevent the default form submission behavior (refreshing the page)

    // Clear the form fields by setting the state to empty strings
    setTitle("");
    setSubtitle("");
    setImageURL("");
    setImageAlt("");
    setIntroduction("");
    setContent("");

    setUpdateBlog(null); // Set the updateBlog state to null
  };

  return (
    <IonCard>
      <div className="MarkdownEditor">
        <form onSubmit={handleBlogCreation}>
          <IonGrid>
            <IonRow>
              <IonCol size="3" sizeSm="12" sizeMd="3" sizeXs="12">
                <IonCardContent>
                  <IonInput
                    label="Image URL"
                    labelPlacement="stacked"
                    clearInput={true}
                    type="url"
                    fill="outline"
                    mode="md"
                    placeholder="Image URL"
                    className="ion-margin-bottom"
                    value={imageURL}
                    onIonInput={handleChangeImage}
                  />
                  <IonInput
                    label="Image Alt"
                    labelPlacement="stacked"
                    clearInput={true}
                    type="text"
                    fill="outline"
                    mode="md"
                    placeholder="Image alt text"
                    className="ion-margin-bottom"
                    value={imageAlt}
                    onIonInput={handleChangeImageAlt}
                  />
                  <IonInput
                    label="Blog Title"
                    labelPlacement="stacked"
                    clearInput={true}
                    type="text"
                    fill="outline"
                    mode="md"
                    placeholder="Blog title"
                    className="ion-margin-bottom"
                    value={title}
                    onIonInput={handleChangeTitle}
                    required
                  />
                  <IonInput
                    label="Blog Subtitle"
                    labelPlacement="stacked"
                    clearInput={true}
                    type="text"
                    fill="outline"
                    mode="md"
                    placeholder="Blog subtitle"
                    className="ion-margin-bottom"
                    value={subtitle}
                    onIonInput={handleChangeSubTitle}
                  />
                </IonCardContent>
              </IonCol>
              <IonCol>
                <IonCardContent>
                  <IonCardTitle className="ion-padding-bottom">
                    Blog Introduction
                  </IonCardTitle>
                  <MDEditor
                    content={introduction}
                    handleChange={handleChangeIntroduction}
                  />
                </IonCardContent>
                <IonCardContent>
                  <IonCardTitle className="ion-padding-bottom">
                    Blog Content
                  </IonCardTitle>
                  <MDEditor
                    content={content}
                    handleChange={handleChangeContent}
                  />
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="ion-text-center ion-padding">
            {updateBlogProp && (
              <IonButton className="ion-margin-bottom" onClick={handleReset}>
                Cancel
              </IonButton>
            )}
            <IonButton className="ion-margin-bottom" type="submit">
              {updateBlogProp ? "Update" : "Submit"}
            </IonButton>
            {updateBlogProp && (
              <>
                <br />
                <small style={{ color: "var(--ion-color-danger)" }}>
                  Click &quot;Cancel&quot; or &quot;Update&quot; to end the
                  update process.
                </small>
              </>
            )}
            <br />
            <small>Blog Title and Blog Content are required</small>
          </div>

          {error && (
            <div className="ion-text-center ion-padding">
              <div className="ion-text-center ion-padding">
                <div className="blog-item-link">Error creating blog</div>
                <div>{error.message}</div>
              </div>
            </div>
          )}
          {errorUpdate && (
            <div className="ion-text-center ion-padding">
              <div className="ion-text-center ion-padding">
                <div className="blog-item-link">Error updating blog</div>
                <div>{errorUpdate.message}</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </IonCard>
  );
};

MarkdownEditor.propTypes = {
  updateBlog: PropTypes.object,
  setUpdateBlog: PropTypes.func.isRequired,
  setShouldIRefetch: PropTypes.func.isRequired,
};

export default MarkdownEditor;
