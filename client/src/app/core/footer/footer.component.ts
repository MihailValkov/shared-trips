import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private authService: AuthService) { }
  isAdmin$ = this.authService.isAdmin$;
}
