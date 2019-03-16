import * as React from 'react'
import { observable, computed, action } from 'mobx'
import { Location } from 'history'

import { Lead, LeadContainer, LeadSearch } from './'
export class LeadStore {
    @observable private _currentView: React.ReactNode
    @observable private _location: Location
    @observable lead: { firstName: string, lastName: string, status: "candidate" | "recommendation" }
    @observable job: { name: string, status: boolean }

    @observable ui: {
        selectedTab: string
    }
    constructor () {
        console.log('lead store created')
    }

    @action private setCurrentView = () => {
        const parts = this._location.pathname.split('/').slice(1);
        if (parts.length === 1) {
            this.lead = undefined
            this.job = undefined
            this._currentView = <LeadSearch />
        }
        else {
            const leadId = parseInt(parts[1])
            this.lead = {
                firstName: 'lead#: ' + leadId,
                lastName: 'Washington',
                status: leadId % 2 > 0 ? "candidate" : "recommendation"
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
            this._currentView = <Lead />
        }
    }

    @action activate = (location: Location) => {
        this._location = location
        this.setCurrentView();
        return <LeadContainer />
    }

    @action getCurrentView = () => {
        return this._currentView;
    }

    @computed get currentView(): React.ReactNode {
        return this._currentView;
    }
}
