import * as React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import { UserContext } from './index';

class App extends React.Component {
    render() {
        let token = localStorage.getItem('token');
        return (
            <UserContext.Consumer>
                {context => {
                    if (token && context && !context.state.token) context.state.login(token);
                    if (context && context.state.loggedIn)
                        return (
                            <div className="App">
                                <header className="App-header">
                                    <p>Hello World!</p>
                                    <h1>I am logged In</h1>
                                    <button
                                        onClick={() => {
                                            context.state.logout();
                                            token = null;
                                        }}
                                    >
                                        Logout
                                    </button>
                                </header>
                            </div>
                        );
                    else
                        return (
                            <div className="App">
                                <header className="App-header">
                                    <p>Hello World</p>
                                    <Link to="/login" className="App-link">
                                        Login
                                    </Link>
                                    <Link to="/register" className="App-link">
                                        Register
                                    </Link>
                                </header>
                            </div>
                        );
                }}
            </UserContext.Consumer>
        );
    }
}

export default App;
