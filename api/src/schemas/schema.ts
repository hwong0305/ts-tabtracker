import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';
import { typeDefs as BookmarkTypeDefs, resolvers as BookmarkResolvers } from './Bookmark';
import { typeDefs as SongTypeDefs, resolvers as SongResolvers } from './Song';
import { typeDefs as UserTypeDefs, resolvers as UserResolvers } from './User';
import { merge } from 'lodash';

const typeDefs = gql`
    type Query {
        bookmarks: BookmarkResponse
        filteredSong(title: String, artist: String, album: String): [Song]
        findSong(id: Int): SongResponse
        songs: [Song]
        user(username: String): User
        users: [User]
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
        addBookmark(userId: String!, songId: Int!): BookmarkResponse
        removeBookmark(userId: String!, bookmarkId: Int!): BookmarkResponse
    }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, UserTypeDefs, SongTypeDefs, BookmarkTypeDefs],
    resolvers: merge(resolvers, UserResolvers, SongResolvers, BookmarkResolvers),
});
