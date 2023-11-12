import { IonContent, IonPage } from "@ionic/react";
import Header from "./Header";
import Social from "./Social";
import Footer from "./Footer";
import Hero from "./Hero";

import PropTypes from "prop-types";

const Page = ({ showHero = false, children }) => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        {showHero && <Hero />}
        <Social />
        {children}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

Page.propTypes = {
  showHero: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Page;
