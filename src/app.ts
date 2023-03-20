import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { applyConfig } from '@config';
import { expressMiddleware } from '@apollo/server/express4';
import { setupGraphql } from '@server/graphql';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { PORT } from '@config/variables';

export async function startServer() {
  console.log(
    `Starting server in mode: ${process.env.NODE_ENV || 'development'}`,
  );

  applyConfig();

  const app = express();

  const gqlServer = setupGraphql();
  const httpServer = http.createServer(app);
  gqlServer.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));
  await gqlServer.start();

  // Root route of express app
  app.get('/', (req, res) => {
    res.send('App started');
  });

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(gqlServer, {
      context: async ({ req }) => ({ token: req.header('authorization') }),
    }),
  );

  // Modified server startup
  await new Promise<void>(resolve =>
    httpServer.listen({ port: PORT }, resolve),
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
}


// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import schema from '@graphql/schema';

// export async function startServer() {
//     interface MyContext {
//         token?: String;
//       }
      
//       // Required logic for integrating with Express
//       const app = express();
//       // Our httpServer handles incoming requests to our Express app.
//       // Below, we tell Apollo Server to "drain" this httpServer,
//       // enabling our servers to shut down gracefully.
//       const httpServer = http.createServer(app);
      
//       // Same ApolloServer initialization as before, plus the drain plugin
//       // for our httpServer.
//       const server = new ApolloServer<MyContext>({
//         schema,
//         plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//       });
//       // Ensure we wait for our server to start
//       await server.start();
      
//       // Set up our Express middleware to handle CORS, body parsing,
//       // and our expressMiddleware function.
//       app.use(
//         '/',
//         cors<cors.CorsRequest>(),
//         bodyParser.json(),
//         // expressMiddleware accepts the same arguments:
//         // an Apollo Server instance and optional configuration options
//         expressMiddleware(server, {
//           context: async ({ req }) => ({ token: req.headers.token }),
//         }),
//       );
      
//       // Modified server startup
//       await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
//       console.log(`🚀 Server ready at http://localhost:4000/`);
//       return app;

//     // const app = express();
//     // const httpServer = http.createServer(app);

//     // apolloServer.plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
//     // await apolloServer.start();

//     // app.use(
//     //     '/',
//     //     cors<cors.CorsRequest>(),
//     //     bodyParser.json(),
//     //     // expressMiddleware accepts the same arguments:
//     //     // an Apollo Server instance and optional configuration options
//     //     expressMiddleware(apolloServer, {
//     //       context: async ({ req }) => ({ token: req.headers.token }),
//     //     }),
//     //   );
//     // // // parse application/x-www-form-urlencoded
//     // // app.use(bodyParser.urlencoded({ extended: false }));
//     // // // parse application/json
//     // // app.use(bodyParser.json())
//     // // app.use(morgan('dev'));
//     // // app.use(cors());

//     // return app;
// }
