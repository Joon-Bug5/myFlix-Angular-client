import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials= { Username: '', Password: '' };
  
  constructor(
      public UserRegistrationService: UserRegistrationService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

  loginUser(): void {
    this.UserRegistrationService.userLogin(this.userCredentials).subscribe((response) => {
      this.dialogRef.close();

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', this.userCredentials.Username);
      console.log(response);
      this.snackBar.open('You are successfully logged in', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response)
      this.snackBar.open('Something went wrong :(', 'OK', {
        duration: 2000
      });
    });
  }
}