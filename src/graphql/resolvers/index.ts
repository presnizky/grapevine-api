import merge from 'lodash.merge';
import { resolvers as scalarResolvers } from 'graphql-scalars';

import queriesResolvers from './queries';
import mutationResolvers from './mutations';
import { IResolvers } from '@graphql-tools/utils';

const query = {};
Object.keys(queriesResolvers).forEach(key => {
  query[key] = queriesResolvers[key];
});

const mutation = {};
Object.keys(mutationResolvers).forEach(key => {
  mutation[key] = mutationResolvers[key];
});

const schemaResolvers: IResolvers = {
  Query: query,
  Mutation: mutation,
};

const gqlResolvers = merge(scalarResolvers, schemaResolvers);

export default gqlResolvers;
