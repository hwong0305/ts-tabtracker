import * as React from 'react';
import MyAppBar from '../components/AppBar';
import AlbumCard from '../components/AlbumCard';
import './styles/UserInfo.css';

class UserInfo extends React.Component {
    render() {
        return (
            <div className="App">
                <MyAppBar />
                <div className="App-header">
                    <div className="container">
                        <AlbumCard
                            albumImg="https://upload.wikimedia.org/wikipedia/en/c/c7/Twice_%E2%80%93_Yes_or_Yes.png"
                            title="Yes or Yes"
                            album="Yes or Yes"
                            artist="Twice"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;
