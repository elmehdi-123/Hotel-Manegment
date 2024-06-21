import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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
    public hotelListService:HotelListService,
    public router: Router
  ) {}

  ngOnInit() {
    this.hotelForm = this.fn.group(
      {
        hotelName: ['', Validators.required],
        price: ['', Validators.required],
        rating: [''],
        description: ['']
      }
    );
    this.rout.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.getSelectedHotel(id);
    })
  }


  public saveHotel():void{

    if (this.hotelForm.valid){
      if (this.hotelForm.dirty){

        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value
        };
        if (hotel.id === null){
          this.hotelListService.createHotel(hotel).subscribe({
            next: () => this.saveCompleted()
          });
        }
        else {
          this.hotelListService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted()
          });
        }
      }
    }
  }
  public getSelectedHotel(id:number){
    this.hotelListService.getHotelsById(id).subscribe((hotel:any) =>{
      this.displayHotel(hotel);

    });
  }

  public displayHotel(hotel:IHotel){
    this.hotel = hotel;
    if (this.hotel.id === null){
      this.pageTitle = 'Create Hotel';
    }
    else {
      this.pageTitle = `Edit Hotel ${this.hotel.hotelName}`;
    }
    this.hotelForm.patchValue({
      hotelName:this.hotel.hotelName,
      price:this.hotel.price,
      rating:this.hotel.rating,
      description:this.hotel.description
    });
  }

  public saveCompleted():void{
    this.hotelForm.reset();
    this.router.navigate(['/hotels']).catch(() => {});
  }
}
