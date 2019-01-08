import bookmark from '../controllers/bookmark';
import verifyJwt from '../controllers/utilities/verifyJwt';
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
        addBookmark: async (_parent: {}, args: any, context: any) => {
            const response = await verifyJwt(context.token);
            if (response) {
                return bookmark.addBookmark(args.userId, args.songId);
            } else {
                return {
                    responseError: true,
                };
            }
        },
        removeBookmark: async (_parent: {}, args: any) =>
            bookmark.removeBookmark(args.userId, args.bookmarkId),
    },
};
