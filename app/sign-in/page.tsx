'use client'
import { Button } from "@rbeiro-ui/react"
import React, { useState } from "react"
import { supabase } from "../../src/lib/supabase"
import s from "../../src/styles/Home.module.scss"

export default function Page() {
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  function handleUserEmailInput(message: string) {
    setUserEmail(message)
  }
  function handleUserPasswordInput(message: string) {
    setUserPassword(message)
  }

  async function handleUserSignin(e: React.FormEvent) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    })

  

    console.log(data)
    console.log(error)
  }
  return(
    <div className={s.container}>
      <form onSubmit={(e) => handleUserSignin(e)}>

        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="text" value={userEmail} onChange={e => handleUserEmailInput(e.target.value)}/>

        <label htmlFor="email">Password</label>
        <input name="password" id="password" type="password" value={userPassword} onChange={e => handleUserPasswordInput(e.target.value)}/>
        <Button type="submit">Cadastrar-se</Button>
      </form>
    </div>
  )
}