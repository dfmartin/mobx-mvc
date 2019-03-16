import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { appHistory } from './appHistory'
import { observer, useStore, } from './hooks/mobx'


const handleClick = (path: string) => {
    appHistory.push(path)
}
export const _app = () => {
    const root = useStore("rootStore")
    const view = root.currentView;

    return (
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
    );
}

export const App = observer(_app)
