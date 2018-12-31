import * as React from 'react';
import './App.css';

import MyAppBar from './components/AppBar';

import { UserContext } from './index';

class App extends React.Component {
    render() {
        return (
            <UserContext.Consumer>
                {context => {
                    if (context) {
                        if (localStorage.getItem('token') && !context.state.loggedIn)
                            context.state.login(localStorage.getItem('token'));
                        return (
                            <div className="App">
                                <MyAppBar />
                                <header className="App-header">
                                    <p>Hello World!</p>
                                </header>
                            </div>
                        );
                    } else return null;
                }}
            </UserContext.Consumer>
        );
    }
}

export default App;
