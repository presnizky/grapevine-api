import baseTypeDef from './base';
import modelsTypeDef from './models';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

const typeDefs = [
    ...scalarTypeDefs,
    ...baseTypeDef,
    ...modelsTypeDef
];

export default typeDefs;