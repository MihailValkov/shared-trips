import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user$ = this.authService.user$;
  isLogged$ = this.authService.isLogged$;
  isAdmin$ = this.authService.isAdmin$;
  toggle = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  logout() {
    this.authService.logout().subscribe(
      next => {
        this.router.navigate(['/user/login'])
      },
      error => console.log(error)
    )
  }
  
  toggleHandler(): void {
    this.toggle = !this.toggle;
  }
}
