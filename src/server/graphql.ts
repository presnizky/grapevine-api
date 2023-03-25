import { ApolloServer } from '@apollo/server';
import { Application } from 'express';
import schema from '@graphql/schema';
interface VisrContext {
  token?: string;
}

export function setupGraphql() {
  const server = new ApolloServer<VisrContext>({
    schema,
  });

  return server;
}
