import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HotelDetailComponent} from "./hotel-detail/hotel-detail.component";
import {HotelDetailsGuard} from "./shared/guards/hotel-detail.guard";
import {HotelListComponent} from "./hotel-list/hotel-list.component";
import {HotelEditComponent} from "./hotel-edit/hotel-edit.component";
import {HotelEditGuard} from "./shared/guards/hotel-edit.guard";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'hotels/:id', component: HotelDetailComponent,
        canActivate: [HotelDetailsGuard]
      },
      {path: 'hotels', component: HotelListComponent},
      {
        path: 'hotels/:id/edit',
        component: HotelEditComponent,
        canDeactivate: [HotelEditGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class HotelRoutingModule {
}
