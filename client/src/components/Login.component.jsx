import { useState } from "react";
import {
  IonButton,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonText,
} from "@ionic/react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { warning } from "ionicons/icons";

import Auth from "../utils/auth";

const LoginComponent = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Function to update state based on form input changes
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
      const { data } = await login({
        variables: { ...formState },
      });

      // Call Auth.login function if login is successful
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Clear form values after submission
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <IonCardTitle className="header ion-margin-top ion-margin-bottom">
        Login
      </IonCardTitle>

      {data && (
        <p>
          Success! You may now head <a href="/">back to the homepage.</a>
        </p>
      )}

      <form className="ion-padding" onSubmit={handleFormSubmit}>
        <IonInput
          label="Email Address"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Email Address"
          mode="md"
          required
          value={formState.email}
          onIonChange={handleChange}
        ></IonInput>
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Password"
          labelPlacement="stacked"
          fill="outline"
          placeholder="******"
          type="password"
          mode="md"
          required
          value={formState.password}
          onIonChange={handleChange}
        ></IonInput>
        <p className="ion-text-center">
          By logging in, you agree to our&nbsp;
          <a href="/terms">Terms of Use</a>
          &nbsp;and&nbsp;
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <IonButton expand="block" type="submit">
          Log In
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

export default LoginComponent;
