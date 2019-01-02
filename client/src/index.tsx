import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';

import App from './App';
import Login from './containers/Login';
import Register from './containers/Register';

import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:8081/graphql',
});

interface UserContextInterface {
    state: {
        loggedIn: boolean;
        token: string | null;
        logout: Function;
        login: Function;
    };
}
export const UserContext = React.createContext<UserContextInterface | null>(null);

export class UserProvider extends React.Component {
    state = {
        loggedIn: false,
        token: null,
        logout: () => {
            localStorage.removeItem('token');
            return this.setState({
                loggedIn: false,
                token: null,
            });
        },
        login: (token: string) => {
            return this.setState({
                loggedIn: true,
                token,
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
                    <Route exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </React.Fragment>
            </Router>
        </UserProvider>
        >
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
