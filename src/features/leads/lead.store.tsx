import * as React from 'react'
import { observable, computed, action } from 'mobx'
import { Location } from 'history'

import { Lead, LeadContainer, LeadSearch } from './'

const sleep = (ms: number) => {
    return new Promise(r => setTimeout(r, ms))
}

class AbortManager {
    location: Location
    abortController: AbortController
    abort = () => {
        console.log(`${this.location.pathname} ======> aborting location: `)
        this.abortController.abort();
    }

    constructor(location: Location) {
        this.location = location
        this.abortController = new AbortController()
    }
}
export class LeadStore {
    private abortManager: AbortManager
    @observable private _currentView: React.ReactNode
    @observable private _location: Location
    @observable lead: { firstName: string, lastName: string, status: 'candidate' | 'recommendation' }
    @observable job: { name: string, status: boolean, id: number }

    @observable ui: {
        selectedTab: string
    }
    constructor() {
        console.log('lead store created')
    }

    private getAbortSignal = (location: Location): AbortSignal => {
        this.completeSignal()
        this.abortManager = new AbortManager(location)
        return this.abortManager.abortController.signal
    }

    private completeSignal = () => {
        if (this.abortManager) {
            this.abortManager.abort()
            this.abortManager = null
        }
    }

    private endSignal = () => {
        if (this.abortManager) {
            console.log(`${this.abortManager.location.pathname} ending manager: `)
        }
        this.abortManager = null
    }

    @action private setCurrentView = async (location: Location) => {
        const signal = this.getAbortSignal(location)
        await sleep(2000)
        if (signal.aborted) {
            return Promise.reject('=======> signal aborted')
        };

        const parts = location.pathname.split('/').slice(1);
        let view: React.ReactNode
        if (parts.length === 1) {
            this.lead = undefined
            this.job = undefined
            view = <LeadSearch />
        }
        else {
            const leadId = parseInt(parts[1])
            this.lead = {
                firstName: 'lead#: ' + leadId,
                lastName: 'Washington',
                status: leadId % 2 > 0 ? 'candidate' : 'recommendation'
            }

            if (parts.length === 3) {
                const jobId = parseInt(parts[2])
                this.job = {
                    name: 'job#: ' + jobId,
                    status: jobId % 2 > 0,
                    id: jobId,
                }
            }
            else {
                this.job = undefined
            }
            view = <Lead />
        }
        return { view, location }
    }

    @action activate = async (location: Location) => {
        try {
            const { location: newLoc, view } = await this.setCurrentView(location)
            this._location = newLoc
            this._currentView = view
            return <LeadContainer />
        }
        catch (error) {
            return null
        }
        finally {
            this.endSignal()
        }
    }

    @action getCurrentView = () => {
        return this._currentView;
    }

    @computed get currentView(): React.ReactNode {
        return this._currentView;
    }
}
