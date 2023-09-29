import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./Header";
import Social from "./Social";
import Footer from "./Footer";

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Social />
        {children}
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Page;
