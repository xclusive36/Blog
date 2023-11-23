import { IonButton, IonCard, IonCardContent } from "@ionic/react";
import Resume from "../assets/JoshuaCavellResume.pdf";

const MoreComponent = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonButton expand="block" href={Resume}>
          Download My Resume
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default MoreComponent;
