import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import Resume from "../assets/JoshuaCavellResume.pdf";

const More = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonButton
          expand="block"
          href={Resume}
        >
          Download My Resume
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default More;
