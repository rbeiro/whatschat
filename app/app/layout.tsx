'use client'
import { ReactNode, useEffect } from "react";
import { AppHeader } from "../../src/components/AppHeader";
import { SessionProvider } from 'next-auth/react';

import s from "../../src/styles/AppLayout.module.scss"
import "../../src/styles/global.scss"
import { socket } from "../../src/lib/socket-client";


export default function AppRootLayout({children}: {children: ReactNode}) {

  return(
    <div className={s.container}>
      <div className={s.contentWrapper}>
      <div className={s.content}>
        <AppHeader />

        <main className={s.mainContainer}>
          {children}
        </main>
      </div>
    </div>
    </div>
  )
} 