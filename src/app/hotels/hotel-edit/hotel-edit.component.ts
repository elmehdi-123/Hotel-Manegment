import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

  public errorMessage:string


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
        tags: this.fn.array([]),
        description: ['']
      }
    );
    this.rout.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.getSelectedHotel(id);
    })
  }

  public get tags(): FormArray {
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTag(): void {
    this.tags.push(new FormControl());
  }
  public deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
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
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
          });
        }
        else {
          this.hotelListService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMessage = err
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
    this.hotelForm.setControl('tags',this.fn.array(this.hotel.tags || []))
  }

  public saveCompleted():void{
    this.hotelForm.reset();
    this.router.navigate(['/hotels']).catch(() => {});
  }

  public deleteHotel():void{
    if (confirm(`Do you really want to delete ${this.hotel.hotelName} ?`)){
this.hotelListService.deleteHotel(this.hotel.id).subscribe({
  next: () => this.saveCompleted()
})
    }
  }

}
