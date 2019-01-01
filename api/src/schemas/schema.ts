import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs as UserTypeDefs, resolvers as UserResolvers } from './User';
import { merge } from 'lodash';

const resolvers = {};

export const schema = makeExecutableSchema({
    typeDefs: UserTypeDefs,
    resolvers: merge(resolvers, UserResolvers),
});
