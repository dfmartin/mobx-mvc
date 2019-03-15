import * as React from 'react'
import { observable, computed, action, flow } from 'mobx'
import { History, createBrowserHistory, Location } from 'history'

import { Lead, LeadJob, LeadContainer, LeadSearch } from './'
export class LeadStore {
    @observable _currentView: React.ReactNode
    @observable _location: Location
    @observable lead: { firstName: string, lastName: string }
    @observable job: { name: string, status: boolean }

    constructor() {
        console.log('lead store created')
    }

    @action private setCurrentView = () => {
        const parts = this._location.pathname.split('/').slice(1);
        if (parts.length === 1) {
            this.lead = undefined
            this.job = undefined
            return <LeadSearch />
            this._currentView = <LeadSearch />
        }
        else {
            const leadId = parseInt(parts[1])
            this.lead = {
                firstName: 'lead#: ' + leadId,
                lastName: 'Washington'
            }

            if (parts.length === 3) {
                const jobId = parseInt(parts[2])
                this.job = {
                    name: 'job#: ' + jobId,
                    status: jobId % 2 > 0
                }
            }
            else {
                this.job = undefined
            }
            return <Lead />
            this._currentView = <Lead />
        }
    }

    @action activate = (location: Location) => {
        this._location = location
        this._currentView = this.setCurrentView();
        return <LeadContainer />
    }

    @action getCurrentView = () => {
        return this._currentView;
    }

    @computed get currentView(): React.ReactNode {
        return this._currentView;
    }
}
