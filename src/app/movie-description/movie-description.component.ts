 import { Component, OnInit, Inject } from '@angular/core';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MAT_DIALOG_DATA } from '@angular/material/dialog'

 @Component({
   selector: 'app-movie-description',
   templateUrl: './movie-description.component.html',
   styleUrls: ['./movie-description.component.scss'],
 })
 export class MovieDescriptionComponent implements OnInit {
   constructor(
     public fetchApiData: FetchApiDataService,
     @Inject(MAT_DIALOG_DATA)
     public data: {
       name: string;
       description: string;
     }
   ) {}
   ngOnInit(): void {}
 }