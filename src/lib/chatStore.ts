import create from 'zustand'

interface MessageData {
  agentMessage?: boolean,
  with?: string,
  from?: number | string, 
  msg_body: string,
  timeStamp: string,
  channel: "whatsapp"
}

interface Chat {
  createdAt: Date
  chatId: string,
  with: string,
  messagesData: MessageData[]
  finished: boolean,
  unread: boolean,
  selected: boolean,
  channel: "whatsapp"
}

interface ChatState {
  openedChats: Chat[],     
  addNewChat: (chat: Chat) => void
  addNewMessage: (messageData: MessageData) => void
  checkIfChatAlreadyExists: (incomingMessageData: MessageData) => {
    chatAlreadyExists: boolean
  }
  getChatById: (chatId: string) => Chat | undefined
  selectActiveChat: (chatId: string) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  openedChats: [],
  getChatById: (chatId) => {
    const currentOpenedChats = get().openedChats
    const chatById = currentOpenedChats.find(currChat => currChat.chatId === chatId)
    return chatById
  },
  checkIfChatAlreadyExists: (incomingMessageData) => {
    const currentOpenedChats = get().openedChats
    const filteredChat = currentOpenedChats.filter(chat => chat.with.toString() === incomingMessageData.from?.toString())

      if(filteredChat.length > 0) {
        return {
          chatAlreadyExists: true,
        }
      }
  
      return {
        chatAlreadyExists: false,
      }
  },
  addNewChat: (chat) => set(state => ({ openedChats: [chat, ...state.openedChats]})),
  addNewMessage: (messageData) => {
    const currentOpenedChats = get().openedChats
    const updatedOpenedChats = currentOpenedChats.map((currChat) => {
      if(messageData.agentMessage) {
        if(currChat.with.toString() === messageData.with?.toString()) {
          const updatedChat = {
            ...currChat,
            messagesData: [...currChat.messagesData, messageData]
          }
          return updatedChat
        }
      }
      if(currChat.with.toString() === messageData.from?.toString()) {
        const updatedChat = {
          ...currChat,
          messagesData: [...currChat.messagesData, messageData]
        }
        return updatedChat
      }

      return currChat
    })

    console.log(updatedOpenedChats)

    set({
      openedChats: updatedOpenedChats
    })
  },
  selectActiveChat: (chatId) => {
    const currentOpenedChats = get().openedChats
    const updatedOpenedChats = currentOpenedChats.map((currChat) => {

      if(currChat.chatId === chatId) {
        const updatedChat = {
          ...currChat,
          selected: true, 
        }
        return updatedChat
      }

      return {
        ...currChat,
        selected: false,
      }
    })

    console.log(updatedOpenedChats)

    set({
      openedChats: updatedOpenedChats
    })
  }
}))