// @flow

import type { GenericObject } from '../type-common'

export const setItem = (key: string, item: GenericObject) =>
    window.localStorage.setItem(key, JSON.stringify(item))

export const getItem = (key: string) =>
    window.localStorage.getItem(key)

export const removeItem = (key: string) =>
    window.localStorage.removeItem(key)

export const USER_KEY: string = 'user'

export const currentUserId: string = JSON.parse(getItem(USER_KEY)) ? JSON.parse(getItem(USER_KEY)).userDetails.userId : 'AnonymousId'
