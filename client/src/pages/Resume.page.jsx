import { IonCol, IonGrid, IonRow } from "@ionic/react";

import SummaryComponent from "../components/Summary.component";
import FrontEndComponent from "../components/FrontEnd.component";
import BackEndComponent from "../components/BackEnd.component";
import MoreComponent from "../components/More.component";
import SkillsComponent from "../components/Skills.component";
import EducationComponent from "../components/Education.component";

import PageComponent from "../components/Page.component";

const ResumePage = () => {
  return (
    <PageComponent>
      <h1 className="about-title" style={{ textAlign: "center" }}>
        Resume
      </h1>
      <IonGrid>
        <IonRow>
          <IonCol size-md="8" size-sm="12">
            <SummaryComponent />
            <SkillsComponent />
          </IonCol>
          <IonCol size-md="4" size-sm="12">
            <EducationComponent />
            <FrontEndComponent />
            <BackEndComponent />
            <MoreComponent />
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageComponent>
  );
};

export default ResumePage;
