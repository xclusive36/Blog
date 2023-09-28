import { IonButton, IonContent, IonPage, IonIcon } from "@ionic/react";
import { logoGithub, logoLinkedin, logoTwitter } from "ionicons/icons";
import Cartoonify from "../assets/images/Cartoonify.svg";
import Header from "../components/Header";

import "./About.css";
import Footer from "../components/Footer";
import Social from "../components/Social";

const About: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Social />
        <div className="about-container">
          <div className="about-text">
            <h1 className="about-title">Full-Stack Developer, UX Designer</h1>
            <h2 className="about-subtitle">
              Passionate Full-Stack Developer with a strong foundation in sales
              management.
            </h2>

            <div>
              <img
                className="about-image"
                src={Cartoonify}
                alt="Joshua Cavell"
              />
            </div>
            <p className="about-paragraph">
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
          </div>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
