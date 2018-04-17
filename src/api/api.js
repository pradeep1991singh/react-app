// @flow
import axios from 'axios'
import { API_BASE_URL, LOGIN_API, SIGN_UP_API, LOGOUT_API } from './api-constants';
import { transformResponse } from './api-utils';
import type { GenericObject } from '../common/type-common'

// login
export const login = (requestBody: GenericObject) =>
    transformResponse(axios.post(`${API_BASE_URL}${LOGIN_API}`, requestBody))

// sign-up
export const signUp = (requestBody: GenericObject) =>
    transformResponse(axios.post(`${API_BASE_URL}${SIGN_UP_API}`, requestBody))

// logout
// TODO:Fix this
export const logOut = (userId: string) =>
    transformResponse(
        axios({
            method: 'POST',
            headers: { 'Authorization': userId },
            url: `${API_BASE_URL}${LOGOUT_API}`,
        })
    )
