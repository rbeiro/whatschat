import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io"

import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {

  const mode = req.query['hub.mode']
  const challenge = req.query['hub.challenge']
  const verify_token = req.query['hub.verify_token']
  const socketConnectionToken = "028f53c1eb0ff477cf44d27ecb310fdc"

  if(req.method === "GET" ) {
    console.log("GET")

    if(mode === 'subscribe' && verify_token === "028f53c1eb0ff477cf44d27ecb310fdc"){
      res.send(challenge)
      res.status(200).end()
    } else {
      res.status(405).end()
    }
  }

  function readReceivedMessage () {
    if (req.body.object) { 
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
        const phone_number_id =
          req.body.entry[0].changes[0].value.metadata.phone_number_id
        const from = req.body.entry[0].changes[0].value.messages[0].from
        const msg_body = req.body.entry[0].changes[0].value.messages[0].text.body
        
        return {
          phone_number_id,
          from, 
          msg_body,
          timeStamp: new Date()
        }
      }
    }
  }


  if(req.method === "POST") {
    console.log("POST")
    const message = readReceivedMessage() ? readReceivedMessage() : {
      agentMessage: false,
      from: (5515991689362).toString(), 
      to: 111,
      msg_body: req.body.message,
      timeStamp: new Date(),
      channel: "whatsapp"
    }

    const { io } =  res.socket.server
    io?.emit("newIncomingMessage", message)

    console.log(message)
    res.status(200).end()
  }
} 