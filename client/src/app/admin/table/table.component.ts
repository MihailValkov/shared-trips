import { Component, Input } from '@angular/core';
import { IExpensiveTrips } from 'src/app/interfaces/expensiveTrips';
import { ITrip } from 'src/app/interfaces/trip';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() expensiveTrips!: IExpensiveTrips[];
  @Input() headers: string[] = [];
}
