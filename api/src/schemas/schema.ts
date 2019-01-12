import { makeExecutableSchema } from 'graphql-tools';
import gql from 'graphql-tag';
import { typeDefs as BookmarkTypeDefs, resolvers as BookmarkResolvers } from './Bookmark';
import { typeDefs as SongTypeDefs, resolvers as SongResolvers } from './Song';
import { typeDefs as SongHistoryTypeDefs, resolvers as SongHistoryResolvers } from './SongHistory';
import { typeDefs as UserTypeDefs, resolvers as UserResolvers } from './User';
import { merge } from 'lodash';
import { Request } from 'express';

const typeDefs = gql`
    type Query {
        bookmarks: BookmarkResponse
        filteredSong(title: String, artist: String, album: String): [Song]
        findSong(id: Int): SongResponse
        songs: [Song]
        user(username: String, userId: String): UserResponse
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
        removeSong(songId: Int!): SongResponse
        addBookmark(userId: String!, songId: Int!): BookmarkResponse
        removeBookmark(userId: String!, bookmarkId: Int!): BookmarkResponse
        addHistory(userId: String, songId: Int): SongResponse
        clearHistory(userId: String): SongResponse
    }
`;

const resolvers = {};

export const context = ({ req }: { req: Request }) => {
    const token = req.headers.authorization || '';
    return { token };
};

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs, UserTypeDefs, SongTypeDefs, BookmarkTypeDefs, SongHistoryTypeDefs],
    resolvers: merge(
        resolvers,
        UserResolvers,
        SongResolvers,
        BookmarkResolvers,
        SongHistoryResolvers
    ),
});
