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
        href="https://www.linkedin.com/in/joshua-cavell/"
        target="_blank"
      >
        <IonIcon slot="icon-only" icon={logoLinkedin} />
      </IonButton>
      <IonButton
        fill="clear"
        color="dark"
        className="social-button"
        href="https://github.com/xclusive36/"
        target="_blank"
      >
        <IonIcon slot="icon-only" icon={logoGithub} />
      </IonButton>
      <IonButton
        fill="clear"
        color="dark"
        className="social-button"
        href="https://twitter.com/xclusive36/"
        target="_blank"
      >
        <IonIcon slot="icon-only" icon={logoTwitter} />
      </IonButton>
    </div>
  );
};

export default Social;
