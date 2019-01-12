import gql from 'graphql-tag';
import songHistory from '../controllers/songHIstory';

export const typeDefs = gql`
    type SongHistory {
        id: Int
        songs: [Song]
    }
`;

export const resolvers = {
    Mutation: {
        addHistory: async (
            _: {},
            args: {
                userId: string;
                songId: number;
            }
        ) => songHistory.addHistory(args.userId, args.songId),
        clearHistory: async (_: {}, args: { userId: string }) =>
            songHistory.clearHistory(args.userId),
    },
};
