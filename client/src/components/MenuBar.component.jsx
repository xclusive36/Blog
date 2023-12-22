import { IonButton, IonButtons } from "@ionic/react";

const MenuBar = () => (
  <IonButtons className="header-buttons">
    <IonButton color="light" className="header-button" routerLink="/home">
      Home
    </IonButton>
    <IonButton color="light" className="header-button" routerLink="/about">
      About Me
    </IonButton>
    <IonButton color="light" className="header-button" routerLink="/projects">
      Github Repos
    </IonButton>
    <IonButton color="light" className="header-button" routerLink="/resume">
      Resume
    </IonButton>
    <IonButton color="light" className="header-button" routerLink="/contact">
      Contact Me
    </IonButton>
  </IonButtons>
);

export default MenuBar;
