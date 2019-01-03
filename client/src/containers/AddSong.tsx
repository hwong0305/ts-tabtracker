import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LibraryAdd from '@material-ui/icons/LibraryAddOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { History } from 'history';
import { SongForm } from '../interfaces';

interface props extends WithStyles<typeof styles> {
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
        typography: {},
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
            marginTop: theme.spacing.unit * 3,
        },
    });

class AddSong extends React.Component<props, SongForm> {
    constructor(props: props) {
        super(props);

        this.state = {
            title: '',
            artist: '',
            album: '',
            albumImg: '',
            youtubeID: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        this.setState({
            ...this.state,
            [name]: value,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LibraryAdd />
                    </Avatar>
                    <Typography component="h1" variant="h6" className={classes.typography}>
                        Songs
                    </Typography>
                    <TextField
                        placeholder="Title"
                        className={classes.form}
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        placeholder="Artist"
                        className={classes.form}
                        name="artist"
                        value={this.state.artist}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        placeholder="Album"
                        className={classes.form}
                        name="album"
                        value={this.state.album}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        placeholder="Album Image"
                        className={classes.form}
                        name="albumImg"
                        value={this.state.albumImg}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        placeholder="Youtube ID"
                        className={classes.form}
                        name="youtubeID"
                        value={this.state.youtubeID}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.props.history.push('/')}
                    >
                        Add Song
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(AddSong);
