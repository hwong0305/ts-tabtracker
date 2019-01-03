import { Song } from '../entity/Song';
import { getConnection } from 'typeorm';
import { validate } from 'class-validator';

export default {
    async create(
        title: string,
        album: string,
        artist: string,
        albumImg: string,
        youtubeID: string
    ) {
        try {
            const song = new Song();
            song.title = title;
            song.artist = artist;
            song.album = album;
            song.albumImg = albumImg;
            song.youtubeID = youtubeID;

            const error = await validate(song);

            if (error.length > 0) {
                return {
                    responseError: true,
                };
            }

            await getConnection()
                .getRepository(Song)
                .save(song);

            return { song, responseError: false };
        } catch (err) {
            return { responseError: true };
        }
    },

    async getSongs() {
        try {
            const songRepository = await getConnection().getRepository(Song);
            return songRepository.find();
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getFilteredSongs(title?: string, artist?: string, album?: string) {
        try {
            const songRepository = await getConnection().getRepository(Song);
            if (title && artist && album) {
                return songRepository.find({
                    title,
                    artist,
                    album,
                });
            } else if (title && artist) {
                return songRepository.find({
                    title,
                    artist,
                });
            } else if (title) {
                return songRepository.find({
                    title,
                });
            } else if (title && album) {
                return songRepository.find({
                    title,
                    album,
                });
            } else if (artist && album) {
                return songRepository.find({
                    artist,
                    album,
                });
            } else if (artist) {
                return songRepository.find({ artist });
            } else {
                return songRepository.find({ album });
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },
};
