import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { BlogProvider } from "./context/blogContext";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import AppTOS from "./pages/AppTOS";
import AppPrivacy from "./pages/AppPrivacy";
import Blog from "./pages/Blog";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <BlogProvider>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/resume">
            <Resume />
          </Route>
          <Route exact path="/litestep-ios-app-privacy-policy">
            <AppPrivacy />
          </Route>
          <Route exact path="/litestep-ios-app-terms-of-use">
            <AppTOS />
          </Route>
          <Route path="/blog/:blogSlug" exact={true}>
            <Blog />
          </Route>
        </IonRouterOutlet>
      </BlogProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
