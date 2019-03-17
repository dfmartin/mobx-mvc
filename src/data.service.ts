import { data } from './data'

const sleep = (ms: number) => {
    return new Promise(r => setTimeout(r, ms))
}

export const DataService = {
    loadLead: async (leadId: number) => {
        await sleep(300)
        const lead = data.leads.find(l => l.id === leadId)
        const candidates = data.candidates.map(c => {
            if (c.leadId !== leadId) return;

            const job = data.jobs.find(j => j.id === c.jobId)
            return {
                id: job.id,
                name: job.name
            }
        })
        const recommendations = data.recommendations.map(c => {
            if (c.leadId !== leadId) return;

            const job = data.jobs.find(j => j.id === c.jobId)
            return {
                id: job.id,
                name: job.name
            }
        })

        return {
            contactInfo: lead,
            jobs: candidates,
            recs: recommendations
        }
    },

    loadJobDetails: async (leadId: number, jobId: number) => {
        await sleep(300)
        const job = data.jobs.find(j => j.id === jobId)

        const candidate = data.candidates.find(c => c.leadId === leadId && c.jobId === jobId)
        const recommendation = data.recommendations.find(c => c.leadId === leadId && c.jobId === jobId)
        return {
            details: job,
            candidate,
            recommendation
        }
    }
}
