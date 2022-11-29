import s from "../src/styles/Home.module.scss"
import * as Skeleton from "../src/components/Skeleton"

export default function Page() {
  return(
    <div className={s.container}>
      <h2>Não há nenhuma conversa selecinada!</h2>
    </div>
  )
}