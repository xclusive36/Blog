import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { BlogProvider } from "./context/blogContext";

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

/* Pages */
import HomePage from "./pages/Home.page";
import AboutPage from "./pages/About.page";
import ProjectsPage from "./pages/Projects.page";
import ContactPage from "./pages/Contact.page";
import ResumePage from "./pages/Resume.page";
import AppTOSPage from "./pages/AppTOS.page";
import AppPrivacyPage from "./pages/AppPrivacy.page";
import BlogPage from "./pages/Blog.page";
import { SettingsProvider } from "./context/settingsContext";

setupIonicReact();

const App = () => (
  <IonApp>
    {/* IonRouterOutlet is used to define the routes for the app */}
    <IonReactRouter>
      {/* BlogProvider is used to provide the blog context data to the app */}
      <BlogProvider>
        {/* SettingsProvider is used to provide the settings context data to the app */}
        <SettingsProvider>
          {/* IonRouterOutlet renders the pages based on the path */}
          <IonRouterOutlet>
            {/* Route / redirects to /home */}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/* Route /home loads the Home component */}
            <Route exact path="/home">
              <HomePage />
            </Route>
            {/* Route /about loads the About component */}
            <Route exact path="/about">
              <AboutPage />
            </Route>
            {/* Route /projects loads the Projects component */}
            <Route exact path="/projects">
              <ProjectsPage />
            </Route>
            {/* Route /contact loads the Contact component */}
            <Route exact path="/contact">
              <ContactPage />
            </Route>
            {/* Route /resume loads the Resume component */}
            <Route exact path="/resume">
              <ResumePage />
            </Route>
            {/* Route //litestep-ios-app-privacy-policy loads the AppPrivacy component */}
            <Route exact path="/litestep-ios-app-privacy-policy">
              <AppPrivacyPage />
            </Route>
            {/* Route //litestep-ios-app-terms-of-use loads the AppTOS component */}
            <Route exact path="/litestep-ios-app-terms-of-use">
              <AppTOSPage />
            </Route>
            {/* Route /blog/:blogSlug loads the blog component with the variable as blogSlug */}
            <Route path="/blog/:blogSlug" exact={true}>
              <BlogPage />
            </Route>
            {/* wildcard, any non matching route gets redirected to /home */}
            <Route>
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </SettingsProvider>
      </BlogProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
