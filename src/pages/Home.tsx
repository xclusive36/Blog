import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Header from "../components/Header";

import "./Home.css";
import Footer from "../components/Footer";
import Social from "../components/Social";
import Blog from "../components/Blog";
import Side from "../components/Side";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Social />
        <div className="home-container">
          <div style={{ maxWidth: "640px", margin: 'auto' }}>
            <h1 className="ion-text-center">
              A Full-Stack Developer, UX Designer
            </h1>
            <p className="ion-text-center">
              I got you covered with the best of both worlds when it comes to
              web development and design. Introducing you to the world of web
              development and design, I am a full-stack developer and UX
              designer.
            </p>
          </div>
          <h2 className="ion-text-center">Lets MacGyver something..</h2>
          <Blog />
          {/* <IonGrid>
            <IonRow>
              <IonCol size="8">
                <Blog />
              </IonCol>
              <IonCol size="4">
                <Side />
              </IonCol>
            </IonRow>
          </IonGrid> */}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
