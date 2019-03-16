import * as React from 'react'
import { useStore } from '../../hooks/mobx';
import { LeadStore } from '.';

export const LeadJob = () => {
    const store: LeadStore = useStore("leadStore")

    return (
        <div>
            Lead Job
            name: {store.job.name}
        </div>
    )
}
