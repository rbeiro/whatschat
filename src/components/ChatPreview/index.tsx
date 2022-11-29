'use client'

import { Avatar } from "@rbeiro-ui/react"
import Link from "next/link"
import s from "./Styles.module.scss"

interface ChatPreviewProps {
  chatId: string;
}

export function ChatPreview({ chatId }: ChatPreviewProps) {
  return (
    <Link href={`/chat/${chatId}`} className={s.container}>
      <div className={s.customAvatar}>
        <Avatar />
      </div>

      <div className={s.chatDetails}>
        <div>
          <span className={s.userName}>Lorem Ipsum</span>
          <span>03/11/2022</span>
        </div>
        <span className={s.messagePreview}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non porro accusamus inventore temporibus mollitia vel voluptas. Esse harum quam, eveniet neque expedita nobis quis nam explicabo numquam at iure temporibus!</span>
      </div>
    </Link>
  )
}