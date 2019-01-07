import { createStyles, Theme, Typography, WithStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ToolBar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import { History } from 'history';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import MyAppBar from '../components/AppBar';
import TablePaginationActions from '../components/TablePaginationActions';
import { SONG_QUERY } from '../queries/queries';

const TablePaginationActionsWrapped: any = TablePaginationActions; // Typecast to allow Material-UI to accept.

interface SongInterface {
    id: number;
    title: string;
    artist: string;
    album: string;
}

interface Props extends WithStyles<typeof styles> {
    history: History;
}

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
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
                cursor: 'grab',
            },
        },
        footerCell: {
            width: '100%',
        },
    });
const CreateSongLink: React.SFC<{}> = props => <Link to="/create/song" {...props} />;

interface State {
    page: number;
    rowsPerPage: number;
}

class Song extends React.Component<Props, State> {
    state = {
        page: 0,
        rowsPerPage: 5,
    };
    handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        if (event) {
            console.log(null);
        }
        this.setState({ page });
    };
    handleChangeRowsPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        this.setState({
            rowsPerPage: Number(value),
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <MyAppBar />
                <div className="App-header">
                    <Query query={SONG_QUERY}>
                        {({ error, loading, data }) => {
                            if (loading) {
                                return <h1>Loading</h1>;
                            }
                            if (error) {
                                return <h1>Error</h1>;
                            }
                            const { rowsPerPage, page } = this.state;
                            const emptyRows =
                                rowsPerPage -
                                Math.min(rowsPerPage, data.songs.length - page * rowsPerPage);
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
                                            {data.songs
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage + rowsPerPage
                                                )
                                                .map((songItem: SongInterface) => (
                                                    <TableRow
                                                        key={songItem.id}
                                                        className={classes.tableRowHover}
                                                        onClick={() =>
                                                            this.props.history.push(
                                                                `/song/${songItem.id}`
                                                            )
                                                        }
                                                    >
                                                        <TableCell component="th" scope="song">
                                                            {songItem.title}
                                                        </TableCell>
                                                        <TableCell>{songItem.artist}</TableCell>
                                                        <TableCell>{songItem.album}</TableCell>
                                                    </TableRow>
                                                ))}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 48 * emptyRows }}>
                                                    <TableCell colSpan={3} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10]}
                                                    colSpan={3}
                                                    count={data.songs.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onChangePage={this.handlePageChange}
                                                    onChangeRowsPerPage={this.handleChangeRowsPage}
                                                    ActionsComponent={TablePaginationActionsWrapped}
                                                />
                                            </TableRow>
                                        </TableFooter>
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
