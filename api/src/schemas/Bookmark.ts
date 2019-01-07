import bookmark from '../controllers/bookmark';
import gql from 'graphql-tag';

export const typeDefs = gql`
    type Bookmark {
        id: Int
        songs: [Song]
    }
    type BookmarkResponse {
        bookmark: Bookmark
        bookmarks: [Bookmark]
        responseError: Boolean!
    }
`;

export const resolvers = {
    Query: {
        bookmarks: async () => bookmark.fetchBookmarks(),
    },
    Mutation: {
        addBookmark: async (_parent: {}, args: any) =>
            bookmark.addBookmark(args.userId, args.songId),
        removeBookmark: async (_parent: {}, args: any) =>
            bookmark.removeBookmark(args.userId, args.bookmarkId),
    },
};
