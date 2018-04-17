import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { initStore } from '../../user/user-store'
import { APP_NAME } from '../index'
import logo from '../../assets/logo.svg'
import user from '../../assets/user.png'
import './header.css'

class Header extends Component<void, void> {

  componentWillMount() {
    // Init store
    this.props.initStore()
  }

  render() {
    return (
      <nav className="navbar">
        <Link className="navbar-brand nav-item " to="/">
          <img src={logo} className="logo" alt="logo" />
          <span className="logo-label">{APP_NAME}</span>
        </Link>

        <Link className="user-profile nav-item " to="/user-profile">
          <img src={user} className="user-icon" alt="user-icon" />
          <span>{this.props.currentUserName}</span>
        </Link>
      </nav>
    )
  }
}

const mapStateToProps = ({ userStore: { user } }) => ({
  currentUserName: user.userDetails ? `${user.userDetails.firstName} ${user.userDetails.lastName}` : 'Anonymous'
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    initStore
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
