import { IonButton, IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import "./Header.css";

const Header = () => {
  return (
    <IonHeader>
      <IonToolbar color='dark'>
        <IonButtons className="header-buttons">
          <IonButton color="light" className="header-button" routerLink="/home">
            Home
          </IonButton>
          <IonButton color="light" className="header-button" routerLink="/about">
            About Me
          </IonButton>
          <IonButton
            color="light"
            className="header-button"
            routerLink="/projects"
          >
            Github Repos
          </IonButton>
          <IonButton
            color="light"
            className="header-button"
            routerLink="/resume"
          >
            Resume
          </IonButton>
          <IonButton
            color="light"
            className="header-button"
            routerLink="/contact"
          >
            Contact Me
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
