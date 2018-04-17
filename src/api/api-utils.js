// @flow
import type { GenericObject } from '../common/type-common'

export const transformResponse = (data: GenericObject) =>
  data.then(response => {
    const responseData = response.data
    if (responseData.error) {
      throw new Error({
        code: responseData.status,
        message: responseData.message
      })
    } else {
      return responseData.data;
    }
  })
    .catch(error => {
      throw error
    })
