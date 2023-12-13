import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import {
  IonButton,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonText,
  useIonLoading,
} from "@ionic/react";
import Auth from "../utils/auth";
import { warning } from "ionicons/icons";
import { useEffect } from "react";

const LoginComponent = () => {
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [
    present,
    // dismiss
  ] = useIonLoading();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form[0].value.trim();
    const password = form[1].value.trim();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (data) {
      present({
        message: "Logging in... Please wait.",
        duration: 3000,
      });
    }
  }, [data, present]);

  return (
    <>
      <IonCardTitle className="header ion-margin-top ion-margin-bottom">
        Login
      </IonCardTitle>

      <form className="ion-padding" onSubmit={handleFormSubmit}>
        <IonInput
          label="Email Address"
          labelPlacement="stacked"
          placeholder="Email Address"
          name="email"
          type="email"
          fill="outline"
          mode="md"
        ></IonInput>
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Password"
          labelPlacement="stacked"
          placeholder="******"
          name="password"
          type="password"
          fill="outline"
          mode="md"
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
      </form>
      {/* Show error message if login fails */}
      {error && (
        <IonText color="danger">
          <IonIcon slot="start" icon={warning} />
          {error.message && ("Email or password is incorrect.")}
        </IonText>
      )}
    </>
  );
};

export default LoginComponent;
