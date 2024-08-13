import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  ngOnInit(): void {
    this.isFetching.set(true);
    // putting subscribe in the component so we can unsubscribe on destroy
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places.set(places);
      },
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
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  isFetching = signal(false);
  error = signal('');

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });

    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
