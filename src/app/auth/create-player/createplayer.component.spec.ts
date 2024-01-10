import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateplayerComponent } from './createplayer.component';

describe('CreateplayerComponent', () => {
  let component: CreateplayerComponent;
  let fixture: ComponentFixture<CreateplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateplayerComponent]
    });
    fixture = TestBed.createComponent(CreateplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
