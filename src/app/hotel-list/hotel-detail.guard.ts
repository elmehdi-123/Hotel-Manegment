import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class HotelDetailsGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const id:number = +next.url[1].path;
    if (isNaN(id) || id <= 0){
      alert('unknown hotel');

      this.router.navigate(['/hotels']);
      return false;
    }
    return true;
  }
}
