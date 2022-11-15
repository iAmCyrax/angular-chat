import { Component, OnInit } from '@angular/core';
import { Message } from './models/message';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newMessage: string;
  messageList: Message[] = [];

  public get currentAuthorId(): string {
    return this.chatService.socket.id.substring(0, 5);
  }

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message) => {
      this.messageList.push(message);
      console.log(this.messageList);
    });
    this.messageList.shift();
  }

  sendMessage() {
    this.chatService.sendMessage({ content: this.newMessage });
    this.newMessage = '';
  }
}
