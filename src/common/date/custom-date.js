// @flow

import React, { Component } from 'react'
import moment from 'moment'

import type { CustomDateProps } from './type-date'

export default class CustomDate extends Component<CustomDateProps, void> {
  render() {
    const { format, children } = this.props
    const customDate = moment(children).format(format)
    return <span {...this.props}>{customDate}</span>
  }
}
