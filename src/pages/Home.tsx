import Page from "../components/Page";
import BlogSection from "../components/BlogSection";

import "./Home.css";

const Home: React.FC = () => {
  return (
    <Page>
      <div className="home-container">
        <div style={{ maxWidth: "640px", margin: "auto" }}>
          <h1 className="ion-text-center">
            A Full-Stack Developer, UX Designer
          </h1>
          <p className="ion-text-center">
            I got you covered with the best of both worlds when it comes to web
            development and design. Introducing you to the world of web
            development and design, I am a full-stack developer and UX designer.
          </p>
        </div>
        <h2 className="ion-text-center">Lets MacGyver something..</h2>
        <BlogSection />
      </div>
    </Page>
  );
};

export default Home;
