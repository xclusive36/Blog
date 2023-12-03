import { useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { SettingsContext } from "../context/settingsContext";
import Auth from "../utils/auth.js";
import { personCircleOutline, logOutOutline } from "ionicons/icons";

import MenuBar from "./MenuBar.component";

import "./Header.styles.css";

const HeaderComponent = () => {
  const { SettingsContextObj, setSettingsContextObj } =
    useContext(SettingsContext);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const openModal = () => {
    const newSettingsContextObj = { ...SettingsContextObj };
    newSettingsContextObj.contextObj.isModalOpen = true;
    setSettingsContextObj(newSettingsContextObj);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar color="dark" mode="ios">
          <IonButtons slot="end" className="header-buttons">
            {Auth.loggedIn() ? (
              <IonButton onClick={logout}>
                <IonIcon
                  slot="icon-only"
                  icon={logOutOutline}
                  aria-label="Person Icon"
                />
              </IonButton>
            ) : (
              <IonButton onClick={openModal}>
                <IonIcon
                  slot="icon-only"
                  icon={personCircleOutline}
                  aria-label="Person Icon"
                />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="dark">
          <MenuBar />
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default HeaderComponent;
