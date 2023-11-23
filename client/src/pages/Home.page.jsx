import PageComponent from "../components/Page.component";
import BlogSectionComponent from "../components/BlogSection.component";
import HeroComponent from "../components/Hero.component";

import "./Home.styles.css";

const HomePage = () => {
  return (
    <PageComponent>
      <div className="home-container">
        <HeroComponent />
        <BlogSectionComponent />
      </div>
    </PageComponent>
  );
};

export default HomePage;
