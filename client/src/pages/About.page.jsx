import PageComponent from "../components/Page.component";
import Cartoonify from "../assets/images/Cartoonify.svg";

import "./About.styles.css";

const AboutPage = () => {
  return (
    <PageComponent>
      <div className="about-container">
        <div className="about-text">
          <h1 className="about-title">Full-Stack Developer, UX Designer</h1>
          <h2 className="about-subtitle">
            Passionate Full-Stack Developer with a strong foundation in sales
            management.
          </h2>

          <div>
            <img className="about-image blog-image" src={Cartoonify} alt="Joshua Cavell" />
          </div>
          <p className="about-paragraph">
            Passionate Full-Stack Developer with a strong foundation in sales
            management. Leveraging a decade of successful sales experience, I
            bring creativity and problem-solving skills to crafting engaging and
            user-centric web interfaces. Committed to collaborating with
            cross-functional teams and delivering seamless, visually appealing,
            and high-performance web experiences. I am now applying my creative
            mindset to deliver dynamic and user-focused web applications.
            Committed to delivering top-notch customer experiences and applying
            a holistic approach throughout the development lifecycle.
          </p>
        </div>
      </div>
    </PageComponent>
  );
};

export default AboutPage;
