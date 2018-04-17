// @flow

import type { CustomError, InitialTestAction, GenericObject } from '../common/type-common'

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string
}

export type SignUpStates = {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    password: string,
    confirmPassword: string
}

export type SignUpProps = {
    signUpAction: (state: SignUpStates) => void,
    history: {
        push: ({ pathname: string, params?: GenericObject }) => void
    },
    user: User,
    errorMessage: string
}

export type LoginStates = {
    email: string,
    password: string
}

export type LoginProps = {
    loginAction: (state: LoginStates) => void,
    history: {
        push: ({ pathname: string, params?: GenericObject }) => void
    },
    user: User,
    errorMessage: string
}

export type SignUpObject = User & {
    password: string,
    apiKey: string
}

export type LoginObject = {
    email: string,
    password: string
}

export type UserDetails = User & {
    apiKey: string,
    userId: string
}

export type CurrentUser = {
    authToken: string,
    userDetails: UserDetails
}

export const SIGN_UP = 'SIGN_UP'
export type SignUpAction = {
    type: typeof SIGN_UP,
    signUpObject: SignUpObject
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export type SignUpSuccessAction = {
    type: typeof SIGN_UP_SUCCESS,
    user: User,
}

export const SIGN_UP_FAIL = 'SIGN_UP_FAIL'
export type SignUpFailAction = {
    type: typeof SIGN_UP_FAIL,
    error: CustomError,
}

export const LOGIN = 'LOGIN'
export type LoginAction = {
    type: typeof LOGIN,
    loginObject: LoginObject,
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export type LoginSuccessAction = {
    type: typeof LOGIN_SUCCESS,
    user: User,
}

export const LOGIN_FAIL = 'LOGIN_FAIL'
export type LoginFailAction = {
    type: typeof LOGIN_FAIL,
    error: CustomError,
}

export const LOGOUT = 'LOGOUT'
export type LogOutAction = {
    type: typeof LOGOUT,
    userId: string,
}

export type LogOutData = {
    error: boolean,
    message: string,
    status: number,
    data: any
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export type LogOutSuccessAction = {
    type: typeof LOGOUT_SUCCESS,
    data: LogOutData,
}

export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export type LogOutFailAction = {
    type: typeof LOGOUT_FAIL,
    error: CustomError,
}

export type OnlineUsers = {
    +[userId: string]: string
}

export const ONLINE_USERS_LIST = 'online-user-list'
export type GetOnlineUsersAction = {
    type: typeof ONLINE_USERS_LIST,
    payload: OnlineUsers,
}

export type Receiver = {
    receiverName: string,
    receiverId: string,
}

export const SET_RECEIVER = 'SET_RECEIVER'
export type SetReceiverAction = {
    type: typeof SET_RECEIVER,
    receiver: Receiver,
}

export const INIT_STORE = 'INIT_STORE'
export type InitStoreAction = {
    type: typeof INIT_STORE,
}

export type UserStoreAction =
    | SignUpAction
    | SignUpSuccessAction
    | SignUpFailAction
    | LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | GetOnlineUsersAction
    | SetReceiverAction
    | InitialTestAction

export type UserStore = {
    isLoading: boolean,
    user?: User,
    onlineUsers: ?OnlineUsers,
    currentReceiver?: Receiver,
    error: CustomError,
}
