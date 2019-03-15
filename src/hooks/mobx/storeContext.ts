import * as React from 'react'

export interface IStoreContext {
    [key: string]: any
}

const _context = React.createContext<IStoreContext>({})

export const StoreContext = _context
