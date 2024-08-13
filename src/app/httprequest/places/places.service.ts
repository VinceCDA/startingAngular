import { Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient: HttpClient;
  private errorService: ErrorService;
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  constructor(httpClient: HttpClient, errorService: ErrorService) {
    this.httpClient = httpClient;
    this.errorService = errorService;
  }

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places. Please try again later.'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces!),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((x) => x.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to store selected place.');
          return throwError(() => new Error('Failed to store selected place.'));
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((x) => x.id === place.id)) {
      this.userPlaces.update((prev) => prev.filter((x) => x.id !== place.id));
    }

    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to delete selected place.');
          return throwError(
            () => new Error('Failed to remove selected place.')
          );
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body?.places),
        catchError((error, obs) => throwError(() => new Error(errorMessage)))
      );
  }
}
