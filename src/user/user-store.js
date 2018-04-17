// $FlowFixMe

import { put, takeLatest, call, all } from 'redux-saga/effects'

import {
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ONLINE_USERS_LIST,
    SET_RECEIVER,
    INIT_STORE,
} from './type-user'
import type {
    User,
        UserStore,
        SignUpObject,
        SignUpAction,
        SignUpSuccessAction,
        SignUpFailAction,
        LoginObject,
        LoginAction,
        LoginSuccessAction,
        LoginFailAction,
        LogOutAction,
        LogOutSuccessAction,
        LogOutFailAction,
        Receiver,
        SetReceiverAction,
        InitStoreAction,
        UserStoreAction
} from './type-user'
import type { Chat } from '../chat/type-chat'
import type { CustomError } from '../common/type-common'
import { signUp, login, logOut, API_KEY } from '../api'
import { setItem, getItem, USER_KEY, EMIT_EVENTS_TYPES } from '../common'

export const initialState: UserStore = {
    isLoading: false,
    user: {},
    onlineUsers: {},
    currentReceiver: {},
    error: {
        code: '',
        message: '',
    },
}

export const signUpAction = (signUpObject: SignUpObject): SignUpAction => ({
    type: SIGN_UP,
    signUpObject
})

export const signUpSuccess = (
    data: User
): SignUpSuccessAction => ({
    type: SIGN_UP_SUCCESS,
    data,
})

export const signUpFail = (
    error: CustomError
): SignUpFailAction => ({
    type: SIGN_UP_FAIL,
    error,
})

export function* signUpSaga(
    action: SignUpAction
): Generator<*, *, *> {
    try {
        yield call(signUp, { ...action.signUpObject, apiKey: API_KEY })
        yield put(loginAction({ email: action.signUpObject.email, password: action.signUpObject.password }))
    } catch (e) {
        yield put(signUpFail(e))
    }
}

function* watchSignUp(): Generator<*, *, *> {
    yield takeLatest(SIGN_UP, signUpSaga)
}

export const loginAction = (loginObject: LoginObject): LoginAction => ({
    type: LOGIN,
    loginObject,
})

export const loginSuccess = (user: User): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    user,
})

export const loginFail = (error: CustomError): LoginFailAction => ({
    type: LOGIN_FAIL,
    error,
})

export function* loginSaga(
    action: LoginAction
): Generator<*, *, *> {
    try {
        const user = yield call(login, action.loginObject)
        setItem('user', user)
        yield put(loginSuccess(user))
    } catch (e) {
        yield put(loginFail(e))
    }
}

function* watchLogin(): Generator<*, *, *> {
    yield takeLatest(LOGIN, loginSaga)
}

export const logOutAction = (userId: string): LogOutAction => ({
    type: LOGOUT,
    userId
})

export const logOutSuccess = (): LogOutSuccessAction => ({
    type: LOGOUT_SUCCESS,
})

export const logOutFail = (error: CustomError): LogOutFailAction => ({
    type: LOGOUT_FAIL,
    error,
})

export function* logOutSaga(
    action: LogOutAction
): Generator<*, *, *> {
    try {
        yield call(logOut, action.userId)
        yield put(logOutSuccess())
    } catch (e) {
        yield put(logOutFail(e))
    }
}

function* watchLogOut(): Generator<*, *, *> {
    yield takeLatest(LOGOUT, logOutSaga)
}

export function* watchUser(): Generator<*, *, *> {
    yield all([watchSignUp(), watchLogin(), watchLogOut()])
}

export const setReceiver = (receiver: Receiver): SetReceiverAction => ({
    type: SET_RECEIVER,
    receiver,
})

export const initStore = (): InitStoreAction => ({
    type: INIT_STORE
})

export const setUser = (authToken: string) =>
    (dispatch, getState, { socketEmit }) => {
        dispatch(
            {
                type: EMIT_EVENTS_TYPES.setUser,
                authToken
            })
        socketEmit(EMIT_EVENTS_TYPES.setUser, authToken);
    }

export const chatMsg = (chat: Chat) =>
    (dispatch, getState, { socketEmit }) => {
        dispatch(
            {
                type: EMIT_EVENTS_TYPES.chatMsg,
                chat
            })
        socketEmit(EMIT_EVENTS_TYPES.chatMsg, chat);
    }

export default function searchReducer(
    state: UserStore = initialState,
    action: UserStoreAction
) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                isLoading: true
            }

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user
            }

        case SIGN_UP_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case LOGIN:
            return {
                ...state,
                isLoading: true,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
            }

        case LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case LOGOUT:
            return {
                ...state,
                isLoading: true,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {},
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case ONLINE_USERS_LIST:
            return {
                ...state,
                onlineUsers: action.payload
            }

        case SET_RECEIVER:
            return {
                ...state,
                currentReceiver: action.receiver
            }

        case INIT_STORE:
            return {
                ...state,
                user: JSON.parse(getItem(USER_KEY))
            }

        default:
            return state
    }
}
