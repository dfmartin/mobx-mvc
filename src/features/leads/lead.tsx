import * as React from 'react'

import { observer, useStore } from '../../hooks/mobx'
import { LeadJob } from './'

const _lead = () => {
    const leadStore = useStore('leadStore')

    const { lead, job } = leadStore

    return !!lead ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <p>Lead</p>
                <p>name: {lead.firstName}</p>
                <p>status: {lead.status}</p>
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
