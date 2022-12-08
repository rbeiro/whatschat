'use client'
import { ReactNode, useEffect } from "react";
import { SessionProvider } from 'next-auth/react';

import s from "../src/styles/Layout.module.scss"
import "../src/styles/global.scss"
import { socket } from "../src/lib/socket-client";


export default function RootLayout({children}: {children: ReactNode}) {
  
  useEffect(() => {
    const socketInitializer = async () => {

      await fetch('/api/socket')
  
      socket.on('connection', () => {
        console.log('connected')
      })

      socket.on('disconnet', () => {
        console.log('disconneted')
      })
    }

    socketInitializer()

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('newIncomingMessage')
    };
  },[])

  return(
    <html lang="pt-br" className="dark-theme">
      <head>
        <title>Whatschat</title>
        {/* eslint-disable-next-line */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
      </head>

      <body className={s.container}>
          {children}
      </body>
    </html>
  )
} 