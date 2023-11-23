import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonText,
  IonTextarea,
  useIonToast,
} from "@ionic/react";

import { useRef, useState } from "react";
import PageComponent from "../components/Page.component";

const ContactPage = () => {
  // create Contact component
  const nameRef = useRef(null); // create ref for name input
  const emailRef = useRef(null); // create ref for email input
  const messageRef = useRef(null); // create ref for message input
  const [requiredElements, setRequiredElements] = useState({
    // create state for required elements
    "ion-input-0": false, // set ion-input-0 to false
    "ion-input-1": false, // set ion-input-1 to false
    "ion-textarea-0": false, // set ion-textarea-0 to false
  }); // create state for required elements

  const [present] = useIonToast(); // useIonToast hook to present toast message to user

  const presentToast = (
    position, // position of toast message (top, middle, bottom)
    color, // color of toast message (primary, secondary, tertiary, success, warning, danger, light, medium, dark)
    message // message to present to user
  ) => {
    // function to present toast message to user
    present({
      // present toast from useIonToast hook
      message: message, // set message as message from passed variable
      duration: 1500, // set duration to 1.5 seconds
      position: position, // set position from passed variable (bottom)
      color: color, // set color from passed variable (danger)
    });
  };

  const checkIfRequired = (refObj) => {
    // function to check if input is empty
    const obj = refObj.current; // get current ref object

    const stringToCheck = obj?.value; // get name from form input and trim whitespace

    if (!stringToCheck) {
      // if string is empty
      presentToast("bottom", "danger", "All inputs are required"); // present toast

      setRequiredElements({
        ...requiredElements,
        [refObj.current.inputId]: true,
      });
      console.log(requiredElements); // log required elements to console

      return; // return
    }

    setRequiredElements({
      ...requiredElements,
      [refObj.current.inputId]: false,
    });
  };

  const sendEmail = (event) => {
    // function to send email
    // references:
    // https://stackoverflow.com/a/31664656
    // https://stackoverflow.com/a/7381162

    event.preventDefault(); // prevent default form submission
    const name = nameRef.current?.value; // get name from form input
    const email = emailRef.current?.value; // get email from form input
    const message = messageRef.current?.value; // get message from form input
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // regex pattern for email
    if (!name) {
      // if name is empty
      presentToast("bottom", "danger", "Please enter your name."); // present toast
      return; // return
    }

    if (!email || !emailPattern.test(email.toString())) {
      // if email is empty or does not match pattern
      presentToast("bottom", "danger", "Please enter a valid email address."); // present toast
      return; // return
    }
    if (!message) {
      // if message is empty
      presentToast("bottom", "danger", "Please enter a message."); // present toast
      return; // return
    }

    let obj, body; // declare variables

    obj = {
      // create object
      name: name, // set name
      email: email, // set email
      message: message, // set message
    };

    body = "Name: " + obj.name; // set body with name from object
    body += "\nEmail: " + obj.email; // append body with email from object
    body += "\nMessage: " + obj.message; // append body with message from object

    const subject = "Profile Contact Form"; // set subject of email

    window.open(
      // open mailto link
      String(
        // convert to string to replace ^ with @
        "mailto:joshua.cavell^gmail.com?body=" + // mailto link
          encodeURIComponent(body) + // encode body of email with encodeURIComponent to format as entended
          "&subject=" + // add subject to mailto link
          encodeURIComponent(subject) // encode subject of email with encodeURIComponent to format as entended
      ).replace("^", "@") // replace ^ with @ in mailto link to send email to trick spam bots
    );
  };

  return (
    <PageComponent>
      <h1 className="about-title" style={{ textAlign: "center" }}>
        Contact
      </h1>
      <IonCard>
        <IonCardContent>
          <form onSubmit={sendEmail}>
            <IonItem>
              <IonInput
                ref={nameRef}
                onIonBlur={() => checkIfRequired(nameRef)}
                label="Name"
                name="name"
                required
              ></IonInput>
            </IonItem>
            <IonText
              className={requiredElements["ion-input-0"] ? "" : "ion-hide"}
              style={{ marginLeft: "2rem", transittion: "0.3" }}
              color="danger"
            >
              Name input must not be empty
            </IonText>
            <IonItem>
              <IonInput
                ref={emailRef}
                onIonBlur={() => checkIfRequired(emailRef)}
                label="Email"
                required
              ></IonInput>
            </IonItem>
            <IonText
              className={requiredElements["ion-input-1"] ? "" : "ion-hide"}
              style={{ marginLeft: "2rem" }}
              color="danger"
            >
              Email input must not be empty
            </IonText>
            <IonItem>
              <IonTextarea
                ref={messageRef}
                onIonBlur={() => checkIfRequired(messageRef)}
                label="Message"
                required
              ></IonTextarea>
            </IonItem>
            <IonText
              className={requiredElements["ion-textarea-0"] ? "" : "ion-hide"}
              style={{ marginLeft: "2rem" }}
              color="danger"
            >
              Message input must not be empty
              <br />
            </IonText>
            <IonButton type="submit">Contact Me</IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </PageComponent>
  );
};

export default ContactPage;
