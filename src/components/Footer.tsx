import { IonButton, IonButtons, IonFooter, IonToolbar } from "@ionic/react";

import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <>
      <IonToolbar color="dark">
        <IonButtons className="footer-buttons">
          <IonButton color="light" className="footer-button" routerLink="/home">
            Home
          </IonButton>
          <IonButton
            color="light"
            className="footer-button"
            routerLink="/about"
          >
            About Me
          </IonButton>
          <IonButton
            color="light"
            className="footer-button"
            routerLink="/projects"
          >
            Github Repos
          </IonButton>
          <IonButton
            color="light"
            className="footer-button"
            routerLink="/resume"
          >
            Resume
          </IonButton>
          <IonButton
            color="light"
            className="footer-button"
            routerLink="/contact"
          >
            Contact Me
          </IonButton>
        </IonButtons>
        <div className="footer-text">&#169; 2023 Joshua Cavell</div>
      </IonToolbar>
    </>
  );
};

export default Footer;
