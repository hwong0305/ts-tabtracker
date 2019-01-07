import { History } from 'history';
import * as React from 'react';
import { Query } from 'react-apollo';
import MyAppBar from '../components/AppBar';
import { UserContext } from '../index';
import { SONG } from '../queries/queries';
import '../styles/view.css';

import SongCard from '../components/SongCard';

interface Props {
    history: History;
    match: {
        params: {
            id: number;
        };
    };
}

class ViewSong extends React.Component<Props, {}> {
    render() {
        return (
            <UserContext.Consumer>
                {context => (
                    <div>
                        <MyAppBar />
                        {context && (
                            <header className="App-header">
                                <Query
                                    query={SONG}
                                    variables={{ id: Number(this.props.match.params.id) }}
                                >
                                    {({ loading, error, data, refetch }) => {
                                        if (loading) {
                                            return <p>Loading...</p>;
                                        }
                                        if (error) {
                                            return <p>error...</p>;
                                        }
                                        if (data.findSong.song) {
                                            return (
                                                <SongCard
                                                    songId={this.props.match.params.id}
                                                    youtubeID={data.findSong.song.youtubeID}
                                                    title={data.findSong.song.title}
                                                    artist={data.findSong.song.artist}
                                                    album={data.findSong.song.album}
                                                    history={this.props.history}
                                                    loggedIn={context.state.loggedIn}
                                                    refetch={refetch}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    }}
                                </Query>
                            </header>
                        )}
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}

export default ViewSong;
