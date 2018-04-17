// $FlowFixMe

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Login, SignUp, UserProfile } from './user'
import Chat from './chat/chat'

export default class Routes extends Component<void, void> {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/chat" component={Chat} />
        <Route path="/user-profile" component={UserProfile} />
      </Switch>
    )
  }
}
