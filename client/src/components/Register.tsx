import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';
import authenticationService from '../services/authenticationService';
import { Theme, CssBaseline } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import createStyles from '@material-ui/core/styles/createStyles';
import Button from '@material-ui/core/Button';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { History } from 'history';

import { User } from '../interfaces';

interface Props extends WithStyles<typeof styles> {
    history: History;
}

const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: 'auto',
            display: 'block', // Fix IE 11 issue.
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing.unit * 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit *
                3}px`,
        },
        avatar: {
            margin: theme.spacing.unit,
            backgroundColor: theme.palette.secondary.main,
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
        },
    });

class Register extends React.Component<Props, User> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string; value: string } = event.currentTarget;
        this.setState({ ...this.state, [name]: value });
    };

    handleSubmit = () => {
        const { username, email, password, firstName, lastName } = this.state;
        authenticationService
            .register({ username, email, password, firstName, lastName })
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log('In Error');
                console.log(err);
            });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <TextField
                        label="Username"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        fullWidth
                    />
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        fullWidth
                    />
                    <TextField
                        label="First Name"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                        fullWidth
                    >
                        Submit
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Register);
