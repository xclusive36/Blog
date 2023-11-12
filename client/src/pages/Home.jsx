import Page from "../components/Page";
import BlogSection from "../components/BlogSection";

import "./Home.css";

const Home = () => {
  return (
    <Page showHero>
      <div className="home-container">
        <BlogSection />
      </div>
    </Page>
  );
};

export default Home;
