import * as React from 'react'
import { LeadStore } from './lead.store'
import { observer, useStore } from '../../hooks/mobx'

export const leadContainer = (props: { store?: LeadStore }) => {
    const store: LeadStore = useStore('leadStore')

    const view = store.currentView;
    return (
        <>
            Lead Container
                child view:
                <br />
            {view}
        </>
    )
}

export const LeadContainer = observer(leadContainer)
