import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { appHistory } from './appHistory'
import { RootStore } from './rootStore'
import { observer, StoreContext } from './hooks/mobx'
const root = new RootStore()

const stores = {
    root,
    jobStore: root.jobStore,
    leadStore: root.leadStore
}

class App2 extends Component {
    handleClick = () => {
        appHistory.push('/tester')
    }

    render() {
        console.log('======> Stores: ', stores)
        return (
            <StoreContext.Provider value={stores}>
                <div className='App'>
                    <header className='App-header'>
                        <img src={logo} className='App-logo' alt='logo' />
                        <p>
                            Edit <code>src/App.tsx</code> and save to reload.!
                    </p>
                        <button onClick={this.handleClick}>navigate</button>
                    </header>
                </div>
            </StoreContext.Provider>
        );
    }
}

export const _app = () => {
    const handleClick = (path) => {
        appHistory.push(path)
    }


    console.log('======> Stores: ', stores)
    const view = root.getCurrentView();
    const loc = root.location;
    return (
        <StoreContext.Provider value={stores}>
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <div style={{ border: '1px solid blue' }}>
                        {view}
                    </div>
                    <button onClick={() => handleClick('/jobs/2')}>jobs</button>
                    <button onClick={() => handleClick('/leads')}>leads</button>
                    <button onClick={() => handleClick('/leads/2')}>leads #2</button>
                    <button onClick={() => handleClick('/leads/1')}>leads #1</button>
                    <button onClick={() => handleClick('/leads/2/3')}>leads #2 job #3</button>
                </header>
            </div>
        </StoreContext.Provider>
    );
}

export const App = observer(_app)
