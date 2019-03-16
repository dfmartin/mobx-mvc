import * as React from 'react'

import { observer, useStore } from '../../hooks/mobx'
import { LeadJob } from './'

const _lead = () => {
    const leadStore = useStore("leadStore")


    return (
        <div style={{ display: "flex" }}>
            <div>
                Lead
                name: {leadStore.lead.firstName}
                status: {leadStore.lead.status}
            </div>
            <div>
                {leadStore.job && (
                    <LeadJob />
                )}
            </div>
        </div>
    )
}

export const Lead = observer(_lead)
