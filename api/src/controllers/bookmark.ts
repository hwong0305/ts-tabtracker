import { getConnection } from 'typeorm';
import { Song } from '../entity/Song';
import { Bookmark } from '../entity/Bookmark';
import { User } from '../entity/User';

export default {
    addBookmark: async (userId: string, songId: number) => {
        try {
            const songRepository = await getConnection().getRepository(Song);
            const userRepository = await getConnection().getRepository(User);

            const song = await songRepository.findOne(songId);
            if (!song) {
                throw new Error('SongID is not valid');
            }
            const user = await userRepository.findOne(userId, {
                relations: ['bookmarks', 'bookmarks.songs'],
            });
            if (!user) {
                throw new Error('UserID is not valid');
            }

            const existingBookmarks = user.bookmarks.filter(userBookmark => {
                if (userBookmark.songs[0]) {
                    return userBookmark.songs[0].id === song.id;
                } else {
                    return null;
                }
            });

            if (existingBookmarks.length > 0) {
                throw new Error('Song is already bookmarked');
            }

            const bookmark = new Bookmark();
            bookmark.songs = [song];

            user.bookmarks = user.bookmarks.filter(userBookmark => userBookmark.songs.length > 0);

            user.bookmarks =
                user.bookmarks && user.bookmarks.length > 0
                    ? [...user.bookmarks, bookmark]
                    : [bookmark];

            await userRepository.save(user);

            return {
                bookmark,
                responseError: false,
            };
        } catch (err) {
            console.log(err);
            return {
                responseError: true,
            };
        }
    },
    fetchBookmarks: async () => {
        try {
            const bookmarkRepository = await getConnection().getRepository(Bookmark);
            const bookmarks = await bookmarkRepository.find({ relations: ['songs'] });
            return {
                bookmarks,
                responseError: false,
            };
        } catch (err) {
            console.log(err);
            return {
                responseError: true,
            };
        }
    },
    removeBookmark: async (userId: string, bookmarkId: number) => {
        try {
            const userRepository = await getConnection().getRepository(User);
            const bookmarkRepository = await getConnection().getRepository(Bookmark);
            const user = await userRepository.findOne(userId, { relations: ['bookmarks'] });
            if (!user) {
                throw new Error('UserID is Invalid');
            }
            const bookmark = await bookmarkRepository.findOne(bookmarkId, { relations: ['songs'] });
            if (!bookmark) {
                throw new Error('BookmarkId is invalid');
            }
            const prevBookmarkLength = user.bookmarks.length;
            user.bookmarks = user.bookmarks.filter(
                userBookmarks => userBookmarks.id !== bookmark.id
            );
            if (prevBookmarkLength === user.bookmarks.length) {
                throw new Error('Bookmark not found');
            }
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
