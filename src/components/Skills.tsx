import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";

const Skills = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonCardTitle>Skills</IonCardTitle>
        <IonList>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Front-end Technologies: HTML5, CSS3, JavaScript (ES6+), React,
              Angular, Bootstrap, Ionic Framework (Angular) (React), Capacitor,
              Sass
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Responsive Web Design (RWD) and Progressive Web Applications (PWA)
              Development
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              User Interface (UI) and User Experience (UX) Design Principles &
              Methodologies
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Cross-Browser Compatibility, Testing, and Debugging
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Version Control Git, Github and Gitlab
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Agile Development & Scrum Methodologies
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Sales Management and Customer Engagement
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel>Team Leadership and Collaboration</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="success" icon={checkmarkOutline} />
            <IonLabel className="ion-text-wrap">
              Back-end Technologies: Node.js, Express.js, MongoDB, PostgreSQL,
              Mongoose, Firebase, TypeScript, Vite
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Skills;
