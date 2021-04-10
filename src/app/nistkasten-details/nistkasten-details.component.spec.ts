import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NistkastenDetailsComponent } from './nistkasten-details.component';

describe('NistkastenDetailsComponent', () => {
  let component: NistkastenDetailsComponent;
  let fixture: ComponentFixture<NistkastenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NistkastenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NistkastenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
