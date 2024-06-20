import {Injectable} from "@angular/core";
import {IHotel} from "../models/hotel";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private readonly HOTEL_API_URL = 'api/hotels';

  constructor(private http: HttpClient) {
  }

  public getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.HOTEL_API_URL).pipe(
      tap(hotels => console.log('Hotels: ', hotels)),
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
    )
  }

  public updateHotel(hotel: IHotel): Observable<IHotel> {
    const url = `${this.HOTEL_API_URL}/${hotel.id}`;

    return this.http.put<IHotel>(url, hotel).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
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
