import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io"

import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import { sendMessage } from "../../src/lib/messageHelper";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}


export default function handler(req: NextApiRequest ,res: NextApiResponseWithSocket) {
  
  if (res.socket.server.io) {
    console.log('Socket is already running')
    res.end()
    return
  } 
  
  console.log('Socket is initializing')
  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on('connection', socket => {
    console.log(`connected ${socket.id}`)

    socket.emit('connection', "connected")

    socket.on("sentMessage", msg => {
      sendMessage(msg)
      
      console.log("message was sent")
    })
  })

  res.end()

}