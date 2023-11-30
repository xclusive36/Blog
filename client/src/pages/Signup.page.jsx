import {
  IonButton,
  IonCardTitle,
  IonInput,
  IonContent,
  IonPage,
  IonHeader,
  IonButtons,
  IonIcon,
  IonToolbar,
  IonTabButton,
  IonLabel,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { close, person, personAdd } from "ionicons/icons";
import PropTypes from "prop-types";

const SignupPage = ({ setShowSignup, dismiss }) => {
  const handleSignupSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="end" className="header-buttons">
            <IonButton onClick={dismiss}>
              Close <IonIcon slot="end" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCardTitle className="header">Signup</IonCardTitle>

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
          <p className="ion-text-center">
            Have an account? <a onClick={() => setShowSignup(false)}>Login</a>
          </p>
        </form>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTabButton tab="home" onClick={() => setShowSignup(false)}>
                  <IonIcon icon={person} />
                  <IonLabel>Login</IonLabel>
                </IonTabButton>
              </IonCol>
              <IonCol>
                <IonTabButton tab="about" onClick={() => setShowSignup(true)}>
                  <IonIcon color="danger" icon={personAdd} />
                  <IonLabel>Signup</IonLabel>
                </IonTabButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

SignupPage.propTypes = {
  setShowSignup: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
};

export default SignupPage;
