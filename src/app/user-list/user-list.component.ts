import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  users: any[] = [];
  pagedUsers: any[] = [];
  selectedUserIndex: number | null = null;
  filteredUsers: any[] = [];
  searchText: string = '';


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    this.filteredUsers = [...this.users];
    this.updatePagedUsers();
  }
  
  updatePagedUsers(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(start, end);
  }

  deleteUser(): void {
    if (this.selectedUserIndex !== null) {
      const actualIndex = (this.page - 1) * this.pageSize + this.selectedUserIndex;
      this.users.splice(actualIndex, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.filteredUsers = [...this.users];
      this.updatePagedUsers();
      this.selectedUserIndex = null;
    }
  }

  onSearch(event: Event) {
    event.preventDefault();
    const text = this.searchText.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(text) || user.email.toLowerCase().includes(text)
    );
    this.page = 1;
    this.updatePagedUsers();
  }
  
  clearSearch() {
    this.searchText = '';
    this.filteredUsers = [...this.users];
    this.page = 1;
    this.updatePagedUsers();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
  }

  editUser(user: any): void {
    this.router.navigate(['/add-user'], { state: { user } });
  }
  
}
