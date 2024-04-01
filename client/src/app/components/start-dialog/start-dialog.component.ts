import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.scss']
})
export class StartDialogComponent implements OnInit {
  username: string;

  constructor(private dialogRef: MatDialogRef<StartDialogComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  closeDialog() {
    if (!this.username) {
      this.snackBar.open('Please write your name!', undefined, { duration: 2000 });
      return;
    }
    this.dialogRef.close(this.username);
  }
}
