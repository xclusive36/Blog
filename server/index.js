import { ApolloServer } from "@apollo/server"; // import ApolloServer class from apollo-server
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express, { json, urlencoded } from "express";
import { createServer } from "http";
import path from "path";
import { typeDefs, resolvers } from "./schemas/index.js"; // import typeDefs and resolvers from schemas/typeDefs.js
import { makeExecutableSchema } from "@graphql-tools/schema"; // import makeExecutableSchema function to be configured with the Apollo Server
import { authMiddleware } from "./utils/auth.js"; // import authMiddleware function to be configured with the Apollo Server

import db from "./config/connection.js"; // import db from config/connection.js

// Define a port to run the server on, default to 4000
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers }); // create a schema using makeExecutableSchema function and pass in typeDefs and resolvers

// Required logic for integrating with Express
const app = express();

app.use(urlencoded({ extended: false })); // add middleware to parse incoming JSON data
app.use(json()); // add middleware to parse incoming JSON data
app.use(
  cors(
    // add cors middleware to allow cross-origin requests
    {
      origin: ["http://localhost:5173", "https://litestep.com/"],
      credentials: true,
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

const __dirname = path.resolve();

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
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

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

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

// Log where we can go to test our GraphQL API
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
