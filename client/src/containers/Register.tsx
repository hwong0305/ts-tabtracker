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

import { RegisterForm } from '../interfaces';

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
        cancel: {
            marginTop: theme.spacing.unit * 2,
        },
        error: {
            color: 'red',
        },
    });

class Register extends React.Component<Props, RegisterForm> {
    constructor(props: Props) {
        super(props);
        this.state = {
            formError: false,
            username: '',
            usernameError: '',
            password: '',
            passwordError: '',
            email: '',
            emailError: '',
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string; value: string } = event.currentTarget;
        this.setState({ ...this.state, [name]: value, [name + 'Error']: '' });
    };

    handleSubmit = () => {
        const { username, email, password, firstName, lastName } = this.state;
        if (
            username.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            firstName.length === 0 ||
            lastName.length === 0
        ) {
            // Check each field for what is empty
            if (username.length === 0) {
                this.setState({
                    usernameError: 'Username is required',
                });
                setTimeout(
                    () =>
                        this.setState({
                            usernameError: '',
                        }),
                    10000
                );
            }
            if (password.length === 0) {
                this.setState({
                    passwordError: 'Password is required',
                });
                setTimeout(
                    () =>
                        this.setState({
                            passwordError: '',
                        }),
                    10000
                );
            }
            if (firstName.length === 0) {
                this.setState({
                    firstNameError: 'First Name is required',
                });
                setTimeout(
                    () =>
                        this.setState({
                            firstNameError: '',
                        }),
                    10000
                );
            }
            if (lastName.length === 0) {
                this.setState({
                    lastNameError: 'Last Name is required',
                });
                setTimeout(
                    () =>
                        this.setState({
                            lastNameError: '',
                        }),
                    10000
                );
            }
            if (email.length === 0) {
                this.setState({
                    emailError: 'Email is required',
                });
                setTimeout(
                    () =>
                        this.setState({
                            emailError: '',
                        }),
                    10000
                );
            }
        } else {
            authenticationService
                .register({ username, email, password, firstName, lastName })
                .then(response => {
                    if (response !== 'error') {
                        localStorage.setItem('token', response.token);
                        this.props.history.push('/');
                    } else {
                        this.setState({
                            formError: true,
                        });
                        setTimeout(
                            () =>
                                this.setState({
                                    formError: false,
                                }),
                            10000
                        );
                    }
                })
                .catch(err => {
                    console.log('In Error');
                    console.log(err);
                });
        }
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
                    {this.state.formError ? (
                        <h6 className={classes.error}>Invalid Registration Information</h6>
                    ) : null}
                    <TextField
                        label="Username"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        error={this.state.usernameError ? true : false}
                        helperText={this.state.usernameError}
                        required
                        fullWidth
                    />
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        error={this.state.passwordError ? true : false}
                        helperText={this.state.passwordError}
                        required
                        fullWidth
                    />
                    <TextField
                        label="First Name"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        error={this.state.firstNameError ? true : false}
                        helperText={this.state.firstNameError}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        error={this.state.lastNameError ? true : false}
                        helperText={this.state.lastNameError}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        error={this.state.emailError ? true : false}
                        helperText={this.state.emailError}
                        required
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                        disabled={
                            this.state.usernameError ||
                            this.state.passwordError ||
                            this.state.emailError ||
                            this.state.firstNameError ||
                            this.state.lastNameError
                                ? true
                                : false
                        }
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.cancel}
                        onClick={() => this.props.history.goBack()}
                        fullWidth
                    >
                        Cancel
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Register);
