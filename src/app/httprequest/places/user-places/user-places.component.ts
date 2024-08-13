import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');
  myPlaces = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      complete: () => {
        this.isFetching.set(false);
      },
      error: (error: Error) => {
        console.log(error);
        this.error.set(error.message);
        // this.error.set(
        //   'Something went wrong fetching the available places. Please try again later.'
        // );
      },
    });
    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onSelectPlace(place: Place) {
    const subscription = this.placesService.removeUserPlace(place).subscribe({
      next: (resData) => {
        console.log(resData);
      },
    });

    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
