import * as React from 'react';
import { Query } from 'react-apollo';
import { SONG } from '../queries/queries';

interface Props {
    match: {
        params: {
            id: number;
        };
    };
}

class ViewSong extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>ID: {this.props.match.params.id}</h1>
                    <Query query={SONG} variables={{ id: Number(this.props.match.params.id) }}>
                        {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>error...</p>;
                            return (
                                <React.Fragment>
                                    <h3>Title: {data.findSong.song.title}</h3>
                                    <h3>Artist: {data.findSong.song.artist}</h3>
                                    <h3>Album: {data.findSong.song.album}</h3>
                                </React.Fragment>
                            );
                        }}
                    </Query>
                </header>
            </div>
        );
    }
}

export default ViewSong;
