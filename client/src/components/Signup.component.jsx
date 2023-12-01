import { useState } from "react";
import {
  IonButton,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonText,
} from "@ionic/react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { warning } from "ionicons/icons";

const SignupComponent = () => {
  // State to manage form input values
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Use mutation to add a new user
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Execute the addUser mutation with the formState values
      const { data } = await addUser({
        variables: { ...formState },
      });

      // If successful, log in the user with the returned token
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <IonCardTitle className="header ion-margin-top ion-margin-bottom">
        Signup
      </IonCardTitle>

      {/* If data exists (successful user creation), show success message */}
      {data && (
        <p>
          Success! You may now head <a href="/">back to the homepage.</a>
        </p>
      )}

      <form className="ion-padding" onSubmit={handleFormSubmit}>
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Username"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Username"
          mode="md"
          required
          value={formState.username}
          onIonChange={handleChange}
        />
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Email Address"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Email Address"
          mode="md"
          required
          value={formState.email}
          onIonChange={handleChange}
        />
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Password"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Password"
          type="password"
          mode="md"
          required
          value={formState.password}
          onIonChange={handleChange}
        />
        <p className="ion-text-center">
          By Signing up, you agree to our&nbsp;
          <a href="/terms">Terms of Use</a>
          &nbsp;and&nbsp;
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <IonButton expand="block" type="submit">
          Signup
        </IonButton>
        {/* Show error message if login fails */}
        {error && (
          <IonText color="danger">
            <IonIcon slot="start" icon={warning} />
            {error.message}
          </IonText>
        )}
      </form>
    </>
  );
};

export default SignupComponent;
