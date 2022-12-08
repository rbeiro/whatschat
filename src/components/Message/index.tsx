import s from "./Styles.module.scss"
import corner from '../../../public/corner.svg'
import Image from "next/image"

interface MessageProps {
  sentMessage: boolean;
  content: string;
  timestamp: string;
}

export function Message({ sentMessage, content, timestamp }: MessageProps) {
  return(
    <div className={`${sentMessage ? s.sentMessage: s.receivedMessage} ${s.messageContainer}`}>
      <p>{content} <span className={s.timestamp}>{timestamp}</span></p>
    </div>
  )
}