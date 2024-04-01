import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from './models/message';
import { ChatService } from './services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { StartDialogComponent } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newMessage: string;
  messageList: Message[] = [];
  username: string;

  public get currentAuthorId(): string {
    return this.chatService.socket.id.substring(0, 5);
  }

  constructor(
    private chatService: ChatService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const dialog = this.openStartDialog();

    dialog.afterClosed().subscribe(value => { 
      this.username = value;
      this.snackBar.open(`Welcome ${value}!`);
    });

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

  openStartDialog() {
    const dialog = this.dialog.open(StartDialogComponent, { disableClose: true });

    return dialog;
  }
}
