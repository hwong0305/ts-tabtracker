import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Theme, WithStyles, createStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            display: 'flex',
            color: '#000',
            padding: theme.spacing.unit * 3,
        },
        table: {
            minWidth: '700px',
        },
    });

class Song extends React.Component<WithStyles<typeof styles>, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <div className="App-header">
                    <Paper className={classes.main}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Artist</TableCell>
                                    <TableCell>Album</TableCell>
                                </TableRow>
                                <TableBody>Placeholder here</TableBody>
                            </TableHead>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Song);
