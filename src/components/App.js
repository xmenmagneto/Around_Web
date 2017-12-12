import React, { Component } from 'react';
import {Header} from './Header';
import {Main} from './Main'
import '../styles/App.css';
import { TOKEN_KEY } from "../constants"

class App extends Component {
    state = {
        isLoggedIn: false
    }

    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token); // 存一下token
        this.setState({ isLoggedIn: true});  //not depend on previous state
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
