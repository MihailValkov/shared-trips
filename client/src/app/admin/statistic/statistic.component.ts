import { Component, Input } from '@angular/core';
import { IStatistics } from 'src/app/interfaces/statisitcs';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  @Input() data!: IStatistics;
}
