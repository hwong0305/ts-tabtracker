import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import YouTube from 'react-youtube';

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
            <Card className={classes.card}>
                <YouTube videoId={this.props.youtubeID} />
                <CardContent className={classes.cardBody}>
                    <h3>{`${this.props.artist} - ${this.props.title} - ${this.props.album}`}</h3>
                </CardContent>
                <CardActionArea className={classes.cardFooter}>
                    <CardActions>
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
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles)(SongCard);
