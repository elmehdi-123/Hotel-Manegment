import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HotelListService} from "../shared/services/hotel-list.service";
import {IHotel} from "../shared/models/hotel";
import {GlobalGenericValidator} from "../shared/validators/global-generic.validator";
import {debounce, EMPTY, fromEvent, merge, Observable, timer} from "rxjs";
import {NumbersValidator} from "../shared/validators/numbers.validator";

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) inputElements: ElementRef[]

  public hotelForm: FormGroup = this.fn.group({});

  public hotel:IHotel = <IHotel>{};

  public pageTitle:string = '';

  public errorMessage:string

  public isFormSubmitted: boolean

  private validationMessages: { [key: string]: { [key: string]: string } } = {
    price: {required: 'price of the hotel is mandatory',
      pattern: 'the price must be a number'},
  hotelName: {
    required: 'name of the hotel is mandatory',
    minlength: 'name of the hotel must contain at least 4 characters'
  },
    rating: {
      range: 'give a number between 1 and 5'
    }
  }

  private globalGenericValidator: GlobalGenericValidator

public formErrors: { [key: string]: string } = {}

  constructor(
    private fn: FormBuilder,
    public rout:ActivatedRoute,
    public hotelListService:HotelListService,
    public router: Router
  ) {}

  ngOnInit() {
    this.globalGenericValidator = new GlobalGenericValidator(this.validationMessages)
    this.hotelForm = this.fn.group(
      {
        hotelName: ['', [Validators.required, Validators.minLength(4)]],
        price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        rating: ['', NumbersValidator.range(1, 5)],
        tags: this.fn.array([]),
        description: ['']
      }
    );



    this.rout.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.getSelectedHotel(id);
    })
  }

  ngAfterViewInit() {

    const formControlBlurs: Observable<unknown>[] = this.inputElements
      .map((formControlElementRef: ElementRef) => fromEvent(formControlElementRef.nativeElement, 'blur'));

    merge(this.hotelForm.valueChanges, ...formControlBlurs).pipe(debounce(() => this.isFormSubmitted ? EMPTY : timer(1000))).subscribe(() => {
      this.formErrors = this.globalGenericValidator.createErrorMessage(this.hotelForm, this.isFormSubmitted);
      console.log('errors: ', this.formErrors);
    });
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
    this.isFormSubmitted = true

    this.hotelForm.updateValueAndValidity({
      onlySelf: true,
      emitEvent: true
    })
    this.formErrors = this.globalGenericValidator.createErrorMessage(this.hotelForm, this.isFormSubmitted);
    console.log('errors on submit: ', this.formErrors);

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
    else {
      this.errorMessage = 'Please correct the errors'
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

  public hideError():void{
    this.errorMessage = null
  }

}
