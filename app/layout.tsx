import { ReactNode } from "react";
import { Header } from "../src/components/Header";

import s from "../src/styles/Layout.module.scss"
import "../src/styles/global.scss"

export default function RootLayout({children}: {children: ReactNode}) {
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
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <Header />

            <main className={s.mainContainer}>
              {children}
            </main>
          </div>
        </div>
        
        
      </body>
    </html>
  )
} 