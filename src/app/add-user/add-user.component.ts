import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  isEditMode: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private toastr: ToastrService
  ) { }

  userForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
  })
  get form() {
    return this.userForm.controls;
  }
  ngOnInit(): void {
    const navState = history.state;
    if (navState.user) {
      this.isEditMode = true;
      this.userForm.patchValue(navState.user);
    }
  }

  goBack() {
    this.location.back()
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
  
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));
  
      this.userForm.reset();
      this.toastr.success('User added successfully!');
      this.router.navigate(['/user-list']);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onUpdate() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
  
      const index = users.findIndex((u: any) => u.email === updatedUser.email);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        this.toastr.success('User updated successfully!');
        this.router.navigate(['/user-list']);
      } else {
        this.toastr.error('User not found!');
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  

}
