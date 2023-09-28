import { IonButton, IonIcon } from "@ionic/react";
import { logoGithub, logoLinkedin, logoTwitter } from "ionicons/icons";
import "./Social.css";

const Social: React.FC = () => {
  return (
    <div className="social-links">
      <IonButton
        fill="clear"
        color="dark"
        className="social-button"
        routerLink="#"
      >
        <IonIcon slot="icon-only" icon={logoLinkedin} />
      </IonButton>
      <IonButton
        fill="clear"
        color="dark"
        className="social-button"
        routerLink="#"
      >
        <IonIcon slot="icon-only" icon={logoGithub} />
      </IonButton>
      <IonButton
        fill="clear"
        color="dark"
        className="social-button"
        routerLink="https://www.linkedin.com/in/joshua-cavell/"
      >
        <IonIcon slot="icon-only" icon={logoTwitter} />
      </IonButton>
    </div>
  );
};

export default Social;
