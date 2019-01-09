import song from '../controllers/song';
import verifyJwt from '../controllers/utilities/verifyJwt';
import gql from 'graphql-tag';

export const typeDefs = gql`
    type Song {
        id: Int
        title: String!
        artist: String!
        album: String!
        albumImg: String!
        youtubeID: String!
    }
    type SongResponse {
        song: Song
        responseError: Boolean
    }
`;

export const resolvers = {
    Query: {
        findSong: async (_: {}, args: { id: number }) => song.findSong(args.id),
        songs: async (_parent: {}, _args: {}) => song.getSongs(),
        filteredSong: async (_: {}, args: { [key: string]: string }) =>
            song.getFilteredSongs(args.title, args.artist, args.album),
    },
    Mutation: {
        createSong: async (_: {}, args: { [key: string]: string }, context: { token: string }) => {
            try {
                const response = await verifyJwt(context.token);
                if (!response) {
                    throw new Error('Invalid Token');
                }
                return song.create(
                    args.title,
                    args.album,
                    args.artist,
                    args.albumImg,
                    args.youtubeID
                );
            } catch (err) {
                console.log(err);
                return {
                    responseError: true,
                };
            }
        },
        removeSong: async (_: {}, args: { songId: number }, context: { token: string }) => {
            try {
                const response = await verifyJwt(context.token);
                if (!response) {
                    throw new Error('Invalid Token');
                }
                return song.deleteSong(args.songId);
            } catch (err) {
                console.log(err);
                return {
                    responseError: true,
                };
            }
        },
    },
};
