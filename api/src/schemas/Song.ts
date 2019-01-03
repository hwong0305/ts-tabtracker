import song from '../controllers/song';
export const typeDefs = `
    type Song {
        id: Int
        title: String!
        artist: String!
        album: String!
        albumImg: String!
    }
    type SongResponse {
        song: Song
        responseError: Boolean
    }
`;

export const resolvers = {
    Query: {
        songs: async () => await song.getSongs(),
        filteredSong: async (_: {}, args: { [key: string]: string }) =>
            await song.getFilteredSongs(args.title, args.artist, args.album),
    },
    Mutation: {
        createSong: async (_: {}, args: { [key: string]: string }) =>
            await song.create(args.title, args.album, args.artist, args.albumImg, args.youtubeID),
    },
};
