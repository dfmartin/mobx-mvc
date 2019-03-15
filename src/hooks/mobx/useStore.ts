import * as React from 'react'
import { StoreContext } from './storeContext'
import { array } from 'prop-types';

export const useStore = (storeName: string[]) => {
    const c = React.useContext(StoreContext);
    const result = []
    storeName.forEach(s => {
        if (c[s] !== undefined) {
            result.push(c[s])
        }
    })

    return result
}
