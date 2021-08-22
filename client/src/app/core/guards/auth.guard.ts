import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, tap, first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      switchMap(user => user === undefined ? this.authService.authenticate() : [user]),
      map(user => childRoute.data?.isLogged !== 'boolean' || childRoute.data?.isLogged === !!user),
      tap((canContinue) => {
        if (canContinue) { return }
        this.router.navigate(['/home']);
      }),
      first()
    )
  }
}