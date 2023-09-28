import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";

const More = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonButton
          expand="block"
          href="https://docs.google.com/document/d/1FK4ZEE4y5uncnMBkkQiMXauSAyuyL8Ss1nR0I6m6I9Y/edit?usp=sharing"
        >
          Download My Resume
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default More;
