import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import './index.css';

import AddSong from './containers/AddSong';
import Bookmarks from './containers/Bookmarks';
import Default from './containers/Default';
import Login from './containers/Login';
import Register from './containers/Register';
import Song from './containers/Song';
import ViewSong from './containers/ViewSong';
import UserInfo from './containers/UserInfo';

import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:8081/graphql',
    request: async operation => {
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
    },
});

interface UserContextInterface {
    state: {
        userID: string | null;
        loggedIn: boolean;
        token: string | null;
        logout: () => void;
        login: (token: string, userID: string) => void;
    };
}
export const UserContext = React.createContext<UserContextInterface | null>(null);

export class UserProvider extends React.Component {
    state = {
        userID: localStorage.getItem('userID') ? localStorage.getItem('userID') : null,
        loggedIn: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            return this.setState({
                loggedIn: false,
                token: null,
                userID: null,
            });
        },
        login: (token: string, userID: string) => {
            localStorage.setItem('token', token);
            localStorage.setItem('userID', userID);
            return this.setState({
                loggedIn: true,
                token,
                userID,
            });
        },
    };
    render() {
        return (
            <UserContext.Provider value={{ state: this.state }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <UserProvider>
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route exact={true} path="/" component={Song} />
                        <Route path="/create/song" component={AddSong} />
                        <Route path="/song/:id" component={ViewSong} />
                        <Route path="/bookmarks" component={Bookmarks} />
                        <Route path="/user" component={UserInfo} />
                        <Route component={Default} />
                    </Switch>
                </React.Fragment>
            </Router>
        </UserProvider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
