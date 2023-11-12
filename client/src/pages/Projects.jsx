import { useEffect, useState } from "react";
import { IonItem, IonList, IonLoading, IonText } from "@ionic/react";

import Page from "../components/Page";

import "./Projects.css";

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRepos = async () => {
    await fetch(
      "https://api.github.com/users/xclusive36/repos?sort=updated"
    ).then(async (response) => {
      // setIsLoading(false);
      const data = await response.json();
      setRepos(data);
    });
  };

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    if (repos.length > 0) {
      setIsLoading(false);
    }
  }, [repos.length]);

  const convertDate = (date) => {
    // this function converts the date to a more readable format
    const today = new Date();
    const newDate = new Date(date);
    const diff = today.getTime() - newDate.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays < 1) {
      return `${Math.ceil(diff / (1000 * 3600))} hours ago`;
    } else if (diffDays < 2) {
      return `Yesterday`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return newDate.toDateString();
    }
  };

  const bulletColor = (language) => {
    const colors = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572a5",
      Java: "#b07219",
      PHP: "#4f5d95",
    };

    return colors[language] || "#000";
  };

  return (
    <Page>
      <h1 className="about-title" style={{ textAlign: "center" }}>
        Github Repos
      </h1>
      <IonList>
        {isLoading && (
          <IonLoading
            duration={5000}
            isOpen={isLoading}
            message={"Loading..."}
          />
        )}
        {repos.map((repo) => (
          <IonItem
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            className="repo-item"
          >
            <IonText color="dark">
              <h2 style={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {repo.name}
              </h2>
              {repo.description && <p>{repo.description}</p>}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "0.8rem",
                }}
              >
                {repo.language && (
                  <div className="ion-margin-bottom">
                    <span
                      className="bullet"
                      style={{
                        backgroundColor: `${bulletColor(repo.language)}`,
                      }}
                    />
                    <span style={{ marginRight: "2rem" }}>{repo.language}</span>
                  </div>
                )}
                {repo.license && (
                  <span style={{ marginRight: "2rem" }}>
                    License: {repo.license.name}
                  </span>
                )}
                <span style={{ marginRight: "2rem" }}>
                  Updated: {convertDate(repo.pushed_at)}
                </span>
              </div>
            </IonText>
          </IonItem>
        ))}
      </IonList>
    </Page>
  );
};

export default Projects;
