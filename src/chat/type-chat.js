// @flow

import type { Receiver, User, UserDetails } from '../user/type-user'

export type Chat = {
    chatId?: string,
    senderName: string,
    senderId: string,
    receiverName: string,
    receiverId: string,
    message: string,
    createdOn: Date,
}

export type ChatProps = {
    onlineUsers: {
        +[string]: User
    },
currentReceiver: Receiver,
    authToken: string,
        setUser: (authToken: string) => void;
setReceiver: (receiver: Receiver) => void;
}

export type ConversationProps = {
    currentReceiver: Receiver,
    userDetails: UserDetails,
    authToken: string,
    chatMsg: (chat: Chat) => void;
}

export type ConversationStates = {
    chats: Array<Chat>,
    message: string
}
