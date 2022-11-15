import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  message$: BehaviorSubject<Message> = new BehaviorSubject({
    author: '',
    content: '',
  });

  constructor() {}

  socket = io('http://localhost:3000');

  sendMessage(message: Omit<Message, 'author'>) {
    this.socket.emit('message', {
      content: message.content,
      author: this.socket.id.substring(0, 5),
    });
  }

  getNewMessage() {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }
}
