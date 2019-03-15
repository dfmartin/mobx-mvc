import { History, createBrowserHistory, Location } from 'history'

const _history = createBrowserHistory({ basename: '' })

export const appHistory: History = _history
