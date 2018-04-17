// @flow

import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import { Login } from '../login'
import { SignUp } from '../sign-up'
import { getStore, userStore } from '../../../__mocks__/static-data'

describe('User', () => {
    const store = getStore()

    const props = {
        user: userStore.user,
        errorMessage: '',
        history: {
            push: jest.fn(),
        },
        loginAction: jest.fn()
    }

    it('should call render Login Component properly', () => {
        const login = renderer.create(
            <Login {...props} />
        ).toJSON()
        expect(login).toMatchSnapshot()
    })

    it('should call render SignUp Component properly', () => {
        const signUp = renderer.create(
            <SignUp user={userStore.user} errorMessage={''} />
        ).toJSON()
        expect(signUp).toMatchSnapshot()
    })
})
