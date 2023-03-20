import 'graphql-import-node';

import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

import gqlResolvers from './resolvers';
import typeDefs from './typeDefs';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: gqlResolvers,
});

export default schema;
