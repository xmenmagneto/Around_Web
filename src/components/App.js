import React, { Component } from 'react';
import {Header} from './Header';
import {Main} from './Main'
import '../styles/App.css';
import { TOKEN_KEY } from "../constants"

class App extends Component {
    state = {
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY)  //！！表示把string转换成bool
    }

    handleLogin = (token) => {
        localStorage.setItem(TOKEN_KEY, token); // 存一下token
        this.setState({ isLoggedIn: true});  //not depend on previous state
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY); // 清除
        this.setState({ isLoggedIn: false});
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }
}

export default App;
