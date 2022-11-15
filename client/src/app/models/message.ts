export type MessageType = 'message' | 'connection';

export interface Message {
  content: string;
  author: string;
  type?: MessageType;
}
