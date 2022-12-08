'use client'
import { useCallback, useEffect, useRef, useState } from "react";

import { Avatar } from "@rbeiro-ui/react";
import { Message } from "../../../src/components/Message";

import s from "../../../src/styles/Chat.module.scss"
import { socket } from "../../../src/lib/socket-client";
import { useChatStore } from "../../../src/lib/chatStore";

export type PageProps = {
  params: {
    chatId: string
  };
  children?: React.ReactNode;
}

interface MessageData {
  phone_number_id?: number,
  from: number | string, 
  msg_body: string,
  timeStamp: Date,
}

interface Chat {
  createdAt: Date
  chatId: string,
  with: string,
  messagesData: MessageData[]
  finished: boolean,
  unread: boolean,
}

export default function Page({ params }: PageProps) {
  const { chatId } = params
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<MessageData[]>([])
  const [chatData, setChatData] = useState<Chat>()

  const currentChat = useChatStore(useCallback((state) => state.getChatById(chatId), [chatId ]))

  socket.on("newIncomingMessage", () => {
    if(currentChat) {
      setChatData(currentChat)
    }
  })

  useEffect(() => { 
    if(chatData === undefined) {
      setChatData(currentChat)
    }
  }, [])


  useEffect(() => {
    scrollToBottom()
  },[messages])

  const messagesEndRef = useRef<HTMLInputElement>(null)

  function handleMessageSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    socket.emit("sentMessage", newMessage)
    const formattedNewMessage = {
      from: "sender",
      msg_body: newMessage,
      timeStamp: new Date(),
    }
    setMessages(state => [...state, formattedNewMessage])
    setNewMessage("")
  }
  
  function scrollToBottom() {
    if(messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView()
    }
  }
  return (
    <div className={s.container}>
      <div className={s.topUserBar}>
        <div className={s.userDetails}>
          <Avatar/>
          <h2>Daiana</h2>
        </div>

        <div className={s.optionsContainer}>
          <span>searchMessages</span>
          <span>settings</span>
        </div>
      </div>

      <section className={s.messagesContainer}>
        <div className={s.messageContainerWhiteSpace}/>
        <div>
          {chatData?.messagesData.map(message => {
            if (message.msg_body !== "") {
              if ( message.from === "sender") {
                return (
                  <Message sentMessage content={message.msg_body} key={message.timeStamp.toString() + Math.random()} />
                )
              }

              return (
                <Message sentMessage={false} content={message.msg_body} key={message.timeStamp.toString() + Math.random()} />
              )
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </section>

      <div className={s.sendMessageInputContainer}>
        <form action="" onSubmit={(e: React.SyntheticEvent) => handleMessageSubmit(e)}>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}