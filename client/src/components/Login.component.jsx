import { IonButton, IonCardTitle, IonInput } from "@ionic/react";

const LoginComponent = () => {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <IonCardTitle className="header ion-margin-top ion-margin-bottom">Login</IonCardTitle>

      <form className="ion-padding" onSubmit={handleLoginSubmit}>
        <IonInput
          label="Email Address"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Email Address"
          mode="md"
          required
        ></IonInput>
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Password"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Password"
          type="password"
          mode="md"
          required
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
    </>
  );
};

export default LoginComponent;
