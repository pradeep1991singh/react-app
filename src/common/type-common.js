// @flow

import type { Element } from 'react'

export type CustomError = {
  code: string,
  message: string,
}

export const INITIAL_TEST_ACTION: 'INITIAL_TEST_ACTION' = 'INITIAL_TEST_ACTION'

export type InitialTestAction = {
  type: typeof INITIAL_TEST_ACTION,
}

export const initialTestAction = () => ({
  type: INITIAL_TEST_ACTION,
})

export type GenericObject = {
  [string]: any,
}

export type GenericStringObject = {
  [string]: string,
}

export type ReactChildren = Element<*>
