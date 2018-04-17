// $FlowFixMe

import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CustomDate } from '../common'
import { chatMsg } from '../user/user-store'
import type { ConversationProps, ConversationStates } from './type-chat'
import './chat.css'

class Conversation extends Component<ConversationProps, ConversationStates> {

    state = {
        chats: [],
        message: ''
    }

    componentWillReceiveProps(nextProps: ConversationProps) {
        if (nextProps !== this.props) {
            this.setState({ chats: [] })
        }
    }


    handleMessageChange = (event: any) => {
        const message = event.target.value;
        this.setState({ message });
    }

    sendMessage = (event: any) => {
        event.preventDefault();
        const newMsg = {
            senderName: `${this.props.userDetails.firstName} ${this.props.userDetails.lastName}`,
            senderId: this.props.userDetails.userId,
            receiverName: this.props.currentReceiver.receiverName,
            receiverId: this.props.currentReceiver.receiverId,
            message: this.state.message,
            createdOn: new Date()
        };
        this.props.chatMsg(newMsg);
        toast.success(`Message is being sent...`, {
            position: toast.POSITION.TOP_CENTER,
        })
        let chats = this.state.chats
        chats.push(newMsg)
        this.setState({ chats, message: '' })
    }

    render() {
        const chatList = this.state.chats.map((chat, index) => {
            let chatClass = chat.senderId === this.props.userDetails.userId
                ? 'right' : 'left'
            return (
                <li key={index} className={chatClass}>
                    <p className="message">{chat.message}</p>
                    <div className="sender-details">
                        <CustomDate className="time" format="MM/DD/YYYY | h:mm A">{chat.createdOn}</CustomDate>
                        <span className="sender">{chat.senderName}</span>
                    </div>
                </li>
            )
        })

        return (
            <div className="conversation">
                <ul className="messages">
                    {chatList}
                </ul>
                {!this.props.currentReceiver.receiverId &&
                    <p>click a name to start the chat</p>
                }
                <form className="converation-form" onSubmit={this.sendMessage}>
                    <input type="text"
                        name="message"
                        value={this.state.message}
                        required
                        autoComplete="off"
                        placeholder="Message"
                        onChange={this.handleMessageChange} />
                    <input type="submit" value="Send" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ userStore: { currentReceiver, user: { authToken, userDetails } } }) => ({
    currentReceiver,
    userDetails,
    authToken
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            chatMsg
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
