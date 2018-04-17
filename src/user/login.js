// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { loginAction } from './user-store'
import { LOGGING_IN } from '../common'
import './user.css'

import type { LoginProps, LoginStates, User } from './type-user'

export class Login extends Component<LoginProps, LoginStates> {

    state = {
        email: '',
        password: ''
    }

    componentWillMount() {
        this.validateUser(this.props.user, this.props.errorMessage)
    }

    componentWillReceiveProps(nextProps: LoginProps) {
        if (nextProps !== this.props) {
            const { user, errorMessage } = nextProps
            this.validateUser(user, errorMessage)
        }
    }

    validateUser = (user: User, errorMessage: string) => {
        if (Object.keys(user).length > 0) {
            toast.success(LOGGING_IN, {
                position: toast.POSITION.TOP_CENTER,
            })
            this.props.history.push({ pathname: '/chat' })
        }

        if (errorMessage) {
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER,
            })
        }
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.loginAction(this.state)
    }

    render() {
        const { email, password } = this.state
        return (
            <div className="form-container">
                <h4 className="page-title">Login</h4>
                <form name="login" onSubmit={this.handleSubmit}>
                    <input type="email"
                        name="email"
                        value={email}
                        required
                        placeholder="Email"
                        onChange={this.handleInputChange} />

                    <input type="password"
                        name="password"
                        value={password}
                        required
                        placeholder="Password"
                        onChange={this.handleInputChange} />

                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ userStore: { user, error: { message: errorMessage } } }) => ({
    user,
    errorMessage
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loginAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Login)
