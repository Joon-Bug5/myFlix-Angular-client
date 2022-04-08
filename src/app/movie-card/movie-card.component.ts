 import { Component, OnInit } from '@angular/core';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatDialog } from '@angular/material/dialog';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { GenreViewComponent } from '../genre-view/genre-view.component';
 import { DirectorViewComponent } from '../director-view/director-view.component';
 import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
 
 @Component({
   selector: 'app-movie-card',
   templateUrl: './movie-card.component.html',
   styleUrls: ['./movie-card.component.scss'],
 })
 export class MovieCardComponent implements OnInit {
   movies: any[] = [];
   Favorites: any[] = [];
   user: any[] = [];
 
   constructor(
     public fetchApiData: FetchApiDataService,
     public dialog: MatDialog,
     public snackBar: MatSnackBar
   ) {}
 
   ngOnInit(): void {
     this.getMovies();
     this.getFavoriteMovies();
   }

   getMovies(): void {
     this.fetchApiData.getAllMovies().subscribe((resp: any) => {
       this.movies = resp;
       console.log(this.movies);
       return this.movies;
     });
   }

   openGenreDialog(name: string, description: string): void {
     this.dialog.open(GenreViewComponent, {
       data: {
         name,
         description,
       },
       width: '500px',
     });
   }

   openDirectorDialog(name: string, bio: string, birthdate: Date): void {
     this.dialog.open(DirectorViewComponent, {
       data: { name, bio, birthdate },
       width: '500px',
     });
   }
 
   openMovieDescDialog(name: string, description: string): void {
     this.dialog.open(MovieDescriptionComponent, {
       data: { name, description },
       width: '500px',
     });
   }

   getFavoriteMovies(): void {
     const user = localStorage.getItem('user');
     this.fetchApiData.getUserProfile(user).subscribe((resp: any) => {
       this.Favorites = resp.FavoriteMovies;
       console.log(this.Favorites);
     });
   }

   addFavoriteMovies(movieID: string, title: string): void {
     this.fetchApiData.addFavoriteMovies(movieID).subscribe(() => {
       this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
         duration: 4000,
       });
       this.ngOnInit();
     });
     return this.getFavoriteMovies();
   }
 
   removeFavoriteMovies(movieID: string, title: string): void {
     this.fetchApiData.deleteFavoriteMovies(movieID).subscribe((resp: any) => {
       console.log(resp);
       this.snackBar.open(
         `${title} has been removed from your favorites!`,
         'OK',
         {
           duration: 4000,
         }
       );
       this.ngOnInit();
     });
     return this.getFavoriteMovies();
   }

   isFavorite(movieID: string): boolean {
     return this.Favorites.some((movie) => movie._id === movieID);
   }

   toggleFavorite(movie: any): void {
     this.isFavorite(movie._id)
       ? this.removeFavoriteMovies(movie._id, movie.Title)
       : this.addFavoriteMovies(movie._id, movie.Title);
   }
 }