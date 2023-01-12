import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from './models/message';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newMessage: string;
  messageList: Message[] = [];

  public get currentAuthorId(): string {
    return this.chatService.socket.id.substring(0, 5);
  }

  constructor(
    private chatService: ChatService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message) => {
      this.messageList.push(message);
    });
    this.messageList.shift();
  }

  sendMessage() {
    // If the message is blank:
    if (!this.newMessage) {
      this.snackBar.open('Please type a message.', 'OK', { duration: 3000 });
      // this.errorMessage = 'Please type a message.';
      return;
    }

    this.chatService.sendMessage({
      content: this.newMessage,
      timestamp: new Date(),
    });
    this.newMessage = '';
  }
}
