import { IonToolbar, IonButtons, IonButton } from "@ionic/react";

import "./Footer.styles.css";
import MenuBar from "./MenuBar.component";

const FooterComponent = () => {
  return (
    <>
      <IonToolbar color="dark">
        <MenuBar />
        <IonButtons className="header-buttons">
          <IonButton
            color="light"
            className="header-button"
            routerLink="/terms"
          >
            Terms of Use
          </IonButton>
          <IonButton
            color="light"
            className="header-button"
            routerLink="/privacy"
          >
            Privacy Policy
          </IonButton>
        </IonButtons>
        <div className="footer-text">&#169; 2023 Joshua Cavell</div>
      </IonToolbar>
    </>
  );
};

export default FooterComponent;
