import merge from 'lodash.merge';
import { resolvers as scalarResolvers } from 'graphql-scalars';

import queriesResolvers from './queries';
import mutationResolvers from './mutations';
import { IResolvers } from '@graphql-tools/utils';

const schemaResolvers: IResolvers = {
  Query: queriesResolvers,
  Mutation: mutationResolvers,
};

const gqlResolvers = merge(scalarResolvers, schemaResolvers);

export default gqlResolvers;
