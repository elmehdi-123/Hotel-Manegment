import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HotelListService} from "../shared/services/hotel-list.service";
import {IHotel} from "../shared/models/hotel";

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {


  public hotelForm: FormGroup = this.fn.group({});

  public hotel:IHotel = <IHotel>{};

  public pageTitle:string = '';

  constructor(
    private fn: FormBuilder,
    public rout:ActivatedRoute,
    public hotelListService:HotelListService
  ) {}

  ngOnInit() {
    this.hotelForm = this.fn.group(
      {
        hotelName: ['', Validators.required],
        hotelPrice: ['', Validators.required],
        starRating: [''],
        description: ['']
      }
    );
    this.rout.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      console.log(id);
      this.getSelectedHotel(id);
    })
  }
  public saveHotel():void{
    console.log(this.hotelForm.value);
  }
  public getSelectedHotel(id:number){
    this.hotelListService.getHotelsById(id).subscribe((hotel:any) =>{
      this.displayHotel(hotel);
    });
  }

  public displayHotel(hotel:IHotel){
    this.hotel = hotel;
console.log(this.hotel.hotelId)
    if (this.hotel.hotelId === null){
      this.pageTitle = 'Create Hotel';
    }
    else {
      this.pageTitle = `Edit Hotel ${this.hotel.hotelName}`;
    }

    this.hotelForm.patchValue({
      hotelName:this.hotel.hotelName,
      hotelPrice:this.hotel.price,
      starRating:this.hotel.rating,
      description:this.hotel.description
    });
  }

}
