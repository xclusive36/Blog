import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./Header";
import Social from "./Social";
import Footer from "./Footer";
import Hero from "./Hero";

const Page: React.FC<{ showHero?: boolean, children: React.ReactNode }> = ({ showHero = false, children }) => {
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

export default Page;
