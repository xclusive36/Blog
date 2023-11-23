import Page from "../components/Page";
import BlogSection from "../components/BlogSection";
import Hero from "../components/Hero";

import "./Home.css";

const Home = () => {
  return (
    <Page>
      <div className="home-container">
        <Hero />
        <BlogSection />
      </div>
    </Page>
  );
};

export default Home;
