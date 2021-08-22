import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.css']
})
export class BuddyComponent {
  @Input() buddy!: IUser;
  @Input() type: string | undefined;
  constructor() { }

}
