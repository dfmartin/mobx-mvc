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
        this.abortController.abort()
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
        this.abortManager = null
    }

    private getParts = (location: Location) => {
        const parts = location.pathname.split('/').slice(1)
        const path = '/leads/:leadId/:jobId'
        const result = {}
        const match = path.match(/(\/:?[a-z0-9]+)/gmi)
        match.forEach(m => {
            if (!m.startsWith('/:')) return
            const i = match.indexOf(m)
            const varName = m.substring(2)
            result[varName] = parts[i]
        })

        return result
    }

    @action private setCurrentView = async (location: Location) => {
        const signal = this.getAbortSignal(location)
        await sleep(2000)
        if (signal.aborted) {
            return Promise.reject('=======> signal aborted')
        }
        const p1 = this.getParts(location)

        const parts = location.pathname.split('/').slice(1)
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
        return this._currentView
    }

    @computed get currentView(): React.ReactNode {
        return this._currentView
    }
}
