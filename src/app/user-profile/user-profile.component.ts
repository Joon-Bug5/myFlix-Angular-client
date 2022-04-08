 import { Component, OnInit } from '@angular/core';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatDialog } from '@angular/material/dialog';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { Router } from '@angular/router';
 import { UserEditComponent } from '../user-edit/user-edit.component';
 
 @Component({
   selector: 'app-user-profile',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.scss'],
 })

 export class UserProfileComponent implements OnInit {
   user: any = [];
   Username = localStorage.getItem('user');
   favMovies: any[] = [];
   favoriteMovies: any[] = []; 
   movies: any[] = [];
 
   constructor(
     public dialog: MatDialog,
     public fetchApiData: FetchApiDataService,
     public snackBar: MatSnackBar,
     public router: Router
   ) {}
 
   ngOnInit(): void {
     this.getUserProfile();
     this.getFavoriteMovies();
   }

   getUserProfile(): void {
     const user = localStorage.getItem('user');
     if (user) {
       this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
         this.user = res;
         console.log(this.user);
         return this.user;
       });
     }
   }

   getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favoriteMovies = res.filter((movie: any) => {
        return this.user.FavoriteMovies.includes(movie._id)
      });
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    })
  }

  removeFavoriteMovie(movieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

   openEditUserDialog(): void {
     this.dialog.open(UserEditComponent, {
       width: '280px',
     });
   }
 }