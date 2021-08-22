import { Component, Input } from '@angular/core';
import { ITrip } from 'src/app/interfaces/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip: ITrip | null = null;
}
