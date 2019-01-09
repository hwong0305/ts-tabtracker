import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../index';

const styles = createStyles({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
});

const BookmarksLink: React.SFC<{}> = props => <Link to="/bookmarks" {...props} />;
const LoginLink: React.SFC<{}> = props => <Link to="/login" {...props} />;
const RegisterLink: React.SFC<{}> = props => <Link to="/register" {...props} />;
const BrowseLink: React.SFC<{}> = props => <Link to="/" {...props} />;

const LoginButton: React.SFC<{}> = () => (
    <React.Fragment>
        <Button color="inherit" component={BrowseLink}>
            Browse
        </Button>
        <Button color="inherit" component={LoginLink}>
            Login
        </Button>
        <Button color="inherit" component={RegisterLink}>
            Register
        </Button>
    </React.Fragment>
);

const LogoutButton: React.SFC<{}> = () => (
    <UserContext.Consumer>
        {context =>
            context && (
                <React.Fragment>
                    <Button color="inherit" component={BrowseLink}>
                        Browse
                    </Button>
                    <Button color="inherit" component={BookmarksLink}>
                        Bookmarks
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            context.state.logout();
                            console.log(context.state.loggedIn);
                        }}
                    >
                        Logout
                    </Button>
                </React.Fragment>
            )
        }
    </UserContext.Consumer>
);

class MyAppBar extends React.Component<WithStyles<typeof styles>, {}> {
    render() {
        const { classes } = this.props;
        return (
            <UserContext.Consumer>
                {context =>
                    context && (
                        <div className={classes.root}>
                            <AppBar position="fixed" color="primary">
                                <Toolbar>
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        className={classes.grow}
                                    >
                                        TabTracker
                                    </Typography>
                                    {!context.state.loggedIn && <LoginButton />}
                                    {context.state.loggedIn && <LogoutButton />}
                                </Toolbar>
                            </AppBar>
                        </div>
                    )
                }
            </UserContext.Consumer>
        );
    }
}

export default withStyles(styles)(MyAppBar);
