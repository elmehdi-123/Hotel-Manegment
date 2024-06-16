import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HotelListComponent} from "./hotel-list/hotel-list.component";
import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr"
import {ReplaceComma} from "./shared/pipes/replace-comma.pipe";
import {StarRatingComponent} from "./shared/components/star-rating/star-rating.component";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";

import {RouterModule} from "@angular/router";
import {HotelListService} from "./hotel-list/hotel-list.service";
import {HotelDetailComponent} from "./hotel-list/hotel-detail/hotel-detail.component";
import {HotelDetailsGuard} from "./hotel-list/hotel-detail.guard";

registerLocaleData(localeFr , 'fr');
@NgModule({
  declarations: [
    AppComponent,
    HotelListComponent,
    ReplaceComma,
    StarRatingComponent,
    HomeComponent,
    HotelDetailComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
      HttpClientModule,
      RouterModule.forRoot([
        {path: 'home' , component: HomeComponent },
        {path: '' , redirectTo: 'home' , pathMatch: 'full' },
        {path: 'hotels/:id' , component: HotelDetailComponent,
        canActivate: [HotelDetailsGuard]},
        {path: 'hotels' , component: HotelListComponent },
        {path: '**' , redirectTo: 'home' , pathMatch: 'full' }
      ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
