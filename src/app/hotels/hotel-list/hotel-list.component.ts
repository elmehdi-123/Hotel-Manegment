import {Component, OnInit} from "@angular/core";
import {IHotel} from "../shared/models/hotel";
import {HotelListService} from "../shared/services/hotel-list.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrl:'./hotel-list.component.css'
})
export class HotelListComponent implements OnInit{
  public title = 'Hotel List'
  public hotels: IHotel[] = [];

  public showBadge: boolean = false;

  private _hotelFilter = 'Word';

  public filteredHotels: IHotel[] = [];

  public receivedRating:string = '';

  public errMsg:string = '';

  constructor(private hotelListService: HotelListService) {
  }

  ngOnInit() {
    this.hotelListService.getHotels().subscribe({
      next: (hotels: IHotel[]) => {
        this.hotels = hotels;
        this.filteredHotels = this.hotels;
      },
    error: (err: string) => this.errMsg = err
      }
    );
    this.hotelFilter = '';
  }

  public get hotelFilter():string{
    return this._hotelFilter;
  }

  public set hotelFilter(filter:string){
    this._hotelFilter = filter;

    this.filteredHotels = this._hotelFilter ? this.filterHotels(this._hotelFilter) : this.hotels;
  }

  public filterHotels(criteria:string): IHotel[]{
    criteria = criteria.toLowerCase();
    const res = this.hotels.filter(
      (hotel) => hotel.hotelName.toLowerCase().indexOf(criteria) !== -1
    );

    return res;

  }
  public toggleIsNewBadge(): void {
    this.showBadge = !this.showBadge;
  }

  public receiveRatingClick(message:string){
this.receivedRating = message;
  }
}
