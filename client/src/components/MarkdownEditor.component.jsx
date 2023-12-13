import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import Markdown from "react-markdown";
import { informationCircleOutline } from "ionicons/icons";
import DOMPurify from "isomorphic-dompurify";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../utils/mutations";
import Auth from "../utils/auth";

const MarkdownEditor = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");

  const [addBlog, { error }] = useMutation(ADD_BLOG);
  const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable for simplicity

  const [present] = useIonToast();

  const presentToast = () => {
    present({
      message: "Hello World!",
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
    setIntroduction(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state

  // Handle the content change
  const handleChangeContent = (e) =>
    setContent(DOMPurify.sanitize(e.target.value)); // Sanitize the input and set the state

  // Handle the blog creation
  const handleBlogCreation = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (refreshing the page)

    // Make sure the required fields are filled out
    if (!title || !content) {
      return false;
    }

    const headers = {
      // define headers variable for simplicity
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    };

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

    // Create the blog with the addBlog mutation
    try {
      // try to create the blog
      const { data } = await addBlog({
        // destructure the data from the mutation
        variables: {
          ...blogData, // spread the blogData object
        },
        context: headers, // set context to headers
      });

      if (data) {
        // if the data exists (i.e. the mutation was successful)
        console.log("Blog created"); // Log the blog creation to the console
        presentToast(); // Present the toast notification

        // Clear the form fields by setting the state to empty strings
        setTitle("") &&
          setSubtitle("") &&
          setImageURL("") &&
          setImageAlt("") &&
          setIntroduction("") &&
          setContent("");

        return true;
      }
    } catch (error) {
      // catch any errors
      console.log(error); // log the error to the console if there is one
    }
  };

  return (
    <div className="MarkdownEditor">
      <IonGrid>
        <IonRow>
          <IonCol size="6" sizeSm="12" sizeMd="6" sizeXs="12">
            <IonCard>
              <IonItem lines="none">
                <IonLabel>
                  <IonCardTitle>Blog Editor</IonCardTitle>
                </IonLabel>
                <IonButton
                  href="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                  fill="clear"
                >
                  <IonIcon slot="icon-only" icon={informationCircleOutline} />
                </IonButton>
              </IonItem>
              <IonCardContent>
                <form onSubmit={handleBlogCreation}>
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
                  <IonTextarea
                    label="Blog Introduction"
                    fill="outline"
                    mode="md"
                    labelPlacement="stacked"
                    rows={5}
                    placeholder="Type something here in markdown..."
                    className="ion-margin-bottom"
                    value={introduction}
                    onIonInput={handleChangeIntroduction}
                  />
                  <IonTextarea
                    label="Blog Content"
                    fill="outline"
                    mode="md"
                    labelPlacement="stacked"
                    rows={10}
                    placeholder="Type something here in markdown..."
                    value={content}
                    onIonInput={handleChangeContent}
                    required
                  />
                  <div className="ion-text-center ion-padding">
                    <IonButton className="ion-margin-bottom" type="submit">
                      Submit
                    </IonButton>
                    <br />
                    <small>Blog Title and Blog Content are required</small>
                  </div>
                </form>
                {error && (
                  <div className="ion-text-center ion-padding">
                    <div className="ion-text-center ion-padding">
                      <div className="blog-item-link">Error creating blog</div>
                      <div>{error.message}</div>
                    </div>
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="6" sizeSm="12" sizeMd="6" sizeXs="12">
            <IonCard
              style={{
                maxWidth: "786px",
                margin: "auto",
              }}
            >
              <IonCardHeader>
                {imageURL && <img src={imageURL} alt={imageAlt} />}
                <IonCardTitle className="card-title">
                  {title ? title : "Blog Title"}
                </IonCardTitle>
                <IonCardSubtitle>{subtitle && subtitle}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <article>
                  {introduction && <Markdown>{introduction}</Markdown>}
                  {content ? (
                    <Markdown>{content}</Markdown>
                  ) : (
                    <div>
                      No content to preview, type something in the Blog Content
                      box.
                    </div>
                  )}
                </article>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default MarkdownEditor;
