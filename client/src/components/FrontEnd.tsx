import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import {
  logoAngular,
  logoCapacitor,
  logoCss3,
  logoHtml5,
  logoIonic,
  logoJavascript,
  logoReact,
  logoSass,
} from "ionicons/icons";
import typescript from "../assets/images/typescript.svg";
import vite from "../assets/images/vite.svg";

const FrontEnd = () => {
  return (
    <IonCard>
      <IonCardContent>
        <IonCardSubtitle>
          These are some of the software I've used for building client-side
          applications
        </IonCardSubtitle>
        <div className="skills ion-text-center">
          <IonButton
            href="https://ionicframework.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoIonic}
              color="primary"
            />
            Ionic Framework
          </IonButton>
          <IonButton
            href="https://developer.mozilla.org/en-US/docs/Web/HTML"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoHtml5}
              color="primary"
            />
            HTML5
          </IonButton>
          <IonButton
            href="https://developer.mozilla.org/en-US/docs/Web/CSS"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoCss3}
              color="primary"
            />
            CSS3
          </IonButton>
          <IonButton
            href="https://sass-lang.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoSass}
              color="primary"
            />
            Sass
          </IonButton>
          <IonButton
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoJavascript}
              color="primary"
            />
            JavaScript
          </IonButton>
          <IonButton
            href="https://angular.io/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoAngular}
              color="primary"
            />
            Angular
          </IonButton>
          <IonButton
            href="https://react.dev/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoReact}
              color="primary"
            />
            React
          </IonButton>
          <IonButton
            href="https://capacitorjs.com/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon
              slot="start"
              className="skill"
              icon={logoCapacitor}
              color="primary"
            />
            Capacitor
          </IonButton>
          <IonButton
            href="https://www.typescriptlang.org/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={typescript} />
            TypeScript
          </IonButton>
          <IonButton
            href="https://vitejs.dev/"
            target="blank"
            fill="clear"
            color="dark"
          >
            <IonIcon slot="start" className="skill" icon={vite} />
            Vite
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default FrontEnd;
