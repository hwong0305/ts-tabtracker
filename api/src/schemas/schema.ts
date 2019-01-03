import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';
import { typeDefs as UserTypeDefs, resolvers as UserResolvers } from './User';
import { typeDefs as SongTypeDefs, resolvers as SongResolvers } from './Song';
import { merge } from 'lodash';

const typeDefs = gql`
    type Query {
        user(username: String): User
        users: [User]
        filteredSong(title: String, artist: String, album: String): [Song]
        songs: [Song]
    }
    type Mutation {
        register(
            username: String!
            password: String!
            email: String!
            firstName: String!
            lastName: String!
        ): UserResponse
        login(username: String!, password: String!): LoginResponse
        createSong(
            title: String!
            artist: String!
            album: String!
            albumImg: String!
            youtubeID: String!
        ): SongResponse
    }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, UserTypeDefs, SongTypeDefs],
    resolvers: merge(resolvers, UserResolvers, SongResolvers),
});
