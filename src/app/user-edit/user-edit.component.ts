 import { Component, OnInit, Input, Inject } from '@angular/core';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatDialogRef } from '@angular/material/dialog';
 import { MatSnackBar } from '@angular/material/snack-bar';
 
 @Component({
   selector: 'app-user-edit',
   templateUrl: './user-edit.component.html',
   styleUrls: ['./user-edit.component.scss'],
 })
 export class UserEditComponent implements OnInit {
   Username = localStorage.getItem('user');
   user: any = JSON.parse(localStorage.getItem('user') || '');
 
   constructor(
     public fetchApiData: FetchApiDataService,
     public dialogRef: MatDialogRef<UserEditComponent>,
     public snackBar: MatSnackBar
   ) {}
 
   @Input() userProfile = {
     Username: this.user.Username,
     Password: this.user.Password,
     Email: this.user.Email,
     Birthdate: this.user.Birthdate,
   };
 
   ngOnInit(): void {
     this.getUser();
   }

   getUser(): void {
     const user = localStorage.getItem('user');
     this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
       this.user = resp;
     });
   }

   editUser(): void {
    this.fetchApiData.editUserProfile(this.userProfile).subscribe((resp) => {
      this.dialogRef.close();

      // update profile in localstorage
      localStorage.setItem('Username', this.userProfile.Username);
      localStorage.setItem('Password', this.userProfile.Password);

      this.snackBar.open('Your profile was updated successfully!', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
 }