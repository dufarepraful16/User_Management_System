import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  totalCount: number = 0;
adminCount: number = 0;
userCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    console.log("users", this.users);

this.totalCount = this.users.length;
this.adminCount = this.users.filter(user => user.role === 'Admin').length;
this.userCount = this.users.filter(user => user.role === 'User').length;

console.log("this.totalCount", this.totalCount);
console.log("this.adminCount", this.adminCount);
console.log("this.userCount", this.userCount);

    
  }

}
