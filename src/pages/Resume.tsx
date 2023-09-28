import {
  // Import components from ionic/react
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Summary from "../components/Summary";
import FrontEnd from "../components/FrontEnd";
import BackEnd from "../components/BackEnd";
import More from "../components/More";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Social from "../components/Social";

const Resume = () => {
  // Create Resume component
  return (
    // Return Resume component
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Social />
        <h1 className="about-title" style={{ textAlign: "center" }}>
          Resume
        </h1>
        <IonGrid>
          <IonRow>
            <IonCol size-md="8" size-sm="12">
              <Summary />
              <Skills />
            </IonCol>
            <IonCol size-md="4" size-sm="12">
              <Education />
              <FrontEnd />
              <BackEnd />
              <More />
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Resume; // Export Resume component
