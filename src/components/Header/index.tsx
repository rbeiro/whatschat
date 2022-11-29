'use client'

import { Avatar } from "@rbeiro-ui/react"
import { ChatPreview } from "../ChatPreview"

import s from "./Styles.module.scss"

export function Header() {
  return (
    <header className={s.container}>
      <div className={s.userContainer}>
        <div className={s.userDetails}>
          <Avatar />
          <h2>Gabriel</h2>
        </div>
        <span>settings</span>
      </div>

      <nav className={s.navContainer}>
        <ChatPreview chatId="b433d3c45dec42f90f817d90f1917931"/>
        <ChatPreview chatId="8603cff75a70c0aa148e8044e08b65ce"/>
        <ChatPreview chatId="a4c52e3bfb811ea48bf60f6bfd1d2c71"/>
        <ChatPreview chatId="683287ce293bd044559186a754149fa0"/>
        <ChatPreview chatId="f264b51e16b50c33aaaa6aa630ced537"/>
      </nav>
    </header>
  )
}