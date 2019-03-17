import * as React from 'react'
import { useStore } from '../../hooks/mobx';

export const Job = () => {
    const jobStore = useStore('jobStore')

    return (
        <div>
            Job details.  id: {jobStore.job.id}
        </div>
    )
}
