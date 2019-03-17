import * as React from 'react'
import { useStore } from '../../hooks/mobx';
import { LeadStore } from '.';
import { JobStore } from '../jobs';

export const LeadJob = () => {
    const leadStore: LeadStore = useStore("leadStore")
    const jobStore = useStore("jobStore")

    const goToJobDetails = () => {
        const jobId = leadStore.job.id
        jobStore.goToJob(jobId)
    }
    return (
        <div>
            Lead Job
            name: {leadStore.job.name}
            <button onClick={goToJobDetails}>go to job details</button>
        </div>
    )
}
