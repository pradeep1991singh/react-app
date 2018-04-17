import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logOutAction } from './user-store'
import './user.css'

class UserProfile extends Component<void, void> {

    logOut = () => {
        this.props.logOutAction(this.props.userDetails.userId);
        this.props.history.push({
            pathname: '/login',
        })
    }

    render() {
        const { userDetails } = this.props
        return (
            <div className="user-profile">
                <h4>User Profile</h4>
                <ul>
                    <li>
                        <p>User Name:</p>
                        <p>{`${userDetails.firstName} ${userDetails.lastName}`}</p>
                    </li>
                    <li>
                        <p>Email: </p>
                        <p>{userDetails.email}</p>
                    </li>
                    <li>
                        <p>Mobile number: </p>
                        <p>{userDetails.mobileNumber}</p>
                    </li>
                    <li>
                        <p>UserId:</p>
                        <p>{userDetails.userId}</p>
                    </li>
                </ul>
                <button onClick={this.logOut}>LogOut</button>
            </div>
        )
    }
}

const mapStateToProps = ({ userStore: { user: { userDetails } } }) => ({
    userDetails
})

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        logOutAction
    },
    dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
