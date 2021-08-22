import { Component, Input, OnInit } from '@angular/core';
import { ITrip } from 'src/app/interfaces/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  @Input() trips:ITrip[] =[];
  constructor() { }

  ngOnInit(): void {
  }

}
