// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { signUpAction } from './user-store'
import { LOGGING_IN } from '../common'
import './user.css'

import type { SignUpProps, SignUpStates } from './type-user'

export class SignUp extends Component<SignUpProps, SignUpStates> {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    }

    componentWillReceiveProps(nextProps: SignUpProps) {
        if (nextProps !== this.props) {
            const { user, errorMessage } = nextProps
            if (Object.keys(user).length > 0) {
                toast.success(LOGGING_IN, {
                    position: toast.POSITION.TOP_CENTER,
                })
                this.props.history.push({
                    pathname: '/chat',
                    params: user
                })
            }

            if (errorMessage) {
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER,
                })
            }
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
        const { password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            toast.error(`Password doesn't match.`, {
                position: toast.POSITION.TOP_CENTER,
            })
        } else {
            this.props.signUpAction(this.state)
        }
    }

    render() {
        const { firstName, lastName, email, mobileNumber, password, confirmPassword } = this.state

        return (
            <div className="form-container">
                <h4>Sign Up</h4>
                <form name="sign-up" onSubmit={this.handleSubmit}>
                    <input type="text"
                        name="firstName"
                        value={firstName}
                        required
                        placeholder="First Name"
                        onChange={this.handleInputChange} />

                    <input type="text"
                        name="lastName"
                        value={lastName}
                        required
                        placeholder="Last Name"
                        onChange={this.handleInputChange} />

                    <input type="email"
                        name="email"
                        value={email}
                        required
                        placeholder="Email"
                        onChange={this.handleInputChange} />

                    <input type="tel"
                        name="mobileNumber"
                        value={mobileNumber}
                        required
                        placeholder="Mobile Number"
                        onChange={this.handleInputChange} />

                    <input type="password"
                        name="password"
                        value={password}
                        required
                        placeholder="Password"
                        onChange={this.handleInputChange} />

                    <input type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        required
                        placeholder="Confirm Password"
                        onChange={this.handleInputChange} />

                    <input type="submit" value="Sign Up" />
                </form>
            </div >
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
            signUpAction
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
