import { useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonLoading,
} from "@ionic/react";
import { SettingsContext } from "../context/settingsContext";
import Auth from "../utils/auth.js";
import {
  personCircleOutline,
  logOutOutline,
  logInOutline,
} from "ionicons/icons";

import MenuBar from "./MenuBar.component";

import "./Header.styles.css";

const HeaderComponent = () => {
  const { SettingsContextObj, setSettingsContextObj } =
    useContext(SettingsContext);
  const [
    present,
    // dismiss
  ] = useIonLoading();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    present({
      message: "Logging out... Please wait.",
      duration: 3000,
    });
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
              <>
                <IonButton>
                  <IonIcon
                    slot="start"
                    icon={personCircleOutline}
                    aria-label="Person Icon"
                  />
                  My Account
                </IonButton>
                <IonButton onClick={logout}>
                  <IonIcon
                    slot="start"
                    icon={logOutOutline}
                    aria-label="Logout Icon"
                  />
                  Logout
                </IonButton>
              </>
            ) : (
              <IonButton onClick={openModal}>
                <IonIcon
                  slot="start"
                  icon={logInOutline}
                  aria-label="Login Icon"
                />
                Login
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
