import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StarRatingComponent} from "./components/star-rating/star-rating.component";
import {ReplaceComma} from "./pipes/replace-comma.pipe";


@NgModule({
  declarations: [
    StarRatingComponent,
    ReplaceComma
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarRatingComponent,
    ReactiveFormsModule,
    ReplaceComma
  ]
})
export class SharedModule {
}
