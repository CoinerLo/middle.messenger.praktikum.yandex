export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string | null;
}

export interface Chat {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  created_by: number,
  last_message: {
    user: Omit<User, 'id' | 'password' | 'display_name'>,
    time: string,
    content: string,
  } | null,
}

export interface Message {
  id: number,
  user_id: number,
  chat_id: number,
  time: string,
  content: string,
  is_read: boolean,
  file: null,
  type: string
}

export interface State {
  user: User,
  chats: Chat[],
  currentChatId: number | null,
  messanges: Record<string, Message[]>,
}
