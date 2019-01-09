import * as React from 'react';
import { History } from 'history';
import { createStyles, Theme, WithStyles } from '@material-ui/core';
import { Query } from 'react-apollo';
import MyAppBar from '../components/AppBar';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../index';
import { FIND_USER } from '../queries/queries';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../components/TablePaginationActions';

const TablePaginationActionsWrapped: any = TablePaginationActions; // Typecast to allow Material-UI to accept.

interface Song {
    id: number;
    title: string;
    artist: string;
    album: string;
}

interface SongInterface {
    songs: Song[];
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

interface Props extends WithStyles<typeof styles> {
    history: History;
}

interface State {
    page: number;
    rowsPerPage: number;
}

class BookmarksPage extends React.Component<Props, State> {
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
    render() {
        const { classes } = this.props;
        return (
            <UserContext.Consumer>
                {context => {
                    if (context && context.state.loggedIn) {
                        return (
                            <div className="App">
                                <MyAppBar />
                                <header className="App-header">
                                    <Query
                                        query={FIND_USER}
                                        variables={{
                                            userId: context.state.userID,
                                        }}
                                        pollInterval={500}
                                    >
                                        {({ error, loading, data }) => {
                                            if (loading) {
                                                return <h1>Loading</h1>;
                                            }
                                            if (error) {
                                                return <h1>Error</h1>;
                                            }
                                            if (!data.user.user.bookmarks) {
                                                return (
                                                    <Paper className={classes.main}>
                                                        <Toolbar className={classes.toolbar}>
                                                            <Typography
                                                                className={classes.typography}
                                                                variant="h6"
                                                            >
                                                                Bookmarks
                                                            </Typography>
                                                        </Toolbar>
                                                        <Table className={classes.table}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Title</TableCell>
                                                                    <TableCell>Artist</TableCell>
                                                                    <TableCell>Album</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    <TableRow
                                                                        style={{
                                                                            height: 48 * 5,
                                                                        }}
                                                                    >
                                                                        <TableCell colSpan={3} />
                                                                    </TableRow>
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </Paper>
                                                );
                                            }
                                            const { rowsPerPage, page } = this.state;
                                            const emptyRows = data.bookmarks
                                                ? rowsPerPage -
                                                  Math.min(
                                                      rowsPerPage,
                                                      data.bookmarks.length - page * rowsPerPage
                                                  )
                                                : 0;
                                            return (
                                                <Paper className={classes.main}>
                                                    <Toolbar className={classes.toolbar}>
                                                        <Typography
                                                            className={classes.typography}
                                                            variant="h6"
                                                        >
                                                            Bookmarks
                                                        </Typography>
                                                    </Toolbar>
                                                    <Table className={classes.table}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Title</TableCell>
                                                                <TableCell>Artist</TableCell>
                                                                <TableCell>Album</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {data.user.user.bookmarks
                                                                .slice(
                                                                    page * rowsPerPage,
                                                                    page * rowsPerPage + rowsPerPage
                                                                )
                                                                .map((songItem: SongInterface) => (
                                                                    <TableRow
                                                                        key={songItem.songs[0].id}
                                                                        className={
                                                                            classes.tableRowHover
                                                                        }
                                                                        onClick={() =>
                                                                            this.props.history.push(
                                                                                `/song/${
                                                                                    songItem
                                                                                        .songs[0].id
                                                                                }`
                                                                            )
                                                                        }
                                                                    >
                                                                        <TableCell
                                                                            component="th"
                                                                            scope="song"
                                                                        >
                                                                            {
                                                                                songItem.songs[0]
                                                                                    .title
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                songItem.songs[0]
                                                                                    .artist
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {
                                                                                songItem.songs[0]
                                                                                    .album
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            {emptyRows > 0 && (
                                                                <TableRow
                                                                    style={{
                                                                        height: 48 * emptyRows,
                                                                    }}
                                                                >
                                                                    <TableCell colSpan={3} />
                                                                </TableRow>
                                                            )}
                                                        </TableBody>
                                                        <TableFooter>
                                                            <TableRow>
                                                                <TablePagination
                                                                    rowsPerPageOptions={[5]}
                                                                    colSpan={3}
                                                                    count={
                                                                        data.user.user.bookmarks
                                                                            .length
                                                                    }
                                                                    rowsPerPage={rowsPerPage}
                                                                    page={page}
                                                                    onChangePage={
                                                                        this.handlePageChange
                                                                    }
                                                                    ActionsComponent={
                                                                        TablePaginationActionsWrapped
                                                                    }
                                                                />
                                                            </TableRow>
                                                        </TableFooter>
                                                    </Table>
                                                </Paper>
                                            );
                                        }}
                                    </Query>
                                </header>
                            </div>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            </UserContext.Consumer>
        );
    }
}
export default withStyles(styles)(BookmarksPage);
