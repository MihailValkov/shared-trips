import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() limit!: number;
  @Input() baseUrl!: string;
  @Input() count!: number;
  @Input() page!:number;
  pages = 1;
  constructor(private router: Router) { }

  ngOnChanges() {
    this.pages = Math.ceil(this.count / this.limit);
  }

  pageValue(value: number) {
    this.page += value;
    if (this.page < 1) { this.page = 1 }
  }

  previous() {
    this.pageValue(-1);
    this.router.navigate([this.baseUrl], { queryParams: { page: this.page, limit: this.limit } });
  }
  next() {
    this.pageValue(1);
    this.router.navigate([this.baseUrl], { queryParams: { page: this.page, limit: this.limit } });
  }

}
