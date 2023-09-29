import { IonCol, IonGrid, IonRow } from "@ionic/react";

import Summary from "../components/Summary";
import FrontEnd from "../components/FrontEnd";
import BackEnd from "../components/BackEnd";
import More from "../components/More";
import Skills from "../components/Skills";
import Education from "../components/Education";

import Page from "../components/Page";

const Resume = () => {
  return (
    <Page>
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
    </Page>
  );
};

export default Resume;
