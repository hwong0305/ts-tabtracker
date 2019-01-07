import * as React from 'react';
import './App.css';

import MyAppBar from './components/AppBar';
import MyTable from './components/Table';

import Paper from '@material-ui/core/Paper';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <MyAppBar />
                <header className="App-header">
                    <Paper>
                        <MyTable />
                    </Paper>
                </header>
            </div>
        );
    }
}

export default App;
