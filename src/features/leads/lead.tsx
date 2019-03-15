import * as React from 'react'

import { observer, useStore } from '../../hooks/mobx'
import { LeadStore } from './lead.store'
import { LeadJob } from './'

interface LeadProps {
    leadStore: LeadStore
}

const _lead = () => {
    const [store] = useStore(["leadStore"])


    return (
        <div>
            Lead
            name: {store.lead.firstName}
            <div>
                {store.job && (
                    <LeadJob />
                )}
            </div>
        </div>
    )
}

export const Lead = observer(_lead)
