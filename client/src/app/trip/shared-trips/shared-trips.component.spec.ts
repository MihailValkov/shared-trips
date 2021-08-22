import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTripsComponent } from './shared-trips.component';

describe('SharedTripsComponent', () => {
  let component: SharedTripsComponent;
  let fixture: ComponentFixture<SharedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
