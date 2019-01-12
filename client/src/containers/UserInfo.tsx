import * as React from 'react';
import { Redirect } from 'react-router-dom';
import MyAppBar from '../components/AppBar';
import AlbumCard from '../components/AlbumCard';
import { Query } from 'react-apollo';
import { FIND_USER } from '../queries/queries';
import './styles/UserInfo.css';

import { UserContext } from '../index';

interface SongInterface {
    id: number;
    title: string;
    artist: string;
    album: string;
    albumImg: string;
}

class UserInfo extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {context => {
                    if (context && context.state.loggedIn) {
                        return (
                            <div className="App">
                                <MyAppBar />
                                <div className="App-header">
                                    <Query
                                        query={FIND_USER}
                                        variables={{ userId: context.state.userID }}
                                        pollInterval={500}
                                    >
                                        {({ loading, error, data }) => {
                                            if (loading) {
                                                return <h1>Loading...</h1>;
                                            }
                                            if (error) {
                                                return <h1>Erroor...</h1>;
                                            }
                                            if (data.user.user.history) {
                                                return (
                                                    <div className="container">
                                                        {data.user.user.history.songs.map(
                                                            (song: SongInterface) => (
                                                                <AlbumCard
                                                                    key={song.id}
                                                                    albumImg={song.albumImg}
                                                                    title={song.title}
                                                                    album={song.album}
                                                                    artist={song.artist}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    </Query>
                                </div>
                            </div>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            </UserContext.Consumer>
        );
    }
}

export default UserInfo;
