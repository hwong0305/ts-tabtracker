import { createStyles, Theme, WithStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LibraryAdd from '@material-ui/icons/LibraryAddOutlined';
import { History } from 'history';
import * as React from 'react';
import { Mutation, MutationFn, OperationVariables } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../index';
import { SongForm } from '../interfaces';
import { ADD_SONG, SONG_QUERY } from '../queries/queries';

interface Props extends WithStyles<typeof styles> {
    history: History;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '100vh',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        avatar: {
            backgroundColor: theme.palette.secondary.main,
            marginBottom: theme.spacing.unit,
            textAlign: 'center',
        },
        button: {
            marginTop: theme.spacing.unit * 3,
        },
        paper: {
            width: '400px',
            padding: theme.spacing.unit * 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        },
        form: {
            marginTop: theme.spacing.unit,
        },
        error: {
            color: 'red',
        },
        cancel: {
            marginTop: theme.spacing.unit,
        },
    });

class AddSong extends React.Component<Props, SongForm> {
    constructor(props: Props) {
        super(props);

        this.state = {
            title: '',
            titleError: false,
            artist: '',
            artistError: false,
            album: '',
            albumError: false,
            albumImg: '',
            albumImgError: false,
            youtubeID: '',
            youtubeIDError: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name]: value,
            [name + 'Error']: false,
        });
    };
    handleSubmit = (addSong: MutationFn<any, OperationVariables>) => {
        if (
            this.state.title.length === 0 ||
            this.state.artist.length === 0 ||
            this.state.album.length === 0 ||
            this.state.albumImg.length === 0 ||
            this.state.youtubeID.length === 0
        ) {
            this.setState({
                titleError: this.state.title.length === 0,
                artistError: this.state.artist.length === 0,
                albumError: this.state.album.length === 0,
                albumImgError: this.state.albumImg.length === 0,
                youtubeIDError: this.state.youtubeID.length === 0,
            });
            setTimeout(
                () =>
                    this.setState({
                        titleError: false,
                        artistError: false,
                        albumError: false,
                        albumImgError: false,
                        youtubeIDError: false,
                    }),
                10000
            );
        } else {
            addSong({
                variables: {
                    title: this.state.title,
                    artist: this.state.artist,
                    album: this.state.album,
                    albumImg: this.state.albumImg,
                    youtubeID: this.state.youtubeID,
                },
            });
        }
    };
    render() {
        const { classes } = this.props;
        return (
            <UserContext.Consumer>
                {context => (
                    <Mutation
                        mutation={ADD_SONG}
                        update={(cache, { data }) => {
                            const songQuery: { songs: any } | null = cache.readQuery({
                                query: SONG_QUERY,
                            });
                            const songs = songQuery && songQuery.songs;
                            cache.writeQuery({
                                query: SONG_QUERY,
                                data: { songs: songs.concat([data.createSong]) },
                            });
                        }}
                    >
                        {(createSong, { data }) => (
                            <div className={classes.root}>
                                {context && !context.state.loggedIn && <Redirect to="/login" />}
                                {context && context.state.loggedIn && (
                                    <Paper className={classes.paper}>
                                        <Avatar className={classes.avatar}>
                                            <LibraryAdd />
                                        </Avatar>
                                        <Typography component="h1" variant="h6">
                                            Songs
                                        </Typography>
                                        {data && data.createSong.responseError && (
                                            <h6 className={classes.error}>
                                                Please fill in all fields
                                            </h6>
                                        )}
                                        <TextField
                                            label="Title"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            error={this.state.titleError}
                                            helperText={
                                                this.state.titleError && 'Please enter a Title'
                                            }
                                            fullWidth={true}
                                            required={true}
                                        />
                                        <TextField
                                            label="Artist"
                                            name="artist"
                                            value={this.state.artist}
                                            onChange={this.handleChange}
                                            error={this.state.artistError}
                                            helperText={
                                                this.state.artistError && 'Please enter an Artist'
                                            }
                                            fullWidth={true}
                                            required={true}
                                        />
                                        <TextField
                                            label="Album"
                                            name="album"
                                            value={this.state.album}
                                            onChange={this.handleChange}
                                            error={this.state.albumError}
                                            helperText={
                                                this.state.albumError && 'Please enter an Album'
                                            }
                                            fullWidth={true}
                                            required={true}
                                        />
                                        <TextField
                                            label="Album Image"
                                            name="albumImg"
                                            value={this.state.albumImg}
                                            onChange={this.handleChange}
                                            error={this.state.albumImgError}
                                            helperText={
                                                this.state.albumImgError &&
                                                'Please enter an Album Image URL'
                                            }
                                            fullWidth={true}
                                            required={true}
                                        />
                                        <TextField
                                            label="Youtube ID"
                                            name="youtubeID"
                                            value={this.state.youtubeID}
                                            onChange={this.handleChange}
                                            error={this.state.youtubeIDError}
                                            helperText={
                                                this.state.youtubeIDError &&
                                                'Please enter a Youtube Video ID'
                                            }
                                            fullWidth={true}
                                            required={true}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() => this.handleSubmit(createSong)}
                                        >
                                            Add Song
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.cancel}
                                            onClick={() => this.props.history.goBack()}
                                        >
                                            Cancel
                                        </Button>
                                    </Paper>
                                )}
                                {data &&
                                    !data.createSong.responseError &&
                                    (() => this.props.history.push('/'))()}
                            </div>
                        )}
                    </Mutation>
                )}
            </UserContext.Consumer>
        );
    }
}

export default withStyles(styles)(AddSong);
