import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { Song } from '../entity/Song';
import { SongHistory } from '../entity/SongHistory';

export default {
    addHistory: async (userId: string, songId: number) => {
        try {
            const userRepository = await getConnection().getRepository(User);
            const songRepository = await getConnection().getRepository(Song);
            const historyRepository = await getConnection().getRepository(SongHistory);

            const user = await userRepository.findOne(userId, {
                relations: ['history', 'history.songs'],
            });

            if (!user) {
                throw new Error('Invalid User ID');
            }

            const song = await songRepository.findOne(songId);
            if (!song) {
                throw new Error('Invalid Song ID');
            }

            if (user.history) {
                user.history.songs =
                    user.history.songs.length > 0 ? [...user.history.songs, song] : [song];
                await historyRepository.save(user.history);
                await userRepository.save(user);
                await songRepository.save(song);
            } else {
                const history = new SongHistory();
                history.songs = [song];
                user.history = history;
                await historyRepository.save(history);
                await userRepository.save(user);
                await songRepository.save(song);
            }

            return {
                responseError: false,
            };
        } catch (err) {
            console.log(err);
            return {
                responseError: true,
            };
        }
    },
    clearHistory: async (userId: string) => {
        try {
            const userRepository = await getConnection().getRepository(User);
            const historyRepository = await getConnection().getRepository(SongHistory);

            const user = await userRepository.findOne(userId, {
                relations: ['history', 'history.songs'],
            });
            if (!user) {
                throw new Error('User ID is invalid"');
            }

            const history = user.history;
            history.songs = [];

            user.history = history;

            await historyRepository.save(history);
            await userRepository.save(user);

            return {
                responseError: false,
            };
        } catch (err) {
            console.log(err);
            return {
                responseError: true,
            };
        }
    },
};
