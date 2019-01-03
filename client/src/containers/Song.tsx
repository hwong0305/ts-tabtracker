import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Theme, WithStyles, createStyles, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ToolBar from '@material-ui/core/Toolbar';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import MyAppBar from '../components/AppBar';

interface SongInterface {
    id: number;
    title: string;
    artist: string;
    album: string;
}

const SONG_QUERY = gql`
    {
        songs {
            id
            title
            artist
            album
        }
    }
`;

const styles = (theme: Theme) =>
    createStyles({
        iconButton: {
            color: '#fff',
        },
        main: {
            display: 'flex',
            color: '#000',
            flexWrap: 'wrap',
        },
        table: {
            minWidth: '700px',
        },
        toolbar: {
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        },
        typography: {
            color: '#fff',
        },
    });
const CreateSongLink: React.SFC<{}> = props => <Link to="/create/song" {...props} />;

class Song extends React.Component<WithStyles<typeof styles>, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <MyAppBar />
                <div className="App-header">
                    <Query query={SONG_QUERY}>
                        {({ error, loading, data }) => {
                            if (loading) return <h1>Loading</h1>;
                            if (error) return <h1>Error</h1>;
                            return (
                                <Paper className={classes.main}>
                                    <ToolBar className={classes.toolbar}>
                                        <Typography className={classes.typography} variant="h6">
                                            Songs
                                        </Typography>
                                        <IconButton
                                            className={classes.iconButton}
                                            component={CreateSongLink}
                                        >
                                            <Add />
                                        </IconButton>
                                    </ToolBar>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Artist</TableCell>
                                                <TableCell>Album</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.songs.map((songItem: SongInterface) => (
                                                <TableRow key={songItem.id}>
                                                    <TableCell component="th" scope="song">
                                                        {songItem.title}
                                                    </TableCell>
                                                    <TableCell>{songItem.artist}</TableCell>
                                                    <TableCell>{songItem.album}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            );
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Song);
