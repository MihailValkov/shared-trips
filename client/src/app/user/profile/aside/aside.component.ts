import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Input() user: IUser | null | undefined = null
}
