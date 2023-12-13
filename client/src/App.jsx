import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { BlogProvider } from "./context/blogContext";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SettingsProvider } from "./context/settingsContext";
import Auth from "./utils/auth";

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
import AccountPage from "./pages/Account.page";
import PrivacyPage from "./pages/Privacy.page";
import TermsPage from "./pages/Terms.page";

setupIonicReact();

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: `${
    location.hostname === "localhost"
      ? `http://localhost:4000`
      : location.protocol + "//" + location.hostname
  }/graphql`,
});

// get the authentication token from local storage if it exists
const token = localStorage.getItem("id_token");

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      token: token,
      user: token ? JSON.stringify(Auth.getProfile().data) : "",
    },
  };
});

// Create the Apollo client with authentication middleware and a cache
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            // Don't cache separate results based on
            // any of this field's arguments.
            // keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          books: {
            // Don't cache separate results based on
            // any of this field's arguments.
            // keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

const App = () => (
  <ApolloProvider client={client}>
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
              {/* Route /account loads the Account component */}
              <Route exact path="/account">
                <AccountPage />
              </Route>
              {/* Route /privacy loads the Privacy component */}
              <Route exact path="/privacy">
                <PrivacyPage />
              </Route>
              {/* Route /terms loads the Terms component */}
              <Route exact path="/terms">
                <TermsPage />
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
  </ApolloProvider>
);

export default App;
