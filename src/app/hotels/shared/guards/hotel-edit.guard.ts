import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {

  canDeactivate(component: HotelEditComponent): boolean {
    if (component.hotelForm.dirty) {
      const hotelName = component.hotelForm.get('hotelName').value || 'New Hotel';
      return confirm(`Would you like to cancel the changes made to ${hotelName} ?`)
    }
    return true;
  }
}
