import * as React from 'react'

import { observer, useStore } from '../../hooks/mobx'
import { LeadJob } from './'

const _lead = () => {
    const leadStore = useStore("leadStore")

    const { lead, job } = leadStore

    return !!lead ? (
        <div style={{ display: "flex" }}>
            <div>
                Lead
                name: {lead.firstName}
                status: {lead.status}
            </div>
            <div>
                {job && (
                    <LeadJob />
                )}
            </div>
        </div>
    ) : null
}

export const Lead = observer(_lead)
