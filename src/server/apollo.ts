import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '@graphql';

interface MyContext {
    token?: String;
  }

export const apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });