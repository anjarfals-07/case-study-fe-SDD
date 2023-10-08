import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './users.model';
import { UserService } from './users.service';
import { UserFormComponent } from './dialog-users/users-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from './dialog-users/users-edit.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  // styleUrls: ['./user-list.component.css'],
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public currentPageIndex = 0;

  // Deklarasikan dataSource
  public dataSource: MatTableDataSource<User>;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource.data = users; // Perbarui data source
      this.paginator.firstPage();
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { user: undefined },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshUsers();
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshUsers();
    });
  }

  deleteUser(userId: number) {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Hapus pengguna dari daftar secara lokal
        this.users = this.users.filter((user) => user.id !== userId);
      });
    }
  }
  private refreshUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.paginator.firstPage(); // Kembali ke halaman pertama setelah memuat data
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    // Perbarui paginator pada data source
    this.dataSource.paginator = this.paginator;
    this.refreshUsers();
  }
}
