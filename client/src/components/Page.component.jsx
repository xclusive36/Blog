import { IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "./Header.component";
import SocialComponent from "./Social.component";
import FooterComponent from "./Footer.component";

import PropTypes from "prop-types";

const PageComponent = ({ children }) => {
  return (
    <IonPage>
      <HeaderComponent />
      <IonContent>
        <SocialComponent />
        {children}
        <FooterComponent />
      </IonContent>
    </IonPage>
  );
};

PageComponent.propTypes = {
  showHero: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default PageComponent;