// $FlowFixMe
import io from 'socket.io-client'
import { API_URL } from '../../api/api-constants'
import { ON_EVENTS_TYPES } from './socket-constants'
import type { Store } from '../../store/type-store'
import type { GenericObject } from  '../type-common'

// Connect to socket api
export const socket = io.connect(API_URL)

// Initial socket events
export const socketInit = (store: Store) => {
    ON_EVENTS_TYPES.forEach(type =>
        socket.on(type, payload =>
            store.dispatch({ type, payload })
        )
    )
}

export const socketEmit = (type: string, payload: GenericObject) => {
    socket.emit(type, payload);
}
