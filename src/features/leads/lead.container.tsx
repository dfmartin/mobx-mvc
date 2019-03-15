import * as React from 'react'
import { LeadStore } from './lead.store'
import { observer, useStore } from '../../hooks/mobx';

export const leadContainer = (props: { store?: LeadStore }) => {
    const [store] = useStore(["leadStore"])
    //const {
    //    store
    //} = props;
    const view = store.currentView;
    return (
        <div>
            Lead Container
            <div>
                child view:
                <br />
                {view}
            </div>
        </div>
    )
}

export const LeadContainer = observer(leadContainer)
