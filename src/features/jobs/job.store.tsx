import * as React from 'react'
import { observable, computed, action, flow } from 'mobx'
import { Location } from 'history';
import { JobContainer } from './job.container';

export class JobStore {
    @action activate = (location: Location) => {
        return <JobContainer />
    }
}
