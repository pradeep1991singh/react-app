// @flow

import type { GenericObject } from '../common/type-common'

export type ApiData = {
  method: string,
  mode: string,
  headers: { [string]: string },
  body?: string,
}

export type BackendError = {
  statusCode: string,
  statusMsg: string,
}
