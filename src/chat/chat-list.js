// $FlowFixMe

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUser, setReceiver } from '../user/user-store'
import type { ChatProps } from './type-chat'
import './chat.css'
import type { Receiver } from '../user/type-user';

export class ChatList extends Component<ChatProps, void> {
  componentWillMount() {
    this.props.setUser(this.props.authToken);
  }

  setReceiver = (event: any, receiver: Receiver) => {
    this.props.setReceiver(receiver)
  }

  render() {
    const { onlineUsers, currentReceiver } = this.props
    const onlineUsersList = Object.values(onlineUsers).map((onlineUser, index) => {
      const receiverId = Object.keys(onlineUsers)[index];
      const isActive = receiverId === currentReceiver.receiverId
      return (
        <li key={index} className={isActive ? 'active' : ''}
          onClick={(event) => this.setReceiver(event, {
            receiverName: onlineUser,
            receiverId
          })}>
          {onlineUser}
        </li>
      )
    })

    return (
      <div className="online-users-list">
        <h4>Online Users</h4>
        <ul>{onlineUsersList}</ul>
      </div>
    )
  }
}

const mapStateToProps = ({ userStore: { onlineUsers, currentReceiver, user: { authToken } } }) => ({
  onlineUsers,
  currentReceiver,
  authToken
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser,
      setReceiver
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
