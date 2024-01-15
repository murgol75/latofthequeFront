import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventClotureComponent } from './event-cloture.component';

describe('EventClotureComponent', () => {
  let component: EventClotureComponent;
  let fixture: ComponentFixture<EventClotureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventClotureComponent]
    });
    fixture = TestBed.createComponent(EventClotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
