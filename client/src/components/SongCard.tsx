import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import YouTube from 'react-youtube';
import { Mutation } from 'react-apollo';
import { REMOVE_SONG } from '../queries/queries';
import UserBookmark from './UserBookmark';
import { History } from 'history';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
    youtubeID: string;
    title: string;
    artist: string;
    album: string;
    songId: number;
    history: History;
    loggedIn: boolean;
    refetch: () => void;
}

const styles = () =>
    createStyles({
        card: {
            width: 640,
        },
        cardBody: {
            color: '#000',
        },
        cardFooter: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            marginLeft: '5px',
        },
    });

class SongCard extends React.Component<Props, {}> {
    render() {
        const { classes } = this.props;
        return (
            <Mutation mutation={REMOVE_SONG}>
                {(removeSong, { data }) => {
                    if (data && !data.removeSong.responseError) {
                        this.props.history.goBack();
                        this.props.refetch();
                    }
                    return (
                        <Card className={classes.card}>
                            <YouTube videoId={this.props.youtubeID} />
                            <CardContent className={classes.cardBody}>
                                <h3>{`${this.props.artist} - ${this.props.title} - ${
                                    this.props.album
                                }`}</h3>
                            </CardContent>
                            <CardActions className={classes.cardFooter}>
                                {this.props.loggedIn && (
                                    <React.Fragment>
                                        <UserBookmark songId={this.props.songId} />
                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                removeSong({
                                                    variables: {
                                                        songId: Number(this.props.songId),
                                                    },
                                                })
                                            }
                                            className={classes.button}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Delete
                                        </Button>
                                    </React.Fragment>
                                )}
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    onClick={() => this.props.history.goBack()}
                                >
                                    Go Back
                                </Button>
                            </CardActions>
                        </Card>
                    );
                }}
            </Mutation>
        );
    }
}

export default withStyles(styles)(SongCard);
