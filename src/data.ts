export const data = {
    leads: [
        {
            firstName: 'George',
            lastName: 'Washington',
            id: 1,
        },
        {
            firstName: 'John',
            lastName: 'Adams',
            id: 2,
        },
        {
            firstName: 'Thomas',
            lastName: 'Jefferson',
            id: 3,
        },
    ],
    jobs: [
        {
            name: 'President',
            id: 1,
            status: 'open'
        },
        {
            name: 'Vice President',
            id: 2,
            status: 'open'
        },
        {
            name: 'Secretary of State',
            id: 3,
            status: 'open'
        },
        {
            name: 'King',
            id: 4,
            status: 'closed'
        },
    ],
    candidates: [
        {
            leadId: 1,
            jobId: 1,
            status: 'review'
        },
        {
            leadId: 2,
            jobId: 1,
            status: 'new'
        },
        {
            leadId: 3,
            jobId: 2,
            status: 'qualifying'
        },
    ],
    recommendations: [
        {
            leadId: 2,
            jobId: 3,
            score: 85,
        },
        {
            leadId: 3,
            jobId: 2,
            score: 75,
        },
        {
            leadId: 3,
            jobId: 3,
            score: 95,
        },
    ]
}
