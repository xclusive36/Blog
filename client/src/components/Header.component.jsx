import { useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { SettingsContext } from "../context/settingsContext";
import { personCircleOutline } from "ionicons/icons";

import MenuBar from "./MenuBar.component";

import "./Header.styles.css";

const HeaderComponent = () => {
  const { SettingsContextObj, setSettingsContextObj } =
    useContext(SettingsContext);

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
            <IonButton onClick={openModal}>
              <IonIcon
                slot="icon-only"
                icon={personCircleOutline}
                aria-label="Person Icon"
              />
            </IonButton>
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
