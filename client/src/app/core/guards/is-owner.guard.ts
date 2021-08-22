import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.authService.user$.pipe(
        switchMap(user => user === undefined ? this.authService.authenticate() : [user]),
        map(user => {
          const tripId = route.params.tripId;
          const isOwner = user?.createdTrips.find(x => x._id === tripId);
          return (!!isOwner || user?.status === 'Admin') ? true : false 
        }),
        tap((canContinue) => {
          if (canContinue) { return }
          this.router.navigateByUrl(this.router.url);
        }),
        first()
      )
  }
  
}
