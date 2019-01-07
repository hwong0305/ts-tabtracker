import Button from '@material-ui/core/Button';
import { History } from 'history';
import * as React from 'react';
import Youtube from 'react-youtube';
import { Query } from 'react-apollo';
import MyAppBar from '../components/AppBar';
import UserBookmark from '../components/UserBookmark';
import { UserContext } from '../index';
import { SONG } from '../queries/queries';
import '../styles/view.css';

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
                                    {({ loading, error, data }) => {
                                        if (loading) {
                                            return <p>Loading...</p>;
                                        }
                                        if (error) {
                                            return <p>error...</p>;
                                        }
                                        if (data.findSong.song) {
                                            return (
                                                <React.Fragment>
                                                    <img
                                                        id="albumImg"
                                                        src={data.findSong.song.albumImg}
                                                    />
                                                    <Youtube
                                                        videoId={data.findSong.song.youtubeID}
                                                    />
                                                    <h3>Title: {data.findSong.song.title}</h3>
                                                    <h3>Artist: {data.findSong.song.artist}</h3>
                                                    <h3>Album: {data.findSong.song.album}</h3>
                                                    {context.state.loggedIn && (
                                                        <UserBookmark
                                                            songId={this.props.match.params.id}
                                                        />
                                                    )}
                                                    <Button
                                                        className="view-button"
                                                        variant="contained"
                                                        id="backButton"
                                                        onClick={() => this.props.history.goBack()}
                                                    >
                                                        Go Back
                                                    </Button>
                                                </React.Fragment>
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
