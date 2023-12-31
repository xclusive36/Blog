import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { schoolOutline } from "ionicons/icons";

const EducationComponent = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonCardTitle>Education</IonCardTitle>
        <IonItem>
          <IonIcon slot="start" icon={schoolOutline} />
          <IonLabel className="ion-text-wrap">
            Michigan State University, East Lansing, MI: July 2023
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon slot="start" icon={schoolOutline} />
          <IonLabel className="ion-text-wrap">
            Seneca Valley HighSchool, Germantown, MD: June 1996
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default EducationComponent;
