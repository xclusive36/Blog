import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import { logoFirebase, logoNodejs, logoNpm } from "ionicons/icons";
import express from "../assets/images/express.svg";
import mongodb from "../assets/images/mongodb.svg";
import postgresql from "../assets/images/postgresql.svg";
import mongoosejs from "../assets/images/mongoosejs.svg";
import mysql from "../assets/images/mysql.svg";
import graphql from "../assets/images/graphql.svg";

const BackEndComponent = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonCardSubtitle>
          These are some of the software I&apos;ve used for building backend
          applications
        </IonCardSubtitle>
        <div className="skills ion-text-center">
          <IonButton
            href="https://nodejs.org/en"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoNodejs}
              color="primary"
            />
            Node.js
          </IonButton>
          <IonButton
            href="https://firebase.google.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoFirebase}
              color="primary"
            />
            Firebase
          </IonButton>
          <IonButton
            href="https://www.npmjs.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoNpm}
              color="primary"
            />
            NPM
          </IonButton>
          <IonButton
            href="https://expressjs.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={express} />
            Express
          </IonButton>
          <IonButton
            href="https://www.mongodb.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={mongodb} />
            MongoDB
          </IonButton>
          <IonButton
            href="https://www.postgresql.org/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={postgresql} />
            PostgreSQL
          </IonButton>
          <IonButton
            href="https://mongoosejs.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={mongoosejs} />
            Mongoose
          </IonButton>
          <IonButton
            href="https://www.mysql.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={mysql} />
            MySQL
          </IonButton>
          <IonButton
            href="https://graphql.org/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={graphql} />
            GraphQL
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default BackEndComponent;
