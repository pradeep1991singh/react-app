// @flow

import React, { Component } from 'react'
import { UserList, Conversation } from './index'

export default class Chat extends Component<void, void> {
  render() {
    return (
      <div className="chat">
        <UserList />
        <Conversation />
      </div>
    )
  }
}
