'use client'
import { useEffect, useRef, useState } from "react";

import { Avatar } from "@rbeiro-ui/react";
import { Message } from "../../../src/components/Message";

import s from "../../src/styles/Chat.module.scss"
import { socket } from "../../../src/lib/socket-client";
import { useChatStore } from "../../../src/lib/chatStore";
import { getHoursAndMinutes } from "../../../src/utils/formatter";
import { parseISO } from "date-fns";

export type PageProps = {
  children?: React.ReactNode;
}

interface MessageData {
  agentMessage?: boolean,
  with?: string,
  from?: number | string, 
  msg_body: string,
  timeStamp: string,
  channel: "whatsapp"
}



interface Chat {
  createdAt: Date
  chatId: string,
  with: string,
  messagesData: MessageData[]
  finished: boolean,
  unread: boolean,
  channel: "whatsapp"
}

export default function Page({  }: PageProps) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<MessageData[]>([])

  const { openedChats, addNewMessage } = useChatStore()
  const selectedChat = openedChats.find(chat => chat.selected === true)

  useEffect(() => {
    scrollToBottom()
  },[selectedChat])

  const messagesEndRef = useRef<HTMLInputElement>(null)

  
  function scrollToBottom() {
    if(messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView()
    }
  }
  
  function handleMessageSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const formattedNewMessage: MessageData = {
      agentMessage: true,
      with: selectedChat?.with,
      msg_body: newMessage,
      timeStamp: new Date().toString(),
      channel: "whatsapp"
    }
    socket.emit("sentMessage", formattedNewMessage)
    addNewMessage(formattedNewMessage)
    setNewMessage("")
  }

  function handleCloseChat() {
    console.log("chat is closing")
  }
  if(selectedChat === undefined) {
    return (
      <div className={s.pageCentered}>
        <h2>Não há nenhuma conversa selecinada!</h2>
      </div>
    )
  }
  return (
    <div className={s.container}>
      <div className={s.topUserBar}>
        <div className={s.userDetails}>
          <Avatar/>
          <h2>{selectedChat.with}</h2>
        </div>

        <div className={s.optionsContainer}>
          <span>searchMessages</span>
          <span>settings</span>
        </div>
      </div>

      <section className={s.messagesContainer}>
        <div className={s.messageContainerWhiteSpace}/>
        <div>
          {selectedChat?.messagesData.map(message => {

            if (message.msg_body !== "") {
              if ( message.agentMessage ) {
                return (
                  <Message 
                    sentMessage 
                    content={message.msg_body} 
                    key={message.timeStamp.toString() + message.msg_body} 
                    timestamp={getHoursAndMinutes(message.timeStamp)}
                  />
                )
              }

              return (
                <Message 
                  sentMessage={false} 
                  content={message.msg_body} 
                  key={message.timeStamp.toString() + message.msg_body} 
                  timestamp={getHoursAndMinutes(message.timeStamp)}
                />
              )
            }
          }) }
          <div ref={messagesEndRef} />
        </div>
      </section>

      <div className={s.sendMessageInputContainer}>
        <form action="" onSubmit={(e: React.SyntheticEvent) => handleMessageSubmit(e)}>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
          <button type="submit">Enviar</button>
          <button type="button" onClick={handleCloseChat} >Encerrar</button>
        </form>
      </div>
    </div>
  )
}