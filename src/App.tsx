import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { appHistory } from './appHistory'
import { observer, useStore, } from './hooks/mobx'

const style = {
    width: '75px',
    height: '75px',
    marginRight: '4px',
}

const handleClick = (path: string) => {
    console.log(`****** button clicked: ${path}`)
    appHistory.push(path)
}
const handleKeyPress = (e) => {
    let path: string = ''
    switch (e.key) {
        case '1':
            path = 'jobs'
            break

        case '2':
            path = 'leads'
            break

        case '3':
            path = 'leads/2'
            break

        case '4':
            path = 'leads/1'
            break

        case '5':
            path = 'leads/2/3'
            break

        default:
            path = 'leads'
    }

    if (!!path) {
        appHistory.push('/' + path)
    }
}
const handleBunches = () => {
    const paths = [
        'leads', `leads/2`, 'leads/1', 'leads/2/3', 'leads/2', 'leads', 'leads/2/3', 'leads/1'
    ]
    console.log(`****** beginning bunches ******`)
    paths.forEach(p => {
        appHistory.push('/' + p)
    })
}
export const _app = () => {
    window.onkeydown = handleKeyPress
    const root = useStore("rootStore")
    const placeholder = root.location
    //console.log('a1. root current view requested')
    const view = root.currentView
    //console.log('a1. root current view retrieved')

    return (
        <div className='App' onKeyDown={handleKeyPress}>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                <div style={{ display: "flex" }}>
                    <   button style={style} onClick={() => handleClick('/jobs')}>job search</button>
                    <button style={style} onClick={() => handleClick('/jobs/2')}>job 2</button>
                    <button style={style} onClick={() => handleClick('/leads')}>leads</button>
                    <button style={style} onClick={() => handleClick('/leads/2')}>leads #2</button>
                    <button style={style} onClick={() => handleClick('/leads/1')}>leads #1</button>
                    <button style={style} onClick={() => handleClick('/leads/2/3')}>leads #2 job #3</button>
                    <button style={style} onClick={() => handleBunches()}>bunches</button>

                </div>

                <div style={{ border: '1px solid blue' }}>
                    {view}
                </div>
            </header>
        </div>
    );
}

export const App = observer(_app)
