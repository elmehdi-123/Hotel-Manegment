import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public test: FormGroup = this.fn.group({});

  constructor(
    private fn: FormBuilder
  ) {

  }

  ngOnInit() {
    this.test = this.fn.group(
      {
        hotelName: ['', Validators.required],
        hotelPrice: ['', Validators.required],
        starRating: [''],
        description: ['']
      }
    );
  }
}
