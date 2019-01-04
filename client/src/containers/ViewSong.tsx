import * as React from 'react';
import { Query } from 'react-apollo';
import { SONG } from '../queries/queries';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import { History } from 'history';

import { UserContext } from '../index';

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
                        {context && context.state.loggedIn && (
                            <header className="App-header">
                                <h1>ID: {this.props.match.params.id}</h1>
                                <Query
                                    query={SONG}
                                    variables={{ id: Number(this.props.match.params.id) }}
                                >
                                    {({ loading, error, data }) => {
                                        if (loading) return <p>Loading...</p>;
                                        if (error) return <p>error...</p>;
                                        if (data.findSong.song) {
                                            return (
                                                <React.Fragment>
                                                    <h3>Title: {data.findSong.song.title}</h3>
                                                    <h3>Artist: {data.findSong.song.artist}</h3>
                                                    <h3>Album: {data.findSong.song.album}</h3>
                                                    <Button
                                                        variant="contained"
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
                        {context && !context.state.loggedIn && (
                            <header className="App-header">
                                <p>
                                    Please{' '}
                                    <Link className="App-link" to="/login">
                                        Log In
                                    </Link>
                                </p>
                            </header>
                        )}
                    </div>
                )}
            </UserContext.Consumer>
        );
    }
}

export default ViewSong;
