import * as React from 'react';
import './App.css';

import MyAppBar from './components/AppBar';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <MyAppBar />
                <header className="App-header">
                    <p>Hello World!</p>
                </header>
            </div>
        );
    }
}

export default App;
