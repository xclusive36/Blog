import { IonButton, IonButtons, IonToolbar } from "@ionic/react";

import "./Footer.styles.css";

const FooterComponent = () => {
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

export default FooterComponent;
