import { IonButton, IonCardTitle, IonInput } from "@ionic/react";

const SignupComponent = () => {
  const handleSignupSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <IonCardTitle className="header ion-margin-top ion-margin-bottom">
        Signup
      </IonCardTitle>

      <form className="ion-padding" onSubmit={handleSignupSubmit}>
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Username"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Username"
          mode="md"
          required
        />
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Email Address"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Email Address"
          mode="md"
          required
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
        />
        <IonInput
          className="ion-margin-top ion-margin-bottom"
          label="Confirm Password"
          labelPlacement="stacked"
          fill="outline"
          placeholder="Confirm Password"
          type="password"
          mode="md"
          required
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
      </form>
    </>
  );
};

export default SignupComponent;
