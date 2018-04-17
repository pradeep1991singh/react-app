// @flow

import type { Store } from '../src/store/type-store'

export const userStore = {
  isLoading: false,
  user: {
    authToken: 'authToken',
    userDetails: {
      apiKey: 'apiKey',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      mobileNumber: 1234567890,
      userId: 'userId'
    },
    onlineUsers: {
      userId: 'userId'
    },
    currentReceiver: {
      receiverId: 'receiverId',
      receiverName: 'receiverName'
    },
    error: {
      code: '',
      message: ''
    }
  }
}

export function getStore(store?: Store) {
  return {
    getState() {
      return {
        userStore: userStore,
        dispatch() {
          // $FlowFixMe
          return jest.fn()
        },
        subscribe() {
          // $FlowFixMe
          return jest.fn()
        },
      }
    },
  }
}
