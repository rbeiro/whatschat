'use client'

import { Avatar } from "@rbeiro-ui/react"
import Link from "next/link"
import { useEffect } from "react";
import { useChatStore } from "../../lib/chatStore";
import { dateFormatter } from "../../utils/formatter";
import s from "./Styles.module.scss"

interface ChatPreviewMessageData {
  agentMessage?: boolean,
  with?: string,
  from?: number | string, 
  msg_body: string,
  timeStamp: string,
  channel: "whatsapp"
}

interface ChatPreviewProps {
  chatId: string;
  lastMessage: ChatPreviewMessageData;
  clientName: string;
  createdAt: Date;
  selected: boolean;
  channel: "whatsapp"
}

export function ChatPreview({ chatId, lastMessage, clientName, createdAt, selected, channel }: ChatPreviewProps) {
  const { selectActiveChat } = useChatStore()

  

  function handlSelectedChat() {
    if(!selected) {
      selectActiveChat(chatId)
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <Link href={"/live-chat"} className={s.container} onClick={handlSelectedChat}>
      <div className={s.customAvatar}>
        <Avatar />
      </div>

      <div className={s.chatDetails}>
        <div>
          <span className={s.userName}>{clientName} {channel}</span>
          <span>
            {dateFormatter(lastMessage.timeStamp)}
          </span>
        </div>
        <span className={s.messagePreview}>{lastMessage.msg_body}</span>
      </div>
    </Link>
  )
}