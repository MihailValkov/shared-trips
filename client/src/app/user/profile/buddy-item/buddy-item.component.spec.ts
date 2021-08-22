import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyItemComponent } from './buddy-item.component';

describe('BuddyItemComponent', () => {
  let component: BuddyItemComponent;
  let fixture: ComponentFixture<BuddyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuddyItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuddyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
