import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";


import {FormsModule} from "@angular/forms";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr"
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import { HotelModule } from './hotels/hotel.module';
import {AppRoutingModule} from "./app-routing.module";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

registerLocaleData(localeFr , 'fr');
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HotelModule,
    AppRoutingModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
