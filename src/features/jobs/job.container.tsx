import * as React from 'react'
import { useStore } from '../../hooks/mobx';

export const JobContainer = () => {
    const jobStore = useStore('jobStore')
    const view = jobStore.currentView

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            Job container
            <div>
                {view}
            </div>
        </div>
    )
}
