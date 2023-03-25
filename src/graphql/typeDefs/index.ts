import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import baseTypeDef from './base';
import modelsTypeDef from './models';
import inputsTypeDef from './inputs';
import queryTypeDef from './queries';
import mutationTypeDef from './mutations';

const typeDefs = [
  ...scalarTypeDefs,
  ...baseTypeDef,
  ...modelsTypeDef,
  ...inputsTypeDef,
  ...queryTypeDef,
  ...mutationTypeDef,
];

export default typeDefs;
