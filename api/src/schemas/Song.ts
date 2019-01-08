import song from '../controllers/song';
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
        createSong: async (_: {}, args: { [key: string]: string }) =>
            song.create(args.title, args.album, args.artist, args.albumImg, args.youtubeID),
        removeSong: async (_: {}, args: { songId: number }) => song.deleteSong(args.songId),
    },
};
