import * as React from 'react'
import { RootStore } from '../../rootStore';
import { LeadStore } from '../../features/leads';
import { JobStore } from '../../features/jobs';

export interface IStoreContext {
    rootStore: RootStore
    leadStore: LeadStore
    jobStore: JobStore
}
const root = new RootStore();

export const initialContext: IStoreContext = {
    rootStore: root,
    leadStore: root.leadStore,
    jobStore: root.jobStore,
}

const ContextRoot = React.createContext<IStoreContext>(initialContext)
export const Context = ContextRoot
export const StoreContext = (props: { children: React.ReactNode }) => {
    return (
        <ContextRoot.Provider value={initialContext}>
            {props.children}
        </ContextRoot.Provider>
    )
}
