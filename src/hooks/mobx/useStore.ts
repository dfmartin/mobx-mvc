import * as React from 'react'

import { IStoreContext, Context } from './storeContext'

export const useStore = <K extends keyof IStoreContext>(storeName: K): IStoreContext[K] => {
    const context = React.useContext(Context)
    const result = context[storeName]
    return result
}
