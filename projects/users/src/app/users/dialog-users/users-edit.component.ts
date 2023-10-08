// src/app/user-dialog/user-dialog.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../users.model';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './users-edit.component.html',
  // styleUrls: ['./user-dialog.component.css'],
})
export class UserEditDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User | undefined },
    public dialogRef: MatDialogRef<UserEditDialogComponent>
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }
}
