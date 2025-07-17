import {create} from 'zustand';

export const useStore = create((set) => ({
  auth: null,
  chatrooms: [],
  messages: {},
  filteredChatrooms: [],
  setAuth: (auth) => set({ auth, filteredChatrooms: [] }),
  setChatrooms: (chatrooms) => set({ chatrooms, filteredChatrooms: chatrooms }),
  setMessages: (messages) => set({ messages }),
  addChatroom: (chatroom) =>
    set((state) => ({
      chatrooms: [...state.chatrooms, chatroom],
      filteredChatrooms: [...state.chatrooms, chatroom],
    })),
  deleteChatroom: (id) =>
    set((state) => ({
      chatrooms: state.chatrooms.filter((room) => room.id !== id),
      filteredChatrooms: state.chatrooms.filter((room) => room.id !== id),
      messages: { ...state.messages, [id]: undefined },
    })),
  addMessage: (chatroomId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatroomId]: [...(state.messages[chatroomId] || []), message],
      },
    })),
  loadMoreMessages: (chatroomId) => {
    const newMessages = Array.from({ length: 20 }, (_, i) => ({
      id: Math.random().toString(),
      content: `Dummy message ${i}`,
      sender: Math.random() > 0.5 ? 'user' : 'ai',
      type: 'text',
      timestamp: new Date(),
    }));
    set((state) => ({
      messages: {
        ...state.messages,
        [chatroomId]: [...newMessages, ...(state.messages[chatroomId] || [])],
      },
    }));
  },
  setFilteredChatrooms: (filteredChatrooms) => set({ filteredChatrooms }),
}));