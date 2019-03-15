import { observable, computed, action, flow } from 'mobx'
import { History, createBrowserHistory, Location } from 'history'
import { JobStore } from './features/jobs/job.store'
import { LeadStore } from './features/leads/lead.store'

import { appHistory } from './appHistory'

export class RootStore {
    private _jobStore: JobStore
    private _leadStore: LeadStore
    private _history: History
    private _location: Location<any>
    private _listener: any

    constructor () {
        this._history = appHistory
        this._jobStore = new JobStore()
        this._leadStore = new LeadStore()

        this._listener = this._history.listen(this.historyListener)
    }

    private historyListener = (location: Location<any>) => {
        console.log(location)
        this._location = location
    }
}
