import { ApolloServer } from "@apollo/server"; // import ApolloServer class from apollo-server
import cors from "cors"; // import cors middleware
import { expressMiddleware } from "@apollo/server/express4"; // import expressMiddleware function from apollo-server-express
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // import ApolloServerPluginDrainHttpServer plugin from apollo-server-plugin-drain-http-server
import express, { json, urlencoded } from "express"; // import express and json middleware
import { createServer } from "http"; // import createServer function from http module
import path from "path"; // import path module from Node.js
import { typeDefs, resolvers } from "./schemas/index.js"; // import typeDefs and resolvers from schemas/typeDefs.js
import { makeExecutableSchema } from "@graphql-tools/schema"; // import makeExecutableSchema function to be configured with the Apollo Server
import { authMiddleware } from "./utils/auth.js"; // import authMiddleware function to be configured with the Apollo Server
// import { rateLimitMiddleware } from "./utils/ratelimit.js"; // import rateLimitMiddleware function to be configured with the Apollo Server
import helmet from "helmet";
import compression from "compression";

import db from "./config/connection.js"; // import db from config/connection.js

// Define a port to run the server on, default to 4000
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers }); // create a schema using makeExecutableSchema function and pass in typeDefs and resolvers

// Required logic for integrating with Express
const app = express();

app.use(urlencoded({ extended: false })); // add middleware to parse incoming JSON data
app.use(json()); // add middleware to parse incoming JSON data
// app.use(rateLimitMiddleware()); // add rate limit middleware to Express app
app.use(compression()); // add compression middleware to Express app
process.env.NODE_ENV === "production" &&
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          connectSrc: [`'self'`, "sandbox.embed.apollographql.com", "ajax.cloudflare.com", "https://api.github.com", "https://api.unsplash.com"],
          imgSrc: [
            `'self'`,
            "data:",
            // "apollo-server-landing-page.cdn.apollographql.com",
            "*", // allow all sources to load images (not recommended)
          ],
          scriptSrc: [`'self'`, "ajax.cloudflare.com"],
          manifestSrc: [
            `'self'`,
            "apollo-server-landing-page.cdn.apollographql.com",
          ],
          frameSrc: [`'self'`, "sandbox.embed.apollographql.com"],
        },
      },
    })
  ); // add helmet middleware to Express app

app.use(
  cors(
    // add cors middleware to allow cross-origin requests
    {
      origin: ["http://localhost:5173", "https://litestep.com/"], // define origin property to allow requests from this origin
      credentials: true, // allow passing of cookies
    }
  )
);

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  // create a new Apollo Server instance and pass in our schema data, context, and plugins
  schema, // add schema
  // typeDefs, // add typeDefs
  // resolvers, // add resolvers
  context: authMiddleware, // apply authMiddleware function to the server as the context
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

const __dirname = path.resolve(); // define __dirname using path.resolve()

// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
// Ensure we wait for our server to start
await server.start();

// Serve the client's production build
if (process.env.NODE_ENV === "production") {
  // Serve any static files from the client build directory (client/dist)
  // import.meta.url is the current file path
  app.use(
    express.static(
      path.join(new URL("../client/dist", import.meta.url).pathname)
    )
  );
}

// Define any API routes before this runs
// route to serve up the index.html page in client/dist directory
app.get("/", (req, res) => {
  res.sendFile(
    path.join(new URL("../client/dist/index.html", import.meta.url).pathname)
  );
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(new URL("../client/dist/index.html", import.meta.url).pathname)
  );
});

// app.get("/api/blog/post", rateLimitMiddleware(true), (req, res) => {
//   res.send({
//     success: true,
//     author: "Mike Abdul",
//     "title": "Creating NodeJs Rate Limiter",
//     "post": "..."
//   });
// });

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.token || "",
      user: req.headers.user || "",
    }),
  })
);

db.once("open", () => {
  // start the Apollo Server
  // callback function required, will not run without it
});

// last app.use calls right before app.listen(): custom 404 and error handler

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

// Log where we can go to test our GraphQL API
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
