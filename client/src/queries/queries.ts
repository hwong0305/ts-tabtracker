import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                id
                firstName
                lastName
                email
            }
            token
            responseError
        }
    }
`;

export const REGISTER = gql`
    mutation register(
        $username: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $email: String!
    ) {
        register(
            username: $username
            password: $password
            firstName: $firstName
            lastName: $lastName
            email: $email
        ) {
            user {
                id
            }
            token
            responseError
        }
    }
`;

export const SONG_QUERY = gql`
    {
        songs {
            id
            title
            artist
            album
        }
    }
`;

export const ADD_SONG = gql`
    mutation createSong(
        $title: String!
        $artist: String!
        $album: String!
        $albumImg: String!
        $youtubeID: String!
    ) {
        createSong(
            title: $title
            artist: $artist
            album: $album
            albumImg: $albumImg
            youtubeID: $youtubeID
        ) {
            responseError
        }
    }
`;

export const SONG = gql`
    query song($id: Int) {
        findSong(id: $id) {
            song {
                artist
                title
                album
                albumImg
                youtubeID
            }
        }
    }
`;

export const BOOKMARK = gql`
    mutation addBookmark($userId: String!, $songId: Int!) {
        addBookmark(userId: $userId, songId: $songId) {
            responseError
        }
    }
`;

export const UNBOOKMARK = gql`
    mutation unbookmark($userId: String!, $bookmarkId: Int!) {
        removeBookmark(userId: $userId, bookmarkId: $bookmarkId) {
            responseError
        }
    }
`;

export const FIND_USER = gql`
    query findUser($userId: String, $username: String) {
        user(username: $username, userId: $userId) {
            user {
                id
                username
                bookmarks {
                    id
                    songs {
                        id
                        artist
                        title
                        album
                    }
                }
            }
        }
    }
`;

export const REMOVE_SONG = gql`
    mutation removeSong($songId: Int!) {
        removeSong(songId: $songId) {
            responseError
        }
    }
`;

export const ADD_HISTORY = gql`
    mutation addHistory($userId: String, $songId: Int) {
        addHistory(userId: $userId, songId: $songId) {
            responseError
        }
    }
`;
