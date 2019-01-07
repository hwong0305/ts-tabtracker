import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardLeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardRightArrow from '@material-ui/icons/KeyboardArrowRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { Theme, createStyles } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';

const data = [
    {
        desert: 'Frozen Yogurt',
        calories: 159,
        fat: 9,
        carbs: 24,
        protein: 4,
    },
    {
        desert: 'Ice Cream Sandwich',
        calories: 237,
        fat: 9,
        carbs: 37,
        protein: 4.3,
    },
    {
        desert: 'Eclair',
        calories: 262,
        fat: 16,
        carbs: 24,
        protein: 6,
    },
    {
        desert: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
    },
    {
        desert: 'Gingerbread',
        calories: 356,
        fat: 16,
        carbs: 49,
        protein: 3.9,
    },
    {
        desert: 'Tiramisu',
        calories: 470,
        fat: 27,
        carbs: 54,
        protein: 6,
    },
];

interface TableState {
    rowsPerPage: number;
    page: number;
    startIndex: number;
    endIndex: number;
}

const styles = (theme: Theme) =>
    createStyles({
        tableFooter: {
            textAlign: 'right',
            width: '100%',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
                cursor: 'grab',
            },
        },
    });

class MyTable extends React.Component<WithStyles<typeof styles>, TableState> {
    state: TableState = {
        rowsPerPage: 3,
        page: 1,
        startIndex: 0,
        endIndex: 3,
    };
    firstPage = () => {
        this.setState({
            page: 1,
            startIndex: 0,
            endIndex: this.state.rowsPerPage,
        });
    };
    previousPage = () => {
        this.setState({
            startIndex: this.state.startIndex - this.state.rowsPerPage,
            endIndex: this.state.endIndex - this.state.rowsPerPage,
            page: this.state.page - 1,
        });
    };
    nextPage = () => {
        this.setState({
            startIndex: this.state.startIndex + this.state.rowsPerPage,
            endIndex: this.state.endIndex + this.state.rowsPerPage,
            page: this.state.page + 1,
        });
    };
    lastPage = () => {
        this.setState({
            endIndex: data.length,
            page: Math.ceil(data.length / this.state.rowsPerPage),
            startIndex: data.length - this.state.rowsPerPage,
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        {Object.keys(data[0]).map(key => (
                            <TableCell>{key}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(this.state.startIndex, this.state.endIndex).map((item: any) => (
                        <TableRow className={classes.tableRowHover}>
                            <TableCell>{item.desert}</TableCell>
                            <TableCell>{item.calories}</TableCell>
                            <TableCell>{item.fat}</TableCell>
                            <TableCell>{item.carbs}</TableCell>
                            <TableCell>{item.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <div className={classes.tableFooter}>
                            <span>{`Page ${this.state.page}`}</span>
                            <IconButton
                                onClick={this.firstPage}
                                disabled={this.state.startIndex === 0}
                            >
                                <FirstPage />
                            </IconButton>
                            <IconButton
                                disabled={this.state.page === 1}
                                onClick={this.previousPage}
                            >
                                <KeyboardLeftArrow />
                            </IconButton>
                            <IconButton
                                disabled={this.state.endIndex === data.length}
                                onClick={this.nextPage}
                            >
                                <KeyboardRightArrow />
                            </IconButton>
                            <IconButton
                                onClick={this.lastPage}
                                disabled={this.state.endIndex === data.length}
                            >
                                <LastPage />
                            </IconButton>
                        </div>
                    </TableRow>
                </TableFooter>
            </Table>
        );
    }
}

export default withStyles(styles)(MyTable);
