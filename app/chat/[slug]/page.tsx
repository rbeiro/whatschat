'use client'

import { Avatar } from "@rbeiro-ui/react";
import { useEffect, useRef, useState } from "react";
import { Message } from "../../../src/components/Message";
import s from "../../../src/styles/Chat.module.scss"

export type PageProps = {
  params: {
    slug: string
  };
  children?: React.ReactNode;
}

export default function Page({params}: PageProps) {
  const [sentMessages, setSentMessage] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState("")

  const messagesEndRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  },[sentMessages])

  function handleMessageSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if(newMessage !== "") {
      setSentMessage(state => [...state, newMessage])
      setNewMessage("")
    }
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
          <Message sentMessage content={"Oi"}/>
          <Message sentMessage content={"Oi"}/>
          <Message sentMessage={false} content={"fala"}/>
          <Message sentMessage={false} content={"?"}/>
          {sentMessages.map(content => {
            if (content !== "") {
              return (
                <Message sentMessage content={content} key={content + Math.random()} />
              )
            }
          })}
          <div ref={messagesEndRef} />
        </div>
      </section>

      <div className={s.sendMessageInputContainer}>
        <form action="" onSubmit={(e: React.SyntheticEvent) => handleMessageSubmit(e)}>
          <input type="text" value={newMessage}  onChange={(e) => setNewMessage(e.target.value)}/>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}