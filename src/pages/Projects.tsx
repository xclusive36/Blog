import { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonLoading,
  IonText,
} from "@ionic/react";

import Page from "../components/Page";

import "./Projects.css";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  full_name: string;
  created_at: string;
  pushed_at: string;
}

const Projects: React.FC = () => {
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
  }),
    [repos];

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  return (
    <Page>
      <h1 className="about-title" style={{ textAlign: "center" }}>
        Github Repos
      </h1>
      <div className="portfolio-repos">
        {isLoading && <IonLoading isOpen={isLoading} message={"Loading..."} />}
        {repos.map((repo: Repo) => (
          <IonCard key={repo.id} href={repo.html_url} target="_blank">
            <IonCardContent>
              <IonText color="dark ion-text-center">
                <h2 style={{ fontWeight: 500, fontSize: "1.2rem" }}>
                  {repo.name}
                </h2>
                {repo.description && <p>{repo.description}</p>}
                <p style={{ fontSize: "0.8rem" }}>
                  Created at: {convertDate(repo.created_at)}
                  <br />
                  Last Pushed: {convertDate(repo.pushed_at)}
                </p>
                <IonButton fill="clear" expand="block">
                  View Repo
                </IonButton>
              </IonText>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </Page>
  );
};

export default Projects;
