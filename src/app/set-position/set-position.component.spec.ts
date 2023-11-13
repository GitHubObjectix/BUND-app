import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPositionComponent } from './set-position.component';

describe('SetPositionComponent', () => {
  let component: SetPositionComponent;
  let fixture: ComponentFixture<SetPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
