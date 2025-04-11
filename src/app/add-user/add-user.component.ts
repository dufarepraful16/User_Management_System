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

}
