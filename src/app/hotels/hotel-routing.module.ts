import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {HotelDetailComponent} from "./hotel-detail/hotel-detail.component";
import {HotelDetailsGuard} from "./shared/guards/hotel-detail.guard";
import {HotelListComponent} from "./hotel-list/hotel-list.component";



@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'hotels/:id' , component: HotelDetailComponent,
        canActivate: [HotelDetailsGuard]},
      {path: 'hotels' , component: HotelListComponent }
    ])
  ],
  exports:[RouterModule]
})
export class HotelRoutingModule { }
