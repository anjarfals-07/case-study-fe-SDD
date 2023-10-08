import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../users.service';
import { User } from '../users.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./dialog.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | undefined;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  saveUser() {
    const userData = this.form.value;
    if (this.user) {
      userData.id = this.user.id;
      this.userService.updateUser(userData).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.userService.createUser(userData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
