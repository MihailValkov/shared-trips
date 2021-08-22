import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-buddy-item',
  templateUrl: './buddy-item.component.html',
  styleUrls: ['./buddy-item.component.css']
})
export class BuddyItemComponent implements OnInit {
  @Input() buddy: IUser | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
