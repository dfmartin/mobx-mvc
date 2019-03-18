import * as React from 'react'
import { LeadStore } from './features/leads'
import { Location } from 'history'

interface RoutableStore {
    activate: (location: Location) => React.ReactNode
}
interface Route {
    path: string
    component: React.ReactNode
}

export const routes = [
    {
        path: '/leads',
        render: (location) => new LeadStore().activate(location)
    }
]

export class Router {

    constructor(public stores: RoutableStore[]) {
    }


}
