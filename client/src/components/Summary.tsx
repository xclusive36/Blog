import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
} from "@ionic/react";

const Summary: React.FC = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonCardTitle>Summary</IonCardTitle>
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <p className="summary">
              Passionate Full-Stack Developer with a strong foundation in sales
              management. Leveraging a decade of successful sales experience, I
              bring creativity and problem-solving skills to crafting engaging
              and user-centric web interfaces. Committed to collaborating with
              cross-functional teams and delivering seamless, visually
              appealing, and high-performance web experiences. I am now applying
              my creative mindset to deliver dynamic and user-focused web
              applications. Committed to delivering top-notch customer
              experiences and applying a holistic approach throughout the
              development lifecycle.
            </p>
          </IonLabel>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Summary;
