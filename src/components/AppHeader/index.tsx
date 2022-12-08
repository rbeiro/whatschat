'use client'
// import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Button } from "@rbeiro-ui/react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useChatStore } from "../../lib/chatStore"
import { socket } from "../../lib/socket-client"
import { supabase } from "../../lib/supabase"
import { ChatPreview } from "../ChatPreview"

import s from "./Styles.module.scss"

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
  selected: boolean,
  channel: "whatsapp"
}

export function AppHeader() {
  
  const {
    openedChats,
    addNewChat,
    addNewMessage,
    checkIfChatAlreadyExists
  } = useChatStore()


  useEffect(() => {
    socket.on('newIncomingMessage', (newIncomingMessage: MessageData) => {
      const { chatAlreadyExists } = checkIfChatAlreadyExists(newIncomingMessage)

      if(chatAlreadyExists) {
        addNewMessage(newIncomingMessage)
      } else {
        if(newIncomingMessage.from) {
          const newChat: Chat = {
            createdAt: new Date(),
            chatId: `${newIncomingMessage.from}-06122022-1425`,
            finished: false,
            unread: true,
            messagesData: [newIncomingMessage],
            with: newIncomingMessage.from.toString(),
            selected: false,
            channel: newIncomingMessage.channel
          }
          addNewChat(newChat)
        }
      }
    })

    return () => {
      socket.off("newIncomingMessage")
    }
  }, [addNewChat, addNewMessage, checkIfChatAlreadyExists])

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  async function handleUserLogin() {
    signIn('google')
  }

  if(isLoggedIn) {
    return (
      <header className={s.container}>
        <div className={s.agentContainer}>
          <div className={s.agentDetails}>
            <Avatar />
            <h2>Gabriel</h2>
          </div>
          <span>settings</span>
        </div>

        <nav className={s.navContainer}>
          {openedChats.map(chat => {
            if(!chat.finished) {
              return (
                <ChatPreview 
                  key={chat.chatId + Math.random()}
                  chatId={chat.chatId} 
                  lastMessage={chat.messagesData[chat.messagesData.length - 1]}
                  clientName={chat.with}
                  createdAt={chat.createdAt}
                  selected={chat.selected}
                  channel={chat.channel}
                />
              )
            }
          }) }
        </nav>
      </header>
    )
  }

  return (
    <header className={s.container}>
      <div className={s.loginContainer}>
        <h2>
          Você não está logado no momento. Por favor <Link href={"/sign-in"}> <i>cadastre-se</i></Link> ou faça login:
        </h2>
        <Button onClick={handleUserLogin}>Entrar</Button>
      </div>
    </header>
  )
}