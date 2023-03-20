import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import baseTypeDef from './base';
import modelsTypeDef from './models';
import queryTypeDef from './queries';

const typeDefs = [
  ...scalarTypeDefs,
  ...baseTypeDef,
  ...modelsTypeDef,
  ...queryTypeDef,
];

export default typeDefs;
