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
