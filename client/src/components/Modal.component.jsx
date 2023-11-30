import { useState, useContext, useEffect } from "react";
import {
  IonModal,
  IonToolbar,
  IonContent,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonTabButton,
  IonLabel,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { SettingsContext } from "../context/settingsContext";
import { person, personAdd, closeOutline } from "ionicons/icons";
import LoginComponent from "./Login.component";
import SignupComponent from "./Signup.component";

const ModalComponent = () => {
  const { SettingsContextObj, setSettingsContextObj } =
    useContext(SettingsContext); // Destructure the SettingsContextObj and setSettingsContextObj from the SettingsContext

  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if the modal is open
  const [isLogin, setIsLogin] = useState(true); // State to track if the login component is open

  useEffect(() => {
    setIsModalOpen(SettingsContextObj.contextObj.isModalOpen); // Set the state to the value of the contextObj.isModalOpen
  }, [SettingsContextObj]); // Run the effect when the SettingsContextObj changes

  const closeModal = () => {
    // Function closes the modal
    const newSettingsContextObj = { ...SettingsContextObj }; // Create a copy of the contextObj object for mutation
    newSettingsContextObj.contextObj.isModalOpen = false; // Set the isModalOpen property to false on the newSettingsContextObj
    setSettingsContextObj(newSettingsContextObj); // Set the contextObj as the newSettingsContextObj
  };

  return (
    <IonModal isOpen={isModalOpen} onWillDismiss={closeModal}>
      <IonContent className="ion-padding">
        <IonFab slot="fixed" vertical="top" horizontal="end">
          <IonFabButton onClick={closeModal} size="small">
            <IonIcon icon={closeOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
        {isLogin ? <LoginComponent /> : <SignupComponent />}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTabButton
                  tab="login"
                  onClick={() => {
                    setIsLogin(true);
                  }}
                >
                  <IonIcon color="primary" icon={person} />
                  <IonLabel>Login</IonLabel>
                </IonTabButton>
              </IonCol>
              <IonCol>
                <IonTabButton
                  tab="signup"
                  onClick={() => {
                    setIsLogin(false);
                  }}
                >
                  <IonIcon color="primary" icon={personAdd} />
                  <IonLabel>Sigup</IonLabel>
                </IonTabButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ModalComponent;
