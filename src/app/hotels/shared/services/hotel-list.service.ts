import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { IHotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelListService {
  private readonly HOTEL_API_URL = 'api/hotels';

  constructor(private http: HttpClient) { }

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      catchError(this.handleError)
    );
  }

  public getHotelsById(id: number): Observable<IHotel | undefined> {
    const url = `${this.HOTEL_API_URL}/${id}`;
    if (id === 0) {
      return of(this.getDefaultHotel());
    }
    return this.http.get<IHotel>(url).pipe(
      catchError(this.handleError)
    );
  }

  public createHotel(hotel: IHotel): Observable<IHotel> {
    hotel = {
      ...hotel,
      imageUrl: 'assets/img/hotel-room.jpg',
      id: null
    }
    return this.http.post<IHotel>(this.HOTEL_API_URL, hotel).pipe(
      catchError(this.handleError)
    );
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/${hotel.id}22222`;
    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    );
  }

  public deleteHotel(id:number):Observable<{}>{
    const  url = `${this.HOTEL_API_URL}/${id}`

    return  this.http.delete<IHotel>(url).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.status === 0) {
      errorMessage = `An error occurred: ${error.error}`;
    } else {
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error('Something bad happened; please try again later.' + errorMessage));
  }

  public getDefaultHotel(): IHotel {
    return {
      id: null,
      hotelName: null,
      description: null,
      price: null,
      imageUrl: null,
      rating: null
    };
  }
}
