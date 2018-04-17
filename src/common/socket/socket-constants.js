// @flow

import { currentUserId } from '../storage/storage'

export const ON_EVENTS_TYPES = ['verifyUser', 'online-user-list', currentUserId]
export const EMIT_EVENTS_TYPES = { setUser: 'set-user', chatMsg: 'chat-msg' }
