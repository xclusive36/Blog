import { IonContent, IonPage } from "@ionic/react";
import HeaderComponent from "./Header.component";
import SocialComponent from "./Social.component";
import FooterComponent from "./Footer.component";
import ModalComponent from "./Modal.component";

import PropTypes from "prop-types";

const PageComponent = ({ contentRef, children }) => {
  return (
    <IonPage>
      <HeaderComponent />
      <IonContent ref={contentRef}>
        <SocialComponent />
        {children}
        <FooterComponent />
        <ModalComponent />
      </IonContent>
    </IonPage>
  );
};

PageComponent.propTypes = {
  contentRef: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default PageComponent;
