import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
} from "@ionic/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Octokit } from "octokit";

import "./Projects.css";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import Social from "../components/Social";

const Projects: React.FC = () => {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });
  console.log(import.meta.env.VITE_GITHUB_TOKEN);

  const getRepos = async () => {
    await octokit
      .request("GET /users/xclusive36/repos", {
        username: "xclusive36",
        sort: "pushed",
        // owner: "github",
        // per_page: 2,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setRepos(response.data);
      });
  };

  useEffect(() => {
    getRepos();
  }, []);

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    full_name: string;
    created_at: string;
    pushed_at: string;
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Social />
        <h1 className="about-title" style={{ textAlign: "center" }}>
          Github Repos
        </h1>
        <div className="portfolio-repos">
          {isLoading && (
            <IonLoading
              isOpen={isLoading}
              message={"Loading..."}
            />
          )}
          {repos.map((repo: Repo) => (
            <IonCard key={repo.id}>
              <IonCardContent>
                <IonText color="dark ion-text-center">
                  <h2 style={{ fontWeight: 500, fontSize: "1.2rem" }}>
                    {repo.name}
                  </h2>
                  <p>{repo.description}</p>
                  <p style={{ fontSize: "0.8rem" }}>
                    Created at: {convertDate(repo.created_at)}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    Last Pushed: {convertDate(repo.pushed_at)}
                  </p>
                  <IonButton
                    expand="block"
                    href={repo.html_url}
                    target="_blank"
                  >
                    View Repo
                  </IonButton>
                </IonText>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Projects;
