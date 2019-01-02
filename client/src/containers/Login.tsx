import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';
import { CssBaseline, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { LoginForm } from '../interfaces';
import { History } from 'history';

import authenticationService from '../services/authenticationService';

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                firstName
                lastName
                email
            }
            token
        }
    }
`;

interface Props extends WithStyles<typeof styles> {
    history: History;
}

const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: 'auto',
            display: 'block',
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
            backgroundColor: '#00FFFF',
        },
        submit: {
            marginTop: theme.spacing.unit * 3,
            backgroundColor: '#5baaff',
        },
        cancel: {
            marginTop: theme.spacing.unit * 2,
        },
        error: {
            color: 'Red',
        },
    });

class Login extends React.PureComponent<Props, LoginForm> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            formError: false,
            usernameError: '',
            passwordError: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value, [name + 'Error']: '' });
    };
    handleSubmit = () => {
        const { username, password } = this.state;
        if (username.length !== 0 && password.length !== 0) {
            authenticationService
                .login({ username, password })
                .then(response => {
                    if (response !== 'error') {
                        localStorage.setItem('token', response.token);
                        this.props.history.push('/');
                    } else {
                        this.setState({ formError: true });
                        setTimeout(() => this.setState({ formError: false }), 10000);
                    }
                })
                .catch(err => console.log(err));
        } else {
            if (username.length === 0) this.setState({ usernameError: 'Username is required' });
            if (password.length === 0) this.setState({ passwordError: 'Password is required' });
            setTimeout(
                () =>
                    this.setState({
                        usernameError: '',
                        passwordError: '',
                    }),
                10000
            );
        }
    };
    render() {
        const { classes } = this.props;
        return (
            <Mutation mutation={LOGIN}>
                {(login, { data }) => (
                    <div className={classes.main}>
                        <CssBaseline />
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            {this.state.formError ? (
                                <h6 className={classes.error}>Invalid Login Crediential</h6>
                            ) : null}
                            <form>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    helperText={this.state.usernameError}
                                    error={this.state.usernameError ? true : false}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    helperText={this.state.passwordError}
                                    error={this.state.passwordError ? true : false}
                                    required
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.handleSubmit}
                                    disabled={
                                        this.state.usernameError || this.state.passwordError
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.cancel}
                                    onClick={() => {
                                        login({
                                            variables: {
                                                username: this.state.username,
                                                password: this.state.password,
                                            },
                                        });
                                    }}
                                    fullWidth
                                >
                                    GraphQL Submit
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.cancel}
                                    onClick={() => this.props.history.goBack()}
                                    fullWidth
                                >
                                    Cancel
                                </Button>
                                {data && (() => localStorage.setItem('token', data.login.token))()}
                                {data && <Redirect to="/" />}
                            </form>
                        </Paper>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default withStyles(styles)(Login);
