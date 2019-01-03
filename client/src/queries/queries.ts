import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
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
