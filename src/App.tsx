import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { appHistory } from './appHistory'

class App extends Component {
    handleClick = () => {
        appHistory.push('/tester')
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
          </p>
                    <button onClick={this.handleClick}>navigate</button>
                </header>
            </div>
        );
    }
}

export default App;
