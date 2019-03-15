import * as React from 'react'
import { useStore } from '../../hooks/mobx';

export const LeadJob = () => {
    const [store] = useStore(["leadStore"])

    return (
        <div>
            Lead Job
            name: {store.job.name}
        </div>
    )
}
