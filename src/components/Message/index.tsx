import s from "./Styles.module.scss"
import corner from '../../../public/corner.svg'
import Image from "next/image"

interface MessageProps {
  sentMessage: boolean;
  content: string;
}

export function Message({ sentMessage, content }: MessageProps) {
  return(
    <div className={`${sentMessage ? s.sentMessage: s.receivedMessage} ${s.messageContainer}`}>
      <p>{content}</p>
      
    </div>
  )
}