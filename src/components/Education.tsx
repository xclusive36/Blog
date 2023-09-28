import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { schoolOutline } from "ionicons/icons";

const Education = () => {
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
      </IonCardContent>
    </IonCard>
  );
};

export default Education;
