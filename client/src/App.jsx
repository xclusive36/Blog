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

/* Pages */
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import AppTOS from "./pages/AppTOS";
import AppPrivacy from "./pages/AppPrivacy";
import Blog from "./pages/Blog";

setupIonicReact();

const App = () => (
  <IonApp>
    {/* IonRouterOutlet is used to define the routes for the app */}
    <IonReactRouter>
      {/* BlogProvider is used to provide the blog context data to the app */}
      <BlogProvider>
        {/* IonRouterOutlet renders the pages based on the path */}
        <IonRouterOutlet>
          {/* Route / redirects to /home */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          {/* Route /home loads the Home component */}
          <Route exact path="/home">
            <Home />
          </Route>
          {/* Route /about loads the About component */}
          <Route exact path="/about">
            <About />
          </Route>
          {/* Route /projects loads the Projects component */}
          <Route exact path="/projects">
            <Projects />
          </Route>
          {/* Route /contact loads the Contact component */}
          <Route exact path="/contact">
            <Contact />
          </Route>
          {/* Route /resume loads the Resume component */}
          <Route exact path="/resume">
            <Resume />
          </Route>
          {/* Route //litestep-ios-app-privacy-policy loads the AppPrivacy component */}
          <Route exact path="/litestep-ios-app-privacy-policy">
            <AppPrivacy />
          </Route>
          {/* Route //litestep-ios-app-terms-of-use loads the AppTOS component */}
          <Route exact path="/litestep-ios-app-terms-of-use">
            <AppTOS />
          </Route>
          {/* Route /blog/:blogSlug loads the blog component with the variable as blogSlug */}
          <Route path="/blog/:blogSlug" exact={true}>
            <Blog />
          </Route>
          {/* wildcard, any non matching route gets redirected to /home */}
          <Route>
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </BlogProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
