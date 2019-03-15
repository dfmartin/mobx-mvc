import * as React from 'react'
import { observable, computed, action, flow } from 'mobx'
import { History, createBrowserHistory, Location } from 'history'
import { StoreContext } from './hooks/mobx'
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

    constructor() {
        this._history = appHistory
        this.jobStore = new JobStore()
        this.leadStore = new LeadStore()

        this._listener = this._history.listen(this.historyListener)
        this.historyListener(this._history.location)
    }
    @observable jobStore: JobStore
    @observable leadStore: LeadStore

    @action private historyListener = (location: Location<any>) => {
        if (this.location && location.pathname === this.location.pathname && location.search === this.location.search) return;
        console.log(location)
        this.location = location
    }

    @action getCurrentView(): React.ReactNode {
        const location = this.location;
        const base = location.pathname.split('/').slice(1)[0]
        switch (base) {
            case 'jobs':
                return this.jobStore.activate(location)

            case 'leads':
                return this.leadStore.activate(location)

            default:
                return null
        }
    }
}
