import * as React from 'react'
import { observable, computed, action, flow } from 'mobx'
import { History, createBrowserHistory, Location } from 'history'
import { JobStore } from './features/jobs/job.store'
import { LeadStore } from './features/leads/lead.store'
import { JobContainer } from './features/jobs/job.container'
import { LeadContainer } from './features/leads/lead.container'

import { appHistory } from './appHistory'

const extractGETparams = (url: string) => {
    return url.split(/\?(.*)?$/).slice(1).join('')
}

const clean = (s: RegExp | string) => {
    if (s instanceof RegExp) return s
    return s.replace(/\/+$/, '').replace(/^\/+/, '^/')
}

const getOnlyUrl = (url: string) => {
    let onlyURL = url
    let split: string[]

    const cleanGETParam = (str: string) => str.split(/\?(.*)?$/)[0]


    //onlyURL = cleanGETParam(url).split(hash)[0]

    return cleanGETParam
}


export class RootStore {
    private _history: History
    @observable location: Location<any>
    @observable private _listener: any
    @observable private _currentView: React.ReactNode

    constructor () {
        this._history = appHistory
        this.jobStore = new JobStore()
        this.leadStore = new LeadStore()

        this._listener = this._history.listen(async (location) => this.historyListener(location))
        this.historyListener(this._history.location)
    }

    @observable jobStore: JobStore
    @observable leadStore: LeadStore

    @action private historyListener = async (location: Location<any>) => {
        console.log(`${location.pathname} r0. location requested: `, location)
        //if (this.location && location.pathname === this.location.pathname && location.search === this.location.search) return;
        console.log(`${location.pathname} r1. new location updating current view: `)
        const { location: newLoc, view } = await this.updateCurrentView(location)
        this.location = newLoc
        if (!!view) {
            console.log(`${location.pathname} r4.1. this._currentView updated for `)
            this._currentView = view
        }
        else {
            console.log(`${location.pathname} r4.2. =======> no view returned for `)
        }
    }

    @action updateCurrentView = async (location: Location) => {
        const base = location.pathname.split('/').slice(1)[0]
        let view: React.ReactNode

        switch (base) {
            case 'jobs':
                view = this.jobStore.activate(location)
                break

            case 'leads':
                view = await this.leadStore.activate(location)
                break

            default:
                view = null
        }

        return { location, view }
    }

    @computed get currentView() {
        if (this.location) {
            console.log(`${this.location.pathname} r5.1. current view returned for `)
        }
        else {
            console.log(`r5.2current view returned with no location.  ${!!this._currentView ? 'no current view' : 'somehow there is a current view'}`)
        }
        return this._currentView
    }
}
