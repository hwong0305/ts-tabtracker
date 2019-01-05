import * as express from 'express';
import bookmark from './controllers/bookmark';

const Router = express.Router();

Router.get('/', (_, res) => {
    res.send({ message: 'Welcome to the beginning of nothingless' });
});

Router.get('/bookmarks', async (_, res) => {
    try {
        const response = await bookmark.fetchBookmarks();
        res.json(response);
    } catch (err) {
        res.status(500).send({
            err,
        });
    }
});

Router.post('/bookmarks', async (req, res) => {
    try {
        const { userId, songId } = req.body;
        const response = await bookmark.addBookmark(userId, songId);
        res.json(response);
    } catch (err) {
        res.status(500).send({
            err,
        });
    }
});

Router.post('/delete/bookmark', async (req, res) => {
    try {
        const { bookmarkId } = req.body;
        const response = await bookmark.removeBookmark(bookmarkId);
        res.json(response);
    } catch (err) {
        res.status(500).send({
            err,
        });
    }
});

export default Router;
